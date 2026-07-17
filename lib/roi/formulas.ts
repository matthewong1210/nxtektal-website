/**
 * NXTektal Manager ROI Calculator — deterministic pure formula module.
 *
 * Every formula follows NXTektal_ROI_Calculation_Engine_Spec_v1.0_CN (the sole
 * source of truth; spec formula IDs cited inline). Same input + same
 * modelVersion ⇒ same output. No LLM estimation, no hidden assumptions:
 * blank inputs stay null, savings only compute from explicit scenario values,
 * and negative results are never clamped.
 */

import {
  MODEL_VERSION,
  type AssumptionDisplay,
  type BreakdownRow,
  type RoiCalculationInput,
  type RoiCalculationResult,
  type RoiWarning,
} from "./types";

const clamp01 = (x: number): number => Math.min(1, Math.max(0, x));

/** Division that yields null (never Infinity/NaN) on a zero/invalid denominator (spec §8.6). */
export const safeDiv = (num: number, den: number): number | null =>
  den > 0 || den < 0 ? num / den : null;

/** F-L01 — loaded regular rate. Override wins; never stacked with burden. */
export function loadedRegularRate(input: RoiCalculationInput): number | null {
  const r = input.laborRate;
  if (r.loadedRegularRateOverride !== null) return r.loadedRegularRateOverride;
  if (r.baseWage === null) return null;
  return r.baseWage * (1 + (r.payrollBurdenRate ?? 0));
}

/** F-T02 — suggested cycles/day from an interval. Suggestion only; overrides always win. */
export function suggestedCyclesPerDay(
  operatingHoursPerDay: number | null,
  intervalHours: number | null,
): number | null {
  if (operatingHoursPerDay === null || intervalHours === null || intervalHours <= 0) return null;
  return Math.ceil(operatingHoursPerDay / intervalHours);
}

/** Resolved daily cycle count for the regular collection task (F-T01/F-T02). */
export function resolvedCyclesPerDay(input: RoiCalculationInput): number | null {
  const s = input.regularCollection;
  if (s.frequencyMode === "cycles_per_day") return s.cyclesPerDay;
  if (s.cyclesPerDayOverride !== null) return s.cyclesPerDayOverride;
  return suggestedCyclesPerDay(input.operatingHoursPerDay, s.intervalHours);
}

interface TaskComputation {
  annualHours: number;
  annualCost: number;
}

/** F-T01 + F-L03 + F-L04 (no-overtime form) for the regular collection task. */
function regularTask(input: RoiCalculationInput, rate: number): TaskComputation | null {
  const cycles = resolvedCyclesPerDay(input);
  const { durationHoursPerOccurrence: duration, headcount } = input.regularCollection;
  const days = input.operatingDaysPerYear;
  if (cycles === null || duration === null || headcount === null || days === null) return null;
  const annualHours = cycles * days * duration * headcount;
  return { annualHours, annualCost: annualHours * rate };
}

/** Special manual recovery (per-week basis — spec F-T01 per_week). */
function specialTask(input: RoiCalculationInput, rate: number): TaskComputation | null {
  const s = input.specialRecovery;
  if (!s.enabled) return { annualHours: 0, annualCost: 0 };
  if (s.sessionsPerWeek === null || s.hoursPerSession === null || s.workersPerSession === null) {
    return null;
  }
  const weeks = s.activeWeeksPerYear ?? 52;
  const annualHours = s.sessionsPerWeek * weeks * s.hoursPerSession * s.workersPerSession;
  return { annualHours, annualCost: annualHours * rate };
}

/** Optional unloading / manual handling task. */
function unloadingTask(input: RoiCalculationInput, rate: number): TaskComputation | null {
  const u = input.unloading;
  if (!u.enabled) return { annualHours: 0, annualCost: 0 };
  const cycles = u.cyclesPerDay ?? resolvedCyclesPerDay(input);
  const days = input.operatingDaysPerYear;
  if (cycles === null || u.durationHoursPerOccurrence === null || u.headcount === null || days === null) {
    return null;
  }
  const annualHours = cycles * days * u.durationHoursPerOccurrence * u.headcount;
  return { annualHours, annualCost: annualHours * rate };
}

/** F-L05 — effective automation for one task (multiplicative, clamped to [0,1]). */
export function effectiveAutomationRate(
  coverage: number | null,
  uptime: number | null,
  capacityFit: number | null,
  workflow: number | null,
  adoption: number | null,
): number | null {
  if (coverage === null || uptime === null || capacityFit === null || workflow === null || adoption === null) {
    return null;
  }
  return clamp01(
    clamp01(coverage) * clamp01(uptime) * clamp01(capacityFit) * clamp01(workflow) * clamp01(adoption),
  );
}

const round2 = (x: number): number => Math.round(x * 100) / 100;

/** Main entry — deterministic, side-effect free. */
export function calculateRoi(input: RoiCalculationInput): RoiCalculationResult {
  const warnings: RoiWarning[] = [];
  const assumptions: AssumptionDisplay[] = [];
  const breakdown: BreakdownRow[] = [];

  if (input.modelVersion !== MODEL_VERSION) {
    warnings.push({
      code: "model_version_mismatch",
      message: `Saved inputs use formula version "${input.modelVersion}"; this calculator is ${MODEL_VERSION}. Results may not be comparable.`,
    });
  }

  const rate = loadedRegularRate(input);
  const days = input.operatingDaysPerYear;

  const emptyCurrent = {
    regularAnnualHours: null,
    regularAnnualLaborCost: null,
    specialAnnualHours: null,
    specialAnnualLaborCost: null,
    unloadingAnnualHours: null,
    unloadingAnnualLaborCost: null,
    annualLaborHours: null,
    annualLaborCost: null,
    annualEquipmentCost: null,
    annualBallLossCost: null,
    annualRefundCost: null,
    annualOtherCost: null,
    annualDirectCost: null,
    monthlyDirectCost: null,
    dailyDirectCost: null,
    fteEquivalent: null,
    costPerThousandBalls: null,
  };
  const emptySavings = {
    technicalHoursRemoved: null,
    cashPaidHoursAvoided: null,
    redeployedCapacityHours: null,
    cashLaborSavings: null,
    equipmentCashSavings: null,
    directGrossCashSavings: null,
    customerIncrementalOperatingCost: null,
    annualVendorFee: null,
    netDirectCashSavingsAfterVendor: null,
    recoveredContributionMargin: null,
    coreAnnualCustomerNetBenefit: null,
    monthlyCoreNetBenefit: null,
    postAnnualDirectCost: null,
    directCostReductionRate: null,
    initialCustomerInvestment: null,
    approximatePaybackMonths: null,
    monthlyCashFlowPositive: null,
  };

  const regular = rate !== null ? regularTask(input, rate) : null;
  const special = rate !== null ? specialTask(input, rate) : null;
  const unloading = rate !== null ? unloadingTask(input, rate) : null;

  if (rate === null || regular === null || special === null || unloading === null || days === null) {
    warnings.push({
      code: "required_input_missing",
      message: "Complete the highlighted fields to calculate current spending.",
    });
    return {
      modelVersion: MODEL_VERSION,
      status: "incomplete",
      current: emptyCurrent,
      savings: emptySavings,
      breakdown,
      warnings,
      assumptions,
    };
  }

  /* ---------- Current spending (spec §5, F-A01) ---------- */

  // Equipment: blank means NOT ENTERED (unknown ≠ 0 — spec §4). The total still
  // computes, but the exclusion is explicit in the breakdown and warnings.
  const equipmentEntered = input.equipmentMonthlyCost !== null;
  const annualEquipment = equipmentEntered ? input.equipmentMonthlyCost! * 12 : 0;
  if (!equipmentEntered) {
    warnings.push({
      code: "equipment_cost_not_entered",
      message: "Equipment spending was left blank, so it is not included. Blank is treated as unknown, never $0.",
    });
  }

  const oc = input.optionalCosts;
  let ballLoss = 0;
  let ballLossEntered = false;
  if (oc.annualBallsLost !== null && oc.landedCostPerBall !== null) {
    ballLoss = oc.annualBallsLost * oc.landedCostPerBall; // F-B01
    ballLossEntered = true;
  } else if (oc.annualBallsLost !== null || oc.landedCostPerBall !== null) {
    warnings.push({
      code: "ball_loss_partial_input",
      message: "Ball replacement needs both the annual quantity and the landed cost per ball; it is not included yet.",
    });
  }
  const refunds = oc.annualRefundCost ?? 0;
  const otherCosts = oc.otherAnnualDirectCost ?? 0;

  const laborHours = regular.annualHours + special.annualHours + unloading.annualHours;
  const laborCost = regular.annualCost + special.annualCost + unloading.annualCost;
  const annualDirect = laborCost + annualEquipment + ballLoss + refunds + otherCosts; // F-A01
  const monthlyDirect = annualDirect / 12; // F-A09: always annual/12
  const dailyDirect = safeDiv(annualDirect, days); // null on zero days
  if (dailyDirect === null) {
    warnings.push({
      code: "zero_denominator",
      message: "Operating days per year must be greater than 0 to compute a daily cost.",
    });
  }

  const annualBalls =
    oc.annualBaskets !== null && oc.ballsPerBasket !== null
      ? oc.annualBaskets * oc.ballsPerBasket // F-T03
      : null;
  const costPerThousandBalls =
    annualBalls !== null ? mapNullable(safeDiv(annualDirect, annualBalls), (v) => v * 1000) : null;

  /* ---------- Breakdown rows (dynamic arithmetic, spec §15.3 transparency) ---------- */

  const cycles = resolvedCyclesPerDay(input)!;
  const rc = input.regularCollection;
  const money = (v: number) => `$${round2(v).toLocaleString("en-US")}`;
  breakdown.push({
    id: "regular",
    label: "Regular ball collection labor",
    calculation: `${cycles} cycles/day × ${rc.durationHoursPerOccurrence} h/cycle × ${rc.headcount} worker${rc.headcount === 1 ? "" : "s"} × ${money(rate)}/h × ${days} days/year`,
    annualAmount: regular.annualCost,
    kind: "entered",
  });
  if (input.specialRecovery.enabled && special.annualHours > 0) {
    const sr = input.specialRecovery;
    breakdown.push({
      id: "special",
      label: "Special manual recovery",
      calculation: `${sr.sessionsPerWeek} session${sr.sessionsPerWeek === 1 ? "" : "s"}/week × ${sr.hoursPerSession} h/session × ${sr.workersPerSession} worker${sr.workersPerSession === 1 ? "" : "s"} × ${money(rate)}/h × ${sr.activeWeeksPerYear ?? 52} weeks/year`,
      annualAmount: special.annualCost,
      kind: "entered",
    });
  }
  if (input.unloading.enabled && unloading.annualHours > 0) {
    breakdown.push({
      id: "unloading",
      label: "Unloading & manual handling",
      calculation: `${input.unloading.cyclesPerDay ?? cycles} runs/day × ${input.unloading.durationHoursPerOccurrence} h/run × ${input.unloading.headcount} worker${input.unloading.headcount === 1 ? "" : "s"} × ${money(rate)}/h × ${days} days/year`,
      annualAmount: unloading.annualCost,
      kind: "entered",
    });
  }
  breakdown.push(
    equipmentEntered
      ? {
          id: "equipment",
          label: "Fuel, maintenance & repairs",
          calculation: `${money(input.equipmentMonthlyCost!)}/month × 12`,
          annualAmount: annualEquipment,
          kind: "entered",
        }
      : {
          id: "equipment",
          label: "Fuel, maintenance & repairs",
          calculation: "Not entered — not included in the total",
          annualAmount: null,
          kind: "excluded",
        },
  );
  if (ballLossEntered) {
    breakdown.push({
      id: "ball_loss",
      label: "Ball replacement",
      calculation: `${oc.annualBallsLost!.toLocaleString("en-US")} balls/year × ${money(oc.landedCostPerBall!)}/ball`,
      annualAmount: ballLoss,
      kind: "entered",
    });
  }
  if (oc.annualRefundCost !== null) {
    breakdown.push({
      id: "refunds",
      label: "Refunds & service credits",
      calculation: "Entered annual amount",
      annualAmount: refunds,
      kind: "entered",
    });
  }
  if (oc.otherAnnualDirectCost !== null) {
    breakdown.push({
      id: "other",
      label: "Other included costs",
      calculation: "Entered annual amount",
      annualAmount: otherCosts,
      kind: "entered",
    });
  }
  breakdown.push({
    id: "total",
    label: "Total current spending",
    calculation: "",
    annualAmount: annualDirect,
    kind: "total",
  });

  const current = {
    regularAnnualHours: regular.annualHours,
    regularAnnualLaborCost: regular.annualCost,
    specialAnnualHours: special.annualHours,
    specialAnnualLaborCost: special.annualCost,
    unloadingAnnualHours: unloading.annualHours,
    unloadingAnnualLaborCost: unloading.annualCost,
    annualLaborHours: laborHours,
    annualLaborCost: laborCost,
    annualEquipmentCost: equipmentEntered ? annualEquipment : null,
    annualBallLossCost: ballLossEntered ? ballLoss : null,
    annualRefundCost: oc.annualRefundCost,
    annualOtherCost: oc.otherAnnualDirectCost,
    annualDirectCost: annualDirect,
    monthlyDirectCost: monthlyDirect,
    dailyDirectCost: dailyDirect,
    fteEquivalent: laborHours / 2080, // display only (spec F-L12)
    costPerThousandBalls,
  };

  /* ---------- Savings (spec §6 — only from explicit scenario values) ---------- */

  const sc = input.scenario;
  if (!sc) {
    return {
      modelVersion: MODEL_VERSION,
      status: "current_cost_ready",
      current,
      savings: emptySavings,
      breakdown,
      warnings,
      assumptions,
    };
  }

  if (!sc.approved) {
    warnings.push({
      code: "illustrative_scenario",
      message: "Illustrative estimate — assumptions must be confirmed by NXTektal before use as a claim.",
    });
  }

  // Per-task effective automation (F-L05): regular and special use their own coverage.
  const regularEA = effectiveAutomationRate(
    sc.regularCollectionCoverageRate,
    sc.systemUptime,
    sc.capacityFit,
    sc.workflowSuccessRate,
    sc.adoptionRate,
  );
  const specialEA =
    special.annualHours > 0
      ? effectiveAutomationRate(
          sc.specialRecoveryCoverageRate,
          sc.systemUptime,
          sc.capacityFit,
          sc.workflowSuccessRate,
          sc.adoptionRate,
        )
      : 0;
  // Unloading is part of the automated handoff workflow; it shares regular coverage.
  const unloadingEA = unloading.annualHours > 0 ? regularEA : 0;

  const scenarioReady =
    regularEA !== null && specialEA !== null && unloadingEA !== null && sc.cashRealizationFactor !== null;
  if (!scenarioReady) {
    warnings.push({
      code: "scenario_values_missing",
      message: "Savings need every automation assumption and the labor cash-realization factor to be set. Nothing is assumed silently.",
    });
    return {
      modelVersion: MODEL_VERSION,
      status: "current_cost_ready",
      current,
      savings: emptySavings,
      breakdown,
      warnings,
      assumptions,
    };
  }

  // F-L06 — technical hours removed, per task.
  const technicalHoursRemoved =
    regular.annualHours * regularEA! + special.annualHours * specialEA + unloading.annualHours * unloadingEA!;
  // F-L07/F-L09 — value released at the (uniform) loaded rate, simple-factor realization.
  const technicalLaborValueReleased = technicalHoursRemoved * rate;
  const realization = clamp01(sc.cashRealizationFactor!);
  const cashLaborSavings = technicalLaborValueReleased * realization;
  const cashPaidHoursAvoided = technicalHoursRemoved * realization;
  const redeployedCapacityHours = technicalHoursRemoved - cashPaidHoursAvoided;

  // F-E02/F-E03 — equipment savings only from the explicitly avoidable share.
  const equipmentAvoidable = sc.equipmentAvoidableRate;
  const equipmentCashSavings =
    equipmentEntered && equipmentAvoidable !== null ? annualEquipment * clamp01(equipmentAvoidable) : 0;
  if (equipmentEntered && equipmentAvoidable !== null && equipmentAvoidable === 0) {
    warnings.push({
      code: "equipment_retained",
      message: "Current picker is assumed fully retained, so equipment savings are $0.",
    });
  }

  // F-A02 — direct gross cash savings (ball/refund improvements not modeled in v1 UI).
  const directGrossCashSavings = cashLaborSavings + equipmentCashSavings;

  const ops = sc.customerIncrementalOperatingCostAnnual;
  const vendorFee =
    input.pricing?.mode === "raas" && input.pricing.monthlyFee !== null
      ? input.pricing.monthlyFee * 12
      : input.pricing?.mode === "capex"
        ? (input.pricing.annualRecurringFee ?? sc.vendorRecurringFeeAnnual)
        : sc.vendorRecurringFeeAnnual;

  if (ops === null || vendorFee === null) {
    warnings.push({
      code: "vendor_pricing_missing",
      message: "Net benefit needs the NXTektal fee and the new system operating cost. Gross savings are shown without them.",
    });
    return {
      modelVersion: MODEL_VERSION,
      status: "current_cost_ready",
      current,
      savings: {
        ...emptySavings,
        technicalHoursRemoved,
        cashPaidHoursAvoided,
        redeployedCapacityHours,
        cashLaborSavings,
        equipmentCashSavings,
        directGrossCashSavings,
      },
      breakdown,
      warnings,
      assumptions: buildAssumptions(input, sc, assumptions),
    };
  }

  // Revenue recovery: only an explicit, margin-based entry counts (spec F-R06, §8.4).
  const recoveredMargin = sc.recoveredContributionMarginAnnual ?? 0;

  // F-A03..F-A06.
  const netDirect = directGrossCashSavings - ops - vendorFee;
  const corePreVendor = directGrossCashSavings + recoveredMargin - ops;
  const coreNetBenefit = corePreVendor - vendorFee;
  const postAnnualDirect = annualDirect - directGrossCashSavings + ops + vendorFee;
  const reductionRate = safeDiv(netDirect, annualDirect);

  if (coreNetBenefit < 0) {
    warnings.push({
      code: "negative_net_benefit",
      message: "Under these assumptions the customer net benefit is negative. The figure is shown as-is, never clamped to zero.",
    });
  }

  // F-P08 + F-M06 approximate payback (CapEx only).
  let initialInvestment: number | null = null;
  let paybackMonths: number | null = null;
  if (input.pricing?.mode === "capex") {
    const p = input.pricing;
    initialInvestment =
      (p.hardwarePrice ?? 0) +
      (p.installationCost ?? 0) +
      (p.sitePreparationCost ?? 0) +
      (p.integrationTrainingCost ?? 0) +
      (p.shippingAndTaxCost ?? 0) -
      (p.rebates ?? 0) -
      (p.tradeInProceeds ?? 0);
    if (coreNetBenefit > 0 && initialInvestment > 0) {
      paybackMonths = initialInvestment / (coreNetBenefit / 12);
    } else {
      warnings.push({
        code: "payback_not_achieved",
        message: "Payback is not achieved under the current assumptions.",
      });
    }
  }

  return {
    modelVersion: MODEL_VERSION,
    status: "full_roi_ready",
    current,
    savings: {
      technicalHoursRemoved,
      cashPaidHoursAvoided,
      redeployedCapacityHours,
      cashLaborSavings,
      equipmentCashSavings,
      directGrossCashSavings,
      customerIncrementalOperatingCost: ops,
      annualVendorFee: vendorFee,
      netDirectCashSavingsAfterVendor: netDirect,
      recoveredContributionMargin: sc.recoveredContributionMarginAnnual,
      coreAnnualCustomerNetBenefit: coreNetBenefit,
      monthlyCoreNetBenefit: coreNetBenefit / 12,
      postAnnualDirectCost: postAnnualDirect,
      directCostReductionRate: reductionRate,
      initialCustomerInvestment: initialInvestment,
      approximatePaybackMonths: paybackMonths,
      monthlyCashFlowPositive: input.pricing?.mode === "raas" ? coreNetBenefit / 12 > 0 : null,
    },
    breakdown,
    warnings,
    assumptions: buildAssumptions(input, sc, assumptions),
  };
}

function mapNullable<T, R>(v: T | null, fn: (v: T) => R): R | null {
  return v === null ? null : fn(v);
}

function buildAssumptions(
  input: RoiCalculationInput,
  sc: NonNullable<RoiCalculationInput["scenario"]>,
  out: AssumptionDisplay[],
): AssumptionDisplay[] {
  const pct = (v: number | null) => (v === null ? "not set" : `${Math.round(v * 1000) / 10}%`);
  out.push(
    { id: "scenario", label: "Scenario", value: sc.label, source: "scenario_assumption" },
    { id: "coverage_regular", label: "Regular collection coverage", value: pct(sc.regularCollectionCoverageRate), source: "scenario_assumption" },
    { id: "coverage_special", label: "Special recovery coverage", value: pct(sc.specialRecoveryCoverageRate), source: "scenario_assumption" },
    { id: "uptime", label: "System uptime", value: pct(sc.systemUptime), source: "scenario_assumption" },
    { id: "capacity", label: "Capacity fit", value: pct(sc.capacityFit), source: "scenario_assumption" },
    { id: "workflow", label: "Workflow success", value: pct(sc.workflowSuccessRate), source: "scenario_assumption" },
    { id: "adoption", label: "Adoption", value: pct(sc.adoptionRate), source: "scenario_assumption" },
    { id: "realization", label: "Labor cash realization", value: pct(sc.cashRealizationFactor), source: "scenario_assumption" },
    { id: "equipment_avoidable", label: "Equipment cost avoidable", value: pct(sc.equipmentAvoidableRate), source: "scenario_assumption" },
  );
  return out;
}

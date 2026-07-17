/** Prompt §13 required tests A–G + §12 double-counting rules. */

import { describe, expect, it } from "vitest";
import { calculateRoi, loadedRegularRate, suggestedCyclesPerDay, resolvedCyclesPerDay } from "../formulas";
import { MODEL_VERSION, type RoiCalculationInput, type RoiScenarioInput } from "../types";

function baseInput(overrides: Partial<RoiCalculationInput> = {}): RoiCalculationInput {
  return {
    modelVersion: MODEL_VERSION,
    currency: "USD",
    operatingDaysPerYear: 350,
    operatingHoursPerDay: 12,
    laborRate: { loadedRegularRateOverride: 22, baseWage: null, payrollBurdenRate: null },
    regularCollection: {
      frequencyMode: "cycles_per_day",
      cyclesPerDay: 6,
      intervalHours: null,
      cyclesPerDayOverride: null,
      durationHoursPerOccurrence: 1.25,
      headcount: 1,
    },
    specialRecovery: {
      enabled: true,
      sessionsPerWeek: 1,
      hoursPerSession: 6,
      workersPerSession: 1,
      activeWeeksPerYear: 52,
    },
    unloading: { enabled: false, cyclesPerDay: null, durationHoursPerOccurrence: null, headcount: null },
    equipmentMonthlyCost: 600,
    optionalCosts: {
      annualBallsLost: null,
      landedCostPerBall: null,
      annualRefundCost: null,
      otherAnnualDirectCost: null,
      annualBaskets: null,
      ballsPerBasket: null,
    },
    scenario: null,
    pricing: null,
    ...overrides,
  };
}

function fullScenario(overrides: Partial<RoiScenarioInput> = {}): RoiScenarioInput {
  return {
    id: "expected",
    label: "Expected",
    approved: false,
    regularCollectionCoverageRate: 0.9,
    specialRecoveryCoverageRate: 0.3,
    systemUptime: 0.95,
    capacityFit: 1,
    workflowSuccessRate: 1,
    adoptionRate: 1,
    equipmentAvoidableRate: 0.8,
    customerIncrementalOperatingCostAnnual: 5000,
    vendorRecurringFeeAnnual: 24000,
    laborDisposition: "reduce_paid_hours",
    cashRealizationFactor: 0.7,
    recoveredContributionMarginAnnual: null,
    ...overrides,
  };
}

describe("Test A — Current Spending sample", () => {
  const r = calculateRoi(baseInput());

  it("matches every expected figure exactly", () => {
    expect(r.status).toBe("current_cost_ready");
    expect(r.current.regularAnnualHours).toBe(2625);
    expect(r.current.regularAnnualLaborCost).toBe(57750);
    expect(r.current.specialAnnualHours).toBe(312);
    expect(r.current.specialAnnualLaborCost).toBe(6864);
    expect(r.current.annualEquipmentCost).toBe(7200);
    expect(r.current.annualDirectCost).toBe(71814);
    expect(r.current.monthlyDirectCost).toBe(5984.5);
    expect(r.current.dailyDirectCost).toBeCloseTo(205.182857, 5);
    expect(r.current.annualLaborHours).toBe(2937);
  });

  it("breakdown arithmetic is generated from the entered values", () => {
    const regular = r.breakdown.find((row) => row.id === "regular")!;
    expect(regular.calculation).toBe("6 cycles/day × 1.25 h/cycle × 1 worker × $22/h × 350 days/year");
    expect(regular.annualAmount).toBe(57750);
    const total = r.breakdown.find((row) => row.id === "total")!;
    expect(total.annualAmount).toBe(71814);
  });
});

describe("Test B — Interval frequency", () => {
  it("suggests CEILING(12 / 2) = 6 cycles/day", () => {
    expect(suggestedCyclesPerDay(12, 2)).toBe(6);
  });

  it("user override of 5 wins over the suggestion", () => {
    const input = baseInput({
      regularCollection: {
        frequencyMode: "interval_hours",
        cyclesPerDay: null,
        intervalHours: 2,
        cyclesPerDayOverride: 5,
        durationHoursPerOccurrence: 1.25,
        headcount: 1,
      },
    });
    expect(resolvedCyclesPerDay(input)).toBe(5);
    expect(calculateRoi(input).current.regularAnnualHours).toBe(5 * 350 * 1.25);
  });
});

describe("Test C — Blank vs zero", () => {
  it("blank equipment is excluded with an explicit warning, never silently $0", () => {
    const r = calculateRoi(baseInput({ equipmentMonthlyCost: null }));
    expect(r.current.annualEquipmentCost).toBeNull();
    expect(r.current.annualDirectCost).toBe(64614); // labor only
    expect(r.warnings.some((w) => w.code === "equipment_cost_not_entered")).toBe(true);
    expect(r.breakdown.find((row) => row.id === "equipment")!.kind).toBe("excluded");
  });

  it("explicit 0 is a legitimate value counted as $0 with no warning", () => {
    const r = calculateRoi(baseInput({ equipmentMonthlyCost: 0 }));
    expect(r.current.annualEquipmentCost).toBe(0);
    expect(r.warnings.some((w) => w.code === "equipment_cost_not_entered")).toBe(false);
  });
});

describe("Test D — Reassigned labor", () => {
  const r = calculateRoi(
    baseInput({
      scenario: fullScenario({ laborDisposition: "reassign", cashRealizationFactor: 0, equipmentAvoidableRate: 0 }),
      pricing: { mode: "raas", monthlyFee: 2000, hardwarePrice: null, installationCost: null, sitePreparationCost: null, integrationTrainingCost: null, shippingAndTaxCost: null, rebates: null, tradeInProceeds: null, annualRecurringFee: null },
    }),
  );

  it("frees hours as capacity, not cash", () => {
    expect(r.savings.technicalHoursRemoved!).toBeGreaterThan(0);
    expect(r.savings.cashLaborSavings).toBe(0);
    expect(r.savings.redeployedCapacityHours).toBe(r.savings.technicalHoursRemoved);
    expect(r.savings.cashPaidHoursAvoided).toBe(0);
    // Core contains no labor cash savings (and no released-capacity value ever).
    expect(r.savings.directGrossCashSavings).toBe(0);
  });
});

describe("Test E — Negative economics", () => {
  const r = calculateRoi(
    baseInput({
      scenario: fullScenario({ vendorRecurringFeeAnnual: 999999 }),
      pricing: { mode: "capex", monthlyFee: null, hardwarePrice: 50000, installationCost: null, sitePreparationCost: null, integrationTrainingCost: null, shippingAndTaxCost: null, rebates: null, tradeInProceeds: null, annualRecurringFee: 999999 },
    }),
  );

  it("net benefit is negative, never clamped; payback not achieved", () => {
    expect(r.savings.coreAnnualCustomerNetBenefit!).toBeLessThan(0);
    expect(r.warnings.some((w) => w.code === "negative_net_benefit")).toBe(true);
    expect(r.savings.approximatePaybackMonths).toBeNull();
    expect(r.warnings.some((w) => w.code === "payback_not_achieved")).toBe(true);
  });
});

describe("Test F — Divide by zero", () => {
  it("zero operating days ⇒ null daily cost with a validation warning, no Infinity/NaN", () => {
    const r = calculateRoi(baseInput({ operatingDaysPerYear: 0 }));
    expect(r.current.dailyDirectCost).toBeNull();
    expect(r.warnings.some((w) => w.code === "zero_denominator")).toBe(true);
    expect(Number.isFinite(r.current.annualDirectCost!)).toBe(true);
  });

  it("zero annual balls ⇒ null unit cost", () => {
    const r = calculateRoi(
      baseInput({
        optionalCosts: {
          annualBallsLost: null,
          landedCostPerBall: null,
          annualRefundCost: null,
          otherAnnualDirectCost: null,
          annualBaskets: 0,
          ballsPerBasket: 30,
        },
      }),
    );
    expect(r.current.costPerThousandBalls).toBeNull();
  });
});

describe("Test G — No double counting", () => {
  it("Core uses cash labor savings only, never technical labor value", () => {
    const r = calculateRoi(
      baseInput({
        scenario: fullScenario({ cashRealizationFactor: 0.5, equipmentAvoidableRate: 0 }),
      }),
    );
    const technicalValue = r.savings.technicalHoursRemoved! * 22;
    expect(r.savings.cashLaborSavings).toBeCloseTo(technicalValue * 0.5, 6);
    expect(r.savings.directGrossCashSavings).toBe(r.savings.cashLaborSavings);
  });

  it("fully retained picker ⇒ equipment savings $0", () => {
    const r = calculateRoi(baseInput({ scenario: fullScenario({ equipmentAvoidableRate: 0 }) }));
    expect(r.savings.equipmentCashSavings).toBe(0);
    expect(r.warnings.some((w) => w.code === "equipment_retained")).toBe(true);
  });

  it("loaded override is never stacked with payroll burden (F-L01)", () => {
    const both = baseInput({
      laborRate: { loadedRegularRateOverride: 22, baseWage: 18, payrollBurdenRate: 0.25 },
    });
    expect(loadedRegularRate(both)).toBe(22); // override wins outright
    const burdenOnly = baseInput({
      laborRate: { loadedRegularRateOverride: null, baseWage: 18, payrollBurdenRate: 0.25 },
    });
    expect(loadedRegularRate(burdenOnly)).toBeCloseTo(22.5, 10);
  });

  it("monthly is always annual / 12, never daily × 30", () => {
    const r = calculateRoi(baseInput());
    expect(r.current.monthlyDirectCost).toBe(r.current.annualDirectCost! / 12);
    expect(r.current.monthlyDirectCost).not.toBeCloseTo(r.current.dailyDirectCost! * 30, 0);
  });
});

describe("governance", () => {
  it("unapproved scenarios always carry the illustrative warning", () => {
    const r = calculateRoi(baseInput({ scenario: fullScenario() }));
    expect(r.warnings.some((w) => w.code === "illustrative_scenario")).toBe(true);
  });

  it("missing scenario factors block savings rather than silently assuming them", () => {
    const r = calculateRoi(baseInput({ scenario: fullScenario({ systemUptime: null }) }));
    expect(r.status).toBe("current_cost_ready");
    expect(r.savings.directGrossCashSavings).toBeNull();
    expect(r.warnings.some((w) => w.code === "scenario_values_missing")).toBe(true);
  });

  it("deterministic: identical inputs give identical results", () => {
    const a = calculateRoi(baseInput({ scenario: fullScenario() }));
    const b = calculateRoi(baseInput({ scenario: fullScenario() }));
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });
});

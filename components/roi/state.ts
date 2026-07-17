"use client";

/**
 * Shared calculator state — one source of truth for the homepage quick
 * calculator and the full /roi-calculator page. Values persist to
 * localStorage under a model-versioned key so a manager's numbers survive
 * navigation. Field values are kept as raw strings (exact user text, no
 * cursor-jumping reformats) and parsed only at the formula boundary,
 * where "" becomes null — blank is unknown, never 0.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { calculateRoi } from "../../lib/roi/formulas";
import { DISPOSITION_DEFAULT_REALIZATION, SCENARIOS } from "../../lib/roi/scenarios";
import {
  MODEL_VERSION,
  type LaborDisposition,
  type PricingMode,
  type RoiCalculationInput,
  type RoiCalculationResult,
} from "../../lib/roi/types";

export const STORAGE_KEY = `nxt-roi-calculator:${MODEL_VERSION}`;

export interface RoiFormState {
  modelVersion: typeof MODEL_VERSION;
  rateMode: "loaded" | "base";
  loadedRate: string;
  baseWage: string;
  burdenPct: string;
  operatingDays: string;
  operatingHours: string;
  frequencyMode: "cycles_per_day" | "interval_hours";
  cyclesPerDay: string;
  intervalHours: string;
  cyclesOverride: string;
  durationValue: string;
  durationUnit: "minutes" | "hours";
  workersPerRun: string;
  equipmentMonthly: string;
  specialEnabled: boolean;
  specialSessionsPerWeek: string;
  specialHoursPerSession: string;
  specialWorkers: string;
  activeWeeksPerYear: string;
  unloadingEnabled: boolean;
  unloadingMinutes: string;
  unloadingWorkers: string;
  ballsLostPerYear: string;
  costPerBall: string;
  refundsAnnual: string;
  otherAnnualCost: string;
  annualBaskets: string;
  ballsPerBasket: string;
  savingsEnabled: boolean;
  scenarioId: "conservative" | "expected";
  regularCoveragePct: string;
  specialCoveragePct: string;
  uptimePct: string;
  capacityFitPct: string;
  workflowPct: string;
  adoptionPct: string;
  equipmentAvoidablePct: string;
  customerOpsAnnual: string;
  laborDisposition: LaborDisposition | "";
  cashRealizationPct: string;
  recoveredMarginAnnual: string;
  pricingMode: PricingMode;
  monthlyFee: string;
  hardwarePrice: string;
  installationCost: string;
  sitePrepCost: string;
  integrationTrainingCost: string;
  annualRecurringFee: string;
}

export const EMPTY_FORM: RoiFormState = {
  modelVersion: MODEL_VERSION,
  rateMode: "loaded",
  loadedRate: "",
  baseWage: "",
  burdenPct: "",
  operatingDays: "",
  operatingHours: "",
  frequencyMode: "cycles_per_day",
  cyclesPerDay: "",
  intervalHours: "",
  cyclesOverride: "",
  durationValue: "",
  durationUnit: "minutes",
  workersPerRun: "1",
  equipmentMonthly: "",
  specialEnabled: false,
  specialSessionsPerWeek: "",
  specialHoursPerSession: "",
  specialWorkers: "1",
  activeWeeksPerYear: "52",
  unloadingEnabled: false,
  unloadingMinutes: "",
  unloadingWorkers: "1",
  ballsLostPerYear: "",
  costPerBall: "",
  refundsAnnual: "",
  otherAnnualCost: "",
  annualBaskets: "",
  ballsPerBasket: "",
  savingsEnabled: false,
  scenarioId: "conservative",
  regularCoveragePct: "",
  specialCoveragePct: "",
  uptimePct: "",
  capacityFitPct: "",
  workflowPct: "",
  adoptionPct: "",
  equipmentAvoidablePct: "",
  customerOpsAnnual: "",
  laborDisposition: "",
  cashRealizationPct: "",
  recoveredMarginAnnual: "",
  pricingMode: "raas",
  monthlyFee: "",
  hardwarePrice: "",
  installationCost: "",
  sitePrepCost: "",
  integrationTrainingCost: "",
  annualRecurringFee: "",
};

/** "" → null; invalid/negative → null (formula layer treats null as unknown). */
export function parseNum(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const v = Number(trimmed);
  return Number.isFinite(v) && v >= 0 ? v : null;
}

const parsePct = (raw: string): number | null => {
  const v = parseNum(raw);
  return v === null ? null : v / 100;
};

export function toCalcInput(f: RoiFormState): RoiCalculationInput {
  const durationHours =
    parseNum(f.durationValue) === null
      ? null
      : f.durationUnit === "minutes"
        ? parseNum(f.durationValue)! / 60
        : parseNum(f.durationValue)!;

  const scenarioBase = SCENARIOS.find((s) => s.id === f.scenarioId)!;
  const disposition = f.laborDisposition === "" ? null : f.laborDisposition;
  const realizationFromField = parsePct(f.cashRealizationPct);
  const realization =
    realizationFromField !== null
      ? realizationFromField
      : disposition !== null
        ? DISPOSITION_DEFAULT_REALIZATION[disposition]
        : scenarioBase.cashRealizationFactor;

  return {
    modelVersion: f.modelVersion,
    currency: "USD",
    operatingDaysPerYear: parseNum(f.operatingDays),
    operatingHoursPerDay: parseNum(f.operatingHours),
    laborRate:
      f.rateMode === "loaded"
        ? { loadedRegularRateOverride: parseNum(f.loadedRate), baseWage: null, payrollBurdenRate: null }
        : { loadedRegularRateOverride: null, baseWage: parseNum(f.baseWage), payrollBurdenRate: parsePct(f.burdenPct) },
    regularCollection: {
      frequencyMode: f.frequencyMode,
      cyclesPerDay: parseNum(f.cyclesPerDay),
      intervalHours: parseNum(f.intervalHours),
      cyclesPerDayOverride: parseNum(f.cyclesOverride),
      durationHoursPerOccurrence: durationHours,
      headcount: parseNum(f.workersPerRun),
    },
    specialRecovery: {
      enabled: f.specialEnabled,
      sessionsPerWeek: parseNum(f.specialSessionsPerWeek),
      hoursPerSession: parseNum(f.specialHoursPerSession),
      workersPerSession: parseNum(f.specialWorkers),
      activeWeeksPerYear: parseNum(f.activeWeeksPerYear),
    },
    unloading: {
      enabled: f.unloadingEnabled,
      cyclesPerDay: null, // follows the regular collection cycle count
      durationHoursPerOccurrence:
        parseNum(f.unloadingMinutes) === null ? null : parseNum(f.unloadingMinutes)! / 60,
      headcount: parseNum(f.unloadingWorkers),
    },
    equipmentMonthlyCost: parseNum(f.equipmentMonthly),
    optionalCosts: {
      annualBallsLost: parseNum(f.ballsLostPerYear),
      landedCostPerBall: parseNum(f.costPerBall),
      annualRefundCost: parseNum(f.refundsAnnual),
      otherAnnualDirectCost: parseNum(f.otherAnnualCost),
      annualBaskets: parseNum(f.annualBaskets),
      ballsPerBasket: parseNum(f.ballsPerBasket),
    },
    scenario: f.savingsEnabled
      ? {
          ...scenarioBase,
          regularCollectionCoverageRate: parsePct(f.regularCoveragePct),
          specialRecoveryCoverageRate: f.specialEnabled ? parsePct(f.specialCoveragePct) : 0,
          systemUptime: parsePct(f.uptimePct),
          capacityFit: parsePct(f.capacityFitPct),
          workflowSuccessRate: parsePct(f.workflowPct),
          adoptionRate: parsePct(f.adoptionPct),
          equipmentAvoidableRate: parsePct(f.equipmentAvoidablePct),
          customerIncrementalOperatingCostAnnual: parseNum(f.customerOpsAnnual),
          vendorRecurringFeeAnnual: null, // fee comes from the pricing section
          laborDisposition: disposition,
          cashRealizationFactor: realization,
          recoveredContributionMarginAnnual: parseNum(f.recoveredMarginAnnual),
        }
      : null,
    pricing: f.savingsEnabled
      ? {
          mode: f.pricingMode,
          monthlyFee: parseNum(f.monthlyFee),
          hardwarePrice: parseNum(f.hardwarePrice),
          installationCost: parseNum(f.installationCost),
          sitePreparationCost: parseNum(f.sitePrepCost),
          integrationTrainingCost: parseNum(f.integrationTrainingCost),
          shippingAndTaxCost: null,
          rebates: null,
          tradeInProceeds: null,
          annualRecurringFee: parseNum(f.annualRecurringFee),
        }
      : null,
  };
}

export function useRoiCalculator(): {
  form: RoiFormState;
  setField: <K extends keyof RoiFormState>(key: K, value: RoiFormState[K]) => void;
  reset: () => void;
  result: RoiCalculationResult;
  hydrated: boolean;
} {
  const [form, setForm] = useState<RoiFormState>(EMPTY_FORM);
  const [hydrated, setHydrated] = useState(false);
  const loadedRef = useRef(false);

  // Load persisted inputs once, after mount (SSR-safe).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<RoiFormState>;
        setForm({ ...EMPTY_FORM, ...parsed, modelVersion: MODEL_VERSION });
      }
    } catch {
      // Corrupt storage falls back to the empty form.
    }
    loadedRef.current = true;
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!loadedRef.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      // Storage may be unavailable (private mode); the calculator still works.
    }
  }, [form]);

  const result = useMemo(() => calculateRoi(toCalcInput(form)), [form]);

  return {
    form,
    setField: (key, value) => setForm((prev) => ({ ...prev, [key]: value })),
    reset: () => setForm(EMPTY_FORM),
    result,
    hydrated,
  };
}

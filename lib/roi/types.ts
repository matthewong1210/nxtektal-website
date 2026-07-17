/**
 * NXTektal Manager ROI Calculator — domain types.
 *
 * Source of truth for every formula: NXTektal_ROI_Calculation_Engine_Spec_v1.0_CN.
 * Blank (null) is UNKNOWN and is never treated as 0 (spec §4). All percentages
 * are 0–1 inside this module; the UI converts 0–100 at its boundary.
 */

export const MODEL_VERSION = "nxt-roi-v1.0" as const;
export type ModelVersion = typeof MODEL_VERSION;

export interface LaborRateInput {
  /** Fully loaded $/person-hour. Never combined with base wage + burden (spec F-L01). */
  loadedRegularRateOverride: number | null;
  baseWage: number | null;
  /** 0–1. */
  payrollBurdenRate: number | null;
}

export type FrequencyMode = "cycles_per_day" | "interval_hours";

export interface CollectionScheduleInput {
  frequencyMode: FrequencyMode;
  cyclesPerDay: number | null;
  intervalHours: number | null;
  /** Manager-confirmed count. Once set it always wins over the CEILING suggestion (spec F-T02). */
  cyclesPerDayOverride: number | null;
}

export interface RegularCollectionInput extends CollectionScheduleInput {
  durationHoursPerOccurrence: number | null;
  headcount: number | null;
}

export interface SpecialRecoveryInput {
  enabled: boolean;
  sessionsPerWeek: number | null;
  hoursPerSession: number | null;
  workersPerSession: number | null;
  activeWeeksPerYear: number | null; // shown as 52, editable
}

export interface UnloadingInput {
  enabled: boolean;
  /** Runs per day; defaults to the regular-collection cycle count when null. */
  cyclesPerDay: number | null;
  durationHoursPerOccurrence: number | null;
  headcount: number | null;
}

export interface OptionalCurrentCostInput {
  /** Balls replaced per year × landed cost per ball (spec F-B01). */
  annualBallsLost: number | null;
  landedCostPerBall: number | null;
  /** Annual refunds / service credits caused by empty dispensers (spec F-R04). */
  annualRefundCost: number | null;
  /** Other verified direct annual cash costs (spec §5.8). */
  otherAnnualDirectCost: number | null;
  /** Unit economics display only. */
  annualBaskets: number | null;
  ballsPerBasket: number | null;
}

export type LaborDisposition =
  | "reduce_paid_hours"
  | "reduce_overtime"
  | "avoid_hire"
  | "reassign"
  | "not_sure";

export interface RoiScenarioInput {
  id: "conservative" | "expected" | "high";
  label: string;
  /** True only for values approved by the NXTektal team; false = illustrative. */
  approved: boolean;
  regularCollectionCoverageRate: number | null;
  specialRecoveryCoverageRate: number | null;
  systemUptime: number | null;
  capacityFit: number | null;
  workflowSuccessRate: number | null;
  adoptionRate: number | null;
  equipmentAvoidableRate: number | null;
  customerIncrementalOperatingCostAnnual: number | null;
  vendorRecurringFeeAnnual: number | null;
  /** What happens to freed labor + the cash realization factor it implies (spec F-L09). */
  laborDisposition: LaborDisposition | null;
  cashRealizationFactor: number | null;
  /** Only counted when explicitly entered AND confirmed as contribution margin (spec F-R06). */
  recoveredContributionMarginAnnual: number | null;
}

export type PricingMode = "raas" | "capex";

export interface PricingInput {
  mode: PricingMode;
  /** RaaS. */
  monthlyFee: number | null;
  /** CapEx (spec F-P08). */
  hardwarePrice: number | null;
  installationCost: number | null;
  sitePreparationCost: number | null;
  integrationTrainingCost: number | null;
  shippingAndTaxCost: number | null;
  rebates: number | null;
  tradeInProceeds: number | null;
  annualRecurringFee: number | null;
}

export interface RoiCalculationInput {
  modelVersion: ModelVersion;
  currency: string;
  operatingDaysPerYear: number | null;
  operatingHoursPerDay: number | null;
  laborRate: LaborRateInput;
  regularCollection: RegularCollectionInput;
  specialRecovery: SpecialRecoveryInput;
  unloading: UnloadingInput;
  equipmentMonthlyCost: number | null;
  optionalCosts: OptionalCurrentCostInput;
  scenario: RoiScenarioInput | null;
  pricing: PricingInput | null;
}

export type RoiWarningCode =
  | "required_input_missing"
  | "equipment_cost_not_entered"
  | "scenario_values_missing"
  | "vendor_pricing_missing"
  | "zero_denominator"
  | "negative_net_benefit"
  | "payback_not_achieved"
  | "equipment_retained"
  | "revenue_without_margin_basis"
  | "illustrative_scenario"
  | "ball_loss_partial_input"
  | "model_version_mismatch";

export interface RoiWarning {
  code: RoiWarningCode;
  message: string;
}

export interface BreakdownRow {
  id: string;
  label: string;
  /** Human-readable arithmetic built from the entered values, never hard-coded. */
  calculation: string;
  annualAmount: number | null;
  /** "entered" rows come from the manager; "excluded" rows were left blank. */
  kind: "entered" | "excluded" | "total";
}

export interface AssumptionDisplay {
  id: string;
  label: string;
  value: string;
  source: "user_entered" | "scenario_assumption";
}

export type RoiStatus = "incomplete" | "current_cost_ready" | "full_roi_ready";

export interface RoiCalculationResult {
  modelVersion: ModelVersion;
  status: RoiStatus;
  current: {
    regularAnnualHours: number | null;
    regularAnnualLaborCost: number | null;
    specialAnnualHours: number | null;
    specialAnnualLaborCost: number | null;
    unloadingAnnualHours: number | null;
    unloadingAnnualLaborCost: number | null;
    annualLaborHours: number | null;
    annualLaborCost: number | null;
    annualEquipmentCost: number | null;
    annualBallLossCost: number | null;
    annualRefundCost: number | null;
    annualOtherCost: number | null;
    annualDirectCost: number | null;
    monthlyDirectCost: number | null;
    dailyDirectCost: number | null;
    fteEquivalent: number | null;
    costPerThousandBalls: number | null;
  };
  savings: {
    technicalHoursRemoved: number | null;
    cashPaidHoursAvoided: number | null;
    redeployedCapacityHours: number | null;
    cashLaborSavings: number | null;
    equipmentCashSavings: number | null;
    directGrossCashSavings: number | null;
    customerIncrementalOperatingCost: number | null;
    annualVendorFee: number | null;
    netDirectCashSavingsAfterVendor: number | null;
    recoveredContributionMargin: number | null;
    coreAnnualCustomerNetBenefit: number | null;
    monthlyCoreNetBenefit: number | null;
    postAnnualDirectCost: number | null;
    directCostReductionRate: number | null;
    initialCustomerInvestment: number | null;
    approximatePaybackMonths: number | null;
    monthlyCashFlowPositive: boolean | null;
  };
  breakdown: BreakdownRow[];
  warnings: RoiWarning[];
  assumptions: AssumptionDisplay[];
}

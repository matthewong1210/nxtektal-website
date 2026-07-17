/**
 * Scenario configuration — versioned data, NOT formulas.
 *
 * TODO / ILLUSTRATIVE ONLY: no NXTektal-approved product performance or
 * pricing values exist in this codebase yet. Every value below is null on
 * purpose. Until the team approves numbers (and flips `approved: true`),
 * the calculator:
 *   1. still computes Current Spending normally,
 *   2. lets the presenter enter assumptions by hand in the visible panel,
 *   3. marks every savings figure "Illustrative estimate — assumptions must
 *      be confirmed" and never renders a savings headline as a claim.
 *
 * Fields that must be provided by NXTektal before production claims:
 *   regularCollectionCoverageRate, specialRecoveryCoverageRate, systemUptime,
 *   capacityFit, workflowSuccessRate, adoptionRate, equipmentAvoidableRate,
 *   customerIncrementalOperatingCostAnnual, vendorRecurringFeeAnnual.
 */

import type { RoiScenarioInput } from "./types";

export const SCENARIOS: RoiScenarioInput[] = [
  {
    id: "conservative",
    label: "Conservative",
    approved: false,
    regularCollectionCoverageRate: null,
    specialRecoveryCoverageRate: null,
    systemUptime: null,
    capacityFit: null,
    workflowSuccessRate: null,
    adoptionRate: null,
    equipmentAvoidableRate: null,
    customerIncrementalOperatingCostAnnual: null,
    vendorRecurringFeeAnnual: null,
    laborDisposition: "not_sure",
    // "Not sure" counts nothing in Conservative (prompt §6.3).
    cashRealizationFactor: 0,
    recoveredContributionMarginAnnual: null,
  },
  {
    id: "expected",
    label: "Expected",
    approved: false,
    regularCollectionCoverageRate: null,
    specialRecoveryCoverageRate: null,
    systemUptime: null,
    capacityFit: null,
    workflowSuccessRate: null,
    adoptionRate: null,
    equipmentAvoidableRate: null,
    customerIncrementalOperatingCostAnnual: null,
    vendorRecurringFeeAnnual: null,
    laborDisposition: null,
    cashRealizationFactor: null,
    recoveredContributionMarginAnnual: null,
  },
];

/** Default cash-realization factor implied by each labor-disposition answer (prompt §6.3). */
export const DISPOSITION_DEFAULT_REALIZATION: Record<string, number | null> = {
  reduce_paid_hours: null, // presenter must set the truly avoidable share
  reduce_overtime: null, // presenter must set the truly avoidable share
  avoid_hire: 0, // no planned hire date ⇒ Conservative counts no year-1 cash
  reassign: 0, // released hours are capacity, not payroll savings
  not_sure: 0,
};

export const DISPOSITION_LABELS: Record<string, string> = {
  reduce_paid_hours: "Reduce paid hours / eliminate a shift",
  reduce_overtime: "Reduce overtime",
  avoid_hire: "Avoid a planned hire",
  reassign: "Reassign employees to other work",
  not_sure: "Not sure yet",
};

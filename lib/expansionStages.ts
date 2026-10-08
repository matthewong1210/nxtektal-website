/**
 * Site Brain Terrain Map — stage data and pure helpers
 * (Phase 2D Sprint 3; narrative updated for the site-brain positioning).
 *
 * The Roadmap chapter's three stages, the Site Brain core, and the Beyond
 * Golf loop live here as data so tests can hold the section to the approved
 * narrative: statuses never inflate, capabilities never drift, only the
 * first stage is in development, and no deployment claim can creep into
 * the map.
 */

export type ExpansionStage = {
  /** 1-based stage number, also the default map emphasis order. */
  number: 1 | 2 | 3;
  label: string;
  title: string;
  status: "IN DEVELOPMENT" | "DIRECTION · NOT STARTED" | "LATER DIRECTION";
  capabilities: string[];
};

export const EXPANSION_STAGES: ExpansionStage[] = [
  {
    number: 1,
    label: "FIRST WORKFLOW",
    title: "Range-Ball Operations",
    status: "IN DEVELOPMENT",
    capabilities: [
      "Ball availability monitoring",
      "Demand-responsive dispatch",
      "Collection by the NXTektal collection robot",
      "Return",
      "Automated handoff into the existing washer",
      "Wash-and-dispense coordination",
      "Workflow verification",
    ],
  },
  {
    number: 2,
    label: "NEXT JOBS ACROSS GOLF",
    title: "Inspection and Grounds Care",
    status: "DIRECTION · NOT STARTED",
    capabilities: [
      "Drone inspection and mapping",
      "Turf and soil monitoring",
      "Bunker maintenance",
      "Mowing coordination",
      "Localized maintenance",
      "Equipment inspection",
    ],
  },
  {
    number: 3,
    label: "FACILITY-WIDE COORDINATION",
    title: "One Site Brain Across the Facility",
    status: "LATER DIRECTION",
    capabilities: [
      "Facility-wide shared state beyond the range",
      "Multi-robot scheduling",
      "Predictive maintenance",
      "Equipment logistics",
      "Multi-crew and multi-robot task coordination",
      "Facility-wide operational reporting",
    ],
  },
];

/** The stage selected before any interaction — never auto-advanced. */
export const DEFAULT_STAGE = 1;

/** Site Brain core — present and unchanged through all three stages. */
export const SITE_BRAIN_CORE = {
  name: "NXTektal Site Brain",
  functions: ["Site State", "Planning", "Coordination", "Verification", "Field Feedback"],
};

/** Beyond Golf: the approved adjacent environments — nothing else. */
export const BEYOND_ENVIRONMENTS = [
  "Campuses",
  "Parks",
  "Sports Facilities",
  "Resorts",
  "Commercial Landscapes",
];

/** The transferable operating loop, in approved order (matches the How-it-works chapter). */
export const OPERATING_LOOP = [
  "SENSE",
  "PLAN",
  "COORDINATE",
  "EXECUTE",
  "VERIFY",
];

/** Clamp any input to a valid stage number; invalid input falls back to the default. */
export function clampStage(value: number): 1 | 2 | 3 {
  return value === 2 || value === 3 ? value : DEFAULT_STAGE;
}

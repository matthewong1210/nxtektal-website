/**
 * Operating Layer Terrain Map — stage data and pure helpers
 * (Phase 2D Sprint 3).
 *
 * The Expansion chapter's three stages, the Operating Layer core, and the
 * Beyond Golf loop live here as data so tests can hold the section to the
 * approved narrative: statuses never inflate, capabilities never drift, and
 * no deployment claim can creep into the map.
 */

export type ExpansionStage = {
  /** 1-based stage number, also the default map emphasis order. */
  number: 1 | 2 | 3;
  label: string;
  title: string;
  status: "IN DEVELOPMENT" | "PLATFORM DIRECTION" | "LONG-TERM DIRECTION";
  capabilities: string[];
};

export const EXPANSION_STAGES: ExpansionStage[] = [
  {
    number: 1,
    label: "STARTING POINT",
    title: "Range Ball Operations",
    status: "IN DEVELOPMENT",
    capabilities: [
      "Ball availability monitoring",
      "Demand-responsive dispatch",
      "Collection",
      "Return",
      "Automated handoff",
      "Wash-and-dispense coordination",
      "Workflow verification",
    ],
  },
  {
    number: 2,
    label: "EXPANDING ACROSS GOLF",
    title: "Inspection and Grounds Care",
    status: "PLATFORM DIRECTION",
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
    label: "FACILITY-WIDE AUTONOMY",
    title: "One Coordinated Operating Layer",
    status: "LONG-TERM DIRECTION",
    capabilities: [
      "Shared facility state",
      "Multi-robot scheduling",
      "Predictive maintenance",
      "Equipment logistics",
      "Human-and-robot task coordination",
      "Facility-wide operational reporting",
    ],
  },
];

/** The stage selected before any interaction — never auto-advanced. */
export const DEFAULT_STAGE = 1;

/** Operating Layer core — present and unchanged through all three stages. */
export const OPERATING_LAYER = {
  name: "NXTektal Operating Layer",
  functions: ["Shared State", "Prioritization", "Dispatch", "Verification", "Learning"],
};

/** Beyond Golf: the approved adjacent environments — nothing else. */
export const BEYOND_ENVIRONMENTS = [
  "Campuses",
  "Parks",
  "Sports Facilities",
  "Resorts",
  "Commercial Landscapes",
];

/** The transferable operating loop, in approved order. */
export const OPERATING_LOOP = [
  "SENSE",
  "PRIORITIZE",
  "DISPATCH",
  "EXECUTE",
  "VERIFY",
  "IMPROVE",
];

/** Clamp any input to a valid stage number; invalid input falls back to the default. */
export function clampStage(value: number): 1 | 2 | 3 {
  return value === 2 || value === 3 ? value : DEFAULT_STAGE;
}

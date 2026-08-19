/**
 * Course Intelligence & smart-cart retrofit chapter — approved copy as data
 * (mirrors the expansionStages/equipmentCompare pattern) so tests can hold
 * the section to the qualified narrative: statuses never inflate, the cart
 * stays human-driven, landing output stays probabilistic, and course-care
 * execution stays future and human-confirmed.
 *
 * Narrative position: after the intelligence layer, before ROI and the
 * Expansion chapters. The driving-range closed loop remains the current
 * commercial wedge; this chapter is the next platform layer, not a pivot.
 */

export type CourseIntelligenceStage = {
  /** 1-based stage number in platform order. */
  number: 1 | 2 | 3;
  label: string;
  title: string;
  body: string;
  status: "PLATFORM DIRECTION" | "FUTURE MODULE";
};

export const COURSE_INTEL_STAGES: CourseIntelligenceStage[] = [
  {
    number: 1,
    label: "SCAN & COMMISSION",
    title: "Build a shared 3D understanding of the course.",
    body: "Professional site scanning captures terrain, elevation, fairways, greens, bunkers, water, cart paths, trees, and operating zones. The processed map becomes a structured Course World Model available to the facility's local NXTektal deployment.",
    status: "PLATFORM DIRECTION",
  },
  {
    number: 2,
    label: "RETROFIT EXISTING CARTS",
    title: "Add intelligence without replacing the fleet.",
    body: "Positioning, edge compute, a player display, and compatible launch-monitor data can turn an existing cart into a connected sensing node. Each observed shot can be projected into the course model as a likely landing region and used to guide the player toward the search area.",
    status: "PLATFORM DIRECTION",
  },
  {
    number: 3,
    label: "LOCALIZED COURSE CARE",
    title: "Add mechanical execution after the sensing loop is proven.",
    body: "A future removable module can inspect the strike area, dispense a measured amount of sand, press the repair, and verify the result. Initial operation would remain stationary, safety-gated, and human-confirmed.",
    status: "FUTURE MODULE",
  },
];

/** The platform sequence strip. REPAIR is the future step. */
export const COURSE_INTEL_LOOP = [
  "MAP",
  "LOCALIZE",
  "OBSERVE",
  "PREDICT",
  "GUIDE",
  "LEARN",
  "REPAIR",
] as const;

export type FlowNode = { name: string; note: string };

/** Main system flow — every node ships with its qualifying annotation. */
export const COURSE_INTEL_FLOW: FlowNode[] = [
  { name: "Professional course scan", note: "At deployment, by the NXTektal team" },
  { name: "3D Course World Model", note: "Stored at the facility · queried as structured map data" },
  { name: "Existing golf cart + retrofit kit", note: "Human-driven · a connected sensing node" },
  { name: "Position + shot observation", note: "Compatible launch monitors · vendor-neutral adapter" },
  { name: "Predicted landing region", note: "A probability region, not an exact point" },
  { name: "Player guidance + facility intelligence", note: "Search area · distance and club context" },
  { name: "NXTektal Operating Layer", note: "Shared state, decisions, and learning" },
];

/** Future branch — amber, safety-gated, human-confirmed. */
export const COURSE_INTEL_FUTURE_FLOW: FlowNode[] = [
  { name: "Strike-area observation", note: "Cart stationary · parking state confirmed" },
  { name: "Human-confirmed divot repair", note: "Measured sand · force-limited press" },
  { name: "Verified course-care record", note: "Camera-verified result" },
];

export const COURSE_INTEL_PLAYER_VALUE = [
  "Course context on every hole",
  "A predicted landing region for each observed shot",
  "Guidance toward the ball-search area",
  "Distance, elevation, and club context",
  "A personal shot history that improves over time",
];

export const COURSE_INTEL_FACILITY_VALUE = [
  "A shared, calibrated 3D course model",
  "Connected-cart sensing across the course",
  "Shot and traffic observations for operations",
  "Maintenance-location intelligence",
  "New structured inputs to the operating layer",
];

export const COURSE_INTEL_QUALIFICATION =
  "Illustrative platform direction — not live facility data or a deployed cart integration.";

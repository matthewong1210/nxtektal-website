/**
 * Course Intelligence chapter — approved copy as data (mirrors the
 * expansionStages/equipmentCompare pattern) so tests can hold the section
 * to the qualified narrative.
 *
 * Narrative spine (grounds operations first): map the course into a
 * versioned 3D Course World Model, let existing human-driven carts inspect
 * it continuously as mobile sensing nodes, separate course CONDITION from
 * inspection COVERAGE, cluster and deduplicate repeat observations into
 * tracked issues, deliver an evidence-backed maintenance briefing, keep
 * the grounds supervisor in control of every decision, and verify repairs
 * on a later cart pass. Player-facing shot intelligence is an OPTIONAL
 * module on the same mapped infrastructure; mechanical course care is a
 * FUTURE, safety-gated execution branch.
 *
 * Narrative position: after the intelligence layer, before ROI and the
 * Expansion chapters. The driving-range closed loop remains the current
 * commercial wedge; this chapter is the next platform layer, not a pivot.
 */

/** Every piece of public-facing chapter copy that is not already one of the
 * structured collections below — so the complete rendered corpus sits under
 * the claims-discipline tests. */
export type CourseIntelligenceCopy = {
  eyebrow: string;
  heading: string;
  tagline: string;
  /** Introductory paragraphs, in render order. */
  intro: readonly string[];
  support: string;
  briefingTitle: string;
  briefingTag: string;
  briefingCaption: string;
  facilityHeading: string;
  playerHeading: string;
  thesis: string;
};

export const COURSE_INTEL_COPY: CourseIntelligenceCopy = {
  eyebrow: "COURSE INTELLIGENCE · PLATFORM DIRECTION",
  heading: "Map the course once. Let every cart inspect it continuously.",
  tagline: "Map deeply. Inspect continuously. Maintain proactively.",
  intro: [
    "At deployment, NXTektal can turn a golf course into a calibrated, versioned 3D Course World Model. Positioning, calibrated cameras, edge processing, and connectivity can then turn existing golf carts into mobile inspection nodes — capturing georeferenced evidence of divots and turf anomalies during normal operation.",
    "NXTektal can combine repeat observations, distinguish course condition from inspection coverage, and turn the resulting evidence into prioritized maintenance recommendations for the grounds team.",
  ],
  support:
    "The carts remain human-driven, and grounds supervisors remain in control of every maintenance decision. Player-facing shot intelligence can operate on the same mapped infrastructure as an optional module.",
  briefingTitle: "GROUNDS MAINTENANCE BRIEFING",
  briefingTag: "ILLUSTRATIVE CONCEPT",
  briefingCaption:
    "Illustrative supervisor briefing — simulated content, not live facility data. Every action remains a human decision.",
  facilityHeading: "For the facility",
  playerHeading: "Optional player intelligence",
  thesis:
    "The unit of autonomy is the facility, not a single robot. A retrofitted cart is not a standalone consumer gadget — it is a mobile inspection node in the NXTektal operating layer.",
};

export type CourseIntelligenceStage = {
  /** 1-based stage number in platform order. */
  number: 1 | 2 | 3;
  label: string;
  title: string;
  body: string;
  status: "PLATFORM DIRECTION";
};

export const COURSE_INTEL_STAGES: CourseIntelligenceStage[] = [
  {
    number: 1,
    label: "MAP & COMMISSION",
    title: "Establish a shared spatial baseline for the course.",
    body: "Professional site scanning captures terrain, elevation, fairways, greens, bunkers, water, cart paths, and operating zones in one coordinate system. The processed map becomes a versioned Course World Model — the shared spatial baseline for the facility's local NXTektal deployment.",
    status: "PLATFORM DIRECTION",
  },
  {
    number: 2,
    label: "INSPECT CONTINUOUSLY",
    title: "Turn the carts already on site into mobile inspection nodes.",
    body: "Positioning, calibrated cameras, and edge processing can let existing carts capture divot and turf-anomaly candidates during normal operation — selected evidence with coordinates, time, and camera pose rather than full video uploads. Coverage is recorded only where a valid view was actually obtained.",
    status: "PLATFORM DIRECTION",
  },
  {
    number: 3,
    label: "PRIORITIZE & VERIFY",
    title: "Turn repeated observations into evidence-backed grounds recommendations.",
    body: "Repeat observations can be clustered and deduplicated into tracked condition issues, weighed against inspection coverage and evidence gaps, and delivered as a prioritized maintenance briefing. The grounds supervisor confirms each action, and a later cart pass can verify the repair.",
    status: "PLATFORM DIRECTION",
  },
];

/** The grounds-intelligence operating sequence. */
export const COURSE_INTEL_LOOP = [
  "MAP",
  "LOCALIZE",
  "INSPECT",
  "DETECT",
  "DEDUPLICATE",
  "PRIORITIZE",
  "CONFIRM",
  "VERIFY",
] as const;

export type FlowNode = { name: string; note: string };

/** Main system flow — grounds operations. No launch-monitor or actuator
 * vocabulary belongs here: those live only in their branches below. */
export const COURSE_INTEL_FLOW: FlowNode[] = [
  { name: "Professional course scan", note: "At deployment, by the NXTektal team" },
  { name: "Versioned 3D Course World Model", note: "Shared facility infrastructure · queried as structured map data" },
  { name: "Existing cart + pose + calibrated camera", note: "Human-driven · a mobile inspection node" },
  { name: "Edge-filtered condition observations", note: "Selected evidence with coordinates, time, and camera pose — not full video" },
  { name: "Condition + coverage", note: "Two records, kept distinct" },
  { name: "Issue clustering + deduplication", note: "Repeat observations become tracked issues" },
  { name: "Evidence-backed maintenance briefing", note: "Prioritized for the grounds team" },
  { name: "Grounds supervisor decision", note: "Human-reviewed: confirm, defer, monitor, or reject" },
  { name: "Crew action", note: "Existing staff and equipment" },
  { name: "Later cart pass verifies outcome", note: "Verification recorded against the issue" },
  { name: "NXTektal Operating Layer", note: "Shared state, decisions, and learning" },
];

/** The condition/coverage distinction rendered inside the flow. */
export const COURSE_INTEL_CONDITION_COVERAGE = [
  { name: "Course condition", note: "What did the carts observe?" },
  { name: "Inspection coverage", note: "Where did the carts obtain a valid view?" },
] as const;

export const COURSE_INTEL_COVERAGE_CALLOUT =
  "No observation is not the same as no issue. NXTektal is designed to report where evidence is sufficient — and where inspection coverage remains incomplete.";

/** Optional player branch — the only place launch-monitor vocabulary may appear. */
export const COURSE_INTEL_PLAYER_BRANCH_LABEL = "OPTIONAL PLAYER MODULE";

export const COURSE_INTEL_PLAYER_FLOW: FlowNode[] = [
  { name: "Compatible launch-monitor data", note: "Vendor-neutral adapter · from the cart node" },
  { name: "Predicted landing region", note: "A probability region, not an exact point" },
  { name: "Ball-search + club guidance", note: "Course-aware distance and elevation" },
];

/** Future execution branch — the only place actuator vocabulary may appear. */
export const COURSE_INTEL_FUTURE_BRANCH_LABEL =
  "FUTURE COURSE-CARE MODULE · SAFETY-GATED";

export const COURSE_INTEL_FUTURE_FLOW: FlowNode[] = [
  { name: "Human-confirmed issue", note: "Cart stationary · parking state confirmed" },
  { name: "Measured sand + force-limited tamp", note: "A future removable module" },
  { name: "Camera-verified outcome", note: "Recorded against the course-care history" },
];

export const COURSE_INTEL_FACILITY_VALUE = [
  "Versioned 3D Course World Model",
  "Mobile cart-based inspection",
  "Inspection coverage and evidence quality",
  "Georeferenced condition observations",
  "Repeat-issue clustering and deduplication",
  "Prioritized grounds maintenance briefing",
  "Supervisor review and decision history",
  "Repair verification",
  "Operational memory over time",
];

export const COURSE_INTEL_PLAYER_VALUE = [
  "Predicted landing region",
  "Ball-search guidance",
  "Course-aware distance and elevation",
  "Club recommendation",
  "Personal shot history",
];

/** Illustrative grounds-briefing concept rows (simulated content, matching
 * the site's existing illustrative-dashboard precedent). */
export type BriefingRow = {
  place: string;
  finding: string;
  evidence: string;
  action: string;
};

export const COURSE_INTEL_BRIEFING: BriefingRow[] = [
  {
    place: "HOLE 7 · FAIRWAY",
    finding: "7 independent repair areas · repeated across 4 cart observations",
    evidence: "Evidence quality: High",
    action: "Suggested action: Inspect before opening",
  },
  {
    place: "HOLE 12 · WHITE TEE",
    finding: "Repeated turf-wear candidate · trend: expanding",
    evidence: "Evidence quality: Medium",
    action: "Suggested action: Review tee-marker rotation",
  },
  {
    place: "COVERAGE GAP · HOLE 9 · LEFT ROUGH",
    finding: "Insufficient valid inspection",
    evidence: "No conclusion is drawn for this area",
    action: "Suggested action: Route a validating pass",
  },
];

export const COURSE_INTEL_BRIEFING_ACTIONS = [
  "CONFIRM",
  "DEFER",
  "MONITOR",
  "FALSE POSITIVE",
] as const;

export const COURSE_INTEL_QUALIFICATION =
  "Illustrative platform direction — not live facility data or a deployed cart integration.";

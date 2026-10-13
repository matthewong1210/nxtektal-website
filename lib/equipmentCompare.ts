/**
 * Existing Equipment Workflow Compare — data model and pure helpers
 * (Phase 2D Sprint 2C).
 *
 * The comparison renders two corresponding workflow states over one shared
 * coordinate system. Everything the diagrams say is defined here as data so
 * tests can hold the section to the approved vocabulary: existing equipment
 * stays visible in both states, manual steps are labeled, the washer-to-
 * dispenser step stays manual and unchanged in the NXTektal state (washing
 * and dispensing are outside current scope), the transfer mechanism is
 * never named as settled, and no compatibility claim ever widens.
 */

export type NodeKind = "existing" | "manual" | "nxt" | "verify";

export type WorkflowNode = { label: string; kind: NodeKind };

export type WorkflowState = {
  key: "current" | "nxtektal";
  label: string;
  nodes: WorkflowNode[];
  conditions: string[];
};

/** STATE A — the typical current workflow. */
export const CURRENT_WORKFLOW: WorkflowState = {
  key: "current",
  label: "TYPICAL CURRENT WORKFLOW",
  nodes: [
    { label: "Collection equipment", kind: "existing" },
    { label: "Manual unloading", kind: "manual" },
    { label: "Existing washer", kind: "existing" },
    { label: "Manual transfer", kind: "manual" },
    { label: "Existing dispenser", kind: "existing" },
  ],
  conditions: [
    "Fixed or manual dispatch",
    "Separate task and equipment states",
    "Manual handoffs",
    "Limited end-to-end verification",
  ],
};

/** STATE B — the same facility with the NXTektal workflow added (design, in development). */
export const NXTEKTAL_WORKFLOW: WorkflowState = {
  key: "nxtektal",
  label: "WITH NXTEKTAL · IN DEVELOPMENT",
  nodes: [
    { label: "Site Brain: Sense & Decide", kind: "nxt" },
    { label: "Collection Robot", kind: "nxt" },
    { label: "Handoff & Transfer", kind: "nxt" },
    { label: "Confirm & Report", kind: "verify" },
    { label: "Existing washer", kind: "existing" },
    { label: "Manual transfer (unchanged)", kind: "manual" },
    { label: "Existing dispenser", kind: "existing" },
  ],
  conditions: [
    "Demand-aware dispatch",
    "Coordinated equipment state",
    "Designed to replace manual unloading at the handoff point",
    "Transfer confirmation before collection resumes",
    "Washing and dispensing unchanged — outside current scope",
    "Exceptions flagged to a person",
  ],
};

export const WHAT_STAYS = [
  "Existing washer and dispenser",
  "Receiving and storage equipment (compatibility checked per site)",
  "Facility operating rules",
  "Manager oversight and approvals",
];

export const WHAT_NXTEKTAL_ADDS = [
  "Site Brain: sensing, decisions, and coordination",
  "NXTektal collection robot",
  "Handoff and transfer into the existing washer intake (mechanism in development)",
  "Transfer confirmation before collection resumes",
  "Exception flags and operating recommendations",
];

/** Default comparison position: an even split. */
export const COMPARE_DEFAULT = 50;

/** Clamp a compare position to the 0–100 range; NaN recenters. */
export function clampComparePosition(value: number): number {
  if (Number.isNaN(value)) return COMPARE_DEFAULT;
  return Math.min(100, Math.max(0, value));
}

/** True when the state keeps the facility's washer and dispenser visible. */
export function representsExistingEquipment(state: WorkflowState): boolean {
  const text = state.nodes
    .filter((n) => n.kind === "existing")
    .map((n) => n.label.toLowerCase())
    .join(" ");
  return text.includes("washer") && text.includes("dispenser");
}

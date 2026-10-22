/**
 * Handoff schematic panels — RETURN / DOCK → TRANSFER → CONFIRM & RELEASE.
 * Data, so tests can hold the three panels and the figure caption to the
 * mechanism-neutral handoff rule: the transfer mechanism is under
 * development, nothing names a settled mechanism, and confirmation is a
 * workflow requirement.
 */

export type HandoffGlyphKind = "dock" | "transfer" | "verify";

export type HandoffPanel = {
  step: string;
  name: string;
  label: string;
  alt: string;
  tag: string;
  glyph: HandoffGlyphKind;
};

export const HANDOFF_PANELS: HandoffPanel[] = [
  {
    step: "01",
    name: "RETURN / DOCK",
    label: "Collected balls return to the handoff point",
    alt: "Schematic: the collection robot arriving at the handoff point beside the existing washer intake",
    tag: "WORKFLOW SCHEMATIC",
    glyph: "dock",
  },
  {
    step: "02",
    name: "TRANSFER",
    label: "Transfer into the existing washer intake",
    alt: "Schematic: collected balls moving from the robot to the existing washer intake; the transfer mechanism is not drawn because it is still under development",
    tag: "MECHANISM UNDER DEVELOPMENT",
    glyph: "transfer",
  },
  {
    step: "03",
    name: "CONFIRM & RELEASE",
    label: "Transfer confirmed and logged — collection resumes",
    alt: "Schematic: transfer confirmation recorded before the robot is released for the next run",
    tag: "WORKFLOW REQUIREMENT",
    glyph: "verify",
  },
];

export const HANDOFF_SCHEMATIC_CAPTION =
  "Workflow schematic. The transfer mechanism is not drawn because it is still under development; compatibility with each site’s washer intake is confirmed on site.";

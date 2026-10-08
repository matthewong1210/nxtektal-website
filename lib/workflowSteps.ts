/**
 * First Closed-Loop Workflow — step content and the pure activation logic
 * behind the scroll-driven story (Phase 2D Sprint 2A).
 *
 * Kept free of React/DOM so the activation rules and media mapping are unit
 * testable: WorkflowStory measures the DOM and delegates every decision to
 * these functions.
 */

import { workflowStepLoops, workflowStepStills } from "./visualAssets";

export type WorkflowStep = { name: string; body: string };

/** The approved eight steps, in approved order. */
export const WORKFLOW_STEPS: WorkflowStep[] = [
  { name: "MONITOR", body: "Ball availability and demand are tracked across the range from sensors and the dispenser." },
  { name: "PRIORITIZE", body: "The Site Brain decides when a collection run is worth making, within the rules the manager has set." },
  { name: "DISPATCH", body: "A collection task is issued to the NXTektal collection robot." },
  { name: "COLLECT", body: "The robot sweeps priority zones with its front roller picker and fills its onboard hopper." },
  { name: "RETURN", body: "It navigates back to the handoff point by the range building." },
  { name: "HANDOFF", body: "The hopper load transfers through the handoff unit into the range’s existing washer intake." },
  { name: "WASH & DISPENSE", body: "The facility’s existing washer and dispenser process the balls and return them to players." },
  { name: "VERIFY", body: "The handoff and the run are confirmed complete and logged; anything unconfirmed is flagged to a person." },
];

/**
 * Media identity for a step:
 * - `still:<index>` — a registered still (simulator frames);
 * - `vloop:<index>` — a registered per-step ambient loop (RETURN / HANDOFF /
 *   WASH & DISPENSE render footage);
 * - `loop` — the shared robot-field fallback (COLLECT, and any step with
 *   nothing registered).
 * Each key is one crossfade identity: equal keys never crossfade (which
 * would restart a playing video); distinct keys always do.
 */
export function mediaKeyFor(index: number): string {
  if (workflowStepStills[index]) return `still:${index}`;
  if (workflowStepLoops[index]) return `vloop:${index}`;
  return "loop";
}

/** True when the step renders the shared robot-field loop. */
export function isLoopStep(index: number): boolean {
  return mediaKeyFor(index) === "loop";
}

/**
 * Distinct media for the sequential (mobile / no-JS) story: registered
 * stills always show; per-step loops show their poster still (no mobile
 * autoplay video for these); the shared robot-field loop appears once, at
 * the first fallback-backed step (COLLECT), instead of repeating an
 * identical clip under later steps.
 */
export function sequentialMediaFor(index: number): "still" | "poster" | "loop" | null {
  if (workflowStepStills[index]) return "still";
  if (workflowStepLoops[index]) return "poster";
  const firstLoop = WORKFLOW_STEPS.findIndex(
    (_, i) => !workflowStepStills[i] && !workflowStepLoops[i]
  );
  return index === firstLoop ? "loop" : null;
}

/** Hysteresis in pixels: a boundary must be crossed by this much to switch. */
export const ACTIVATION_HYSTERESIS_PX = 8;

/**
 * Resolve the active step from measured step tops (viewport-relative px)
 * and the activation line (a fixed fraction of the viewport height).
 *
 * The raw rule — "last step whose top sits above the line" — is monotonic
 * in scroll position, so up/down/fast scrolling and mid-section refreshes
 * all resolve identically from geometry alone. The hysteresis band keeps
 * sub-pixel scroll jitter at an exact boundary from flickering the state.
 */
export function resolveActiveStep(
  tops: number[],
  activationLine: number,
  current: number,
  hysteresis: number = ACTIVATION_HYSTERESIS_PX
): number {
  if (tops.length === 0) return 0;
  let raw = 0;
  for (let i = 0; i < tops.length; i += 1) {
    if (tops[i] <= activationLine) raw = i;
  }
  if (current < 0 || current >= tops.length) return raw;
  if (raw > current) {
    // Moving down: the new step must clear the line by the hysteresis.
    return tops[raw] <= activationLine - hysteresis ? raw : current;
  }
  if (raw < current) {
    // Moving up: the current step must have fallen back past the line.
    return tops[current] > activationLine + hysteresis ? raw : current;
  }
  return current;
}

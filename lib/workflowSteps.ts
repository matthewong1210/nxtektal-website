/**
 * First Closed-Loop Workflow — step content and the pure activation logic
 * behind the scroll-driven story (Phase 2D Sprint 2A).
 *
 * Kept free of React/DOM so the activation rules and media mapping are unit
 * testable: WorkflowStory measures the DOM and delegates every decision to
 * these functions.
 */

import { workflowStepStills } from "./visualAssets";

export type WorkflowStep = { name: string; body: string };

/** The approved eight steps, in approved order. Copy is unchanged. */
export const WORKFLOW_STEPS: WorkflowStep[] = [
  { name: "MONITOR", body: "Ball availability and demand are tracked across the range." },
  { name: "PRIORITIZE", body: "The Range Operations Agent decides when collection is worth running." },
  { name: "DISPATCH", body: "A mission is issued to the collection system." },
  { name: "COLLECT", body: "The robot sweeps priority zones and fills its hopper." },
  { name: "RETURN", body: "It navigates back to the handoff point." },
  { name: "HANDOFF", body: "Balls transfer into the modular handoff unit." },
  { name: "WASH & DISPENSE", body: "The facility’s existing equipment processes and returns balls to players." },
  { name: "VERIFY", body: "The workflow is confirmed complete and logged for review." },
];

/**
 * Media identity for a step: `still:<index>` for a registered simulator
 * still, `loop` for the shared robot-field fallback. Contiguous loop-backed
 * steps share one identity so the stage never crossfades a video into
 * itself (which would restart playback).
 */
export function mediaKeyFor(index: number): string {
  return workflowStepStills[index] ? `still:${index}` : "loop";
}

/** True when the step renders the shared robot-field loop. */
export function isLoopStep(index: number): boolean {
  return mediaKeyFor(index) === "loop";
}

/**
 * Distinct media for the sequential (mobile / no-JS) story: steps with a
 * registered still always show it; the shared loop appears once, at the
 * first loop-backed step (COLLECT), instead of repeating an identical clip
 * under RETURN / HANDOFF / WASH.
 */
export function sequentialMediaFor(index: number): "still" | "loop" | null {
  if (workflowStepStills[index]) return "still";
  const firstLoop = WORKFLOW_STEPS.findIndex((_, i) => !workflowStepStills[i]);
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

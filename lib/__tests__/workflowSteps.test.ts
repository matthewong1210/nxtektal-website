import { describe, expect, it } from "vitest";

import {
  ACTIVATION_HYSTERESIS_PX,
  WORKFLOW_STEPS,
  isLoopStep,
  mediaKeyFor,
  resolveActiveStep,
  sequentialMediaFor,
} from "../workflowSteps";

describe("step order and content", () => {
  it("keeps the approved eight steps in approved order", () => {
    expect(WORKFLOW_STEPS.map((s) => s.name)).toEqual([
      "MONITOR",
      "PRIORITIZE",
      "DISPATCH",
      "COLLECT",
      "RETURN",
      "HANDOFF",
      "WASH & DISPENSE",
      "VERIFY",
    ]);
  });
});

describe("registered-media mapping and fallback", () => {
  it("maps simulator stills to MONITOR/PRIORITIZE/DISPATCH/VERIFY and the loop to the rest", () => {
    expect(WORKFLOW_STEPS.map((_, i) => mediaKeyFor(i))).toEqual([
      "still:0",
      "still:1",
      "still:2",
      "loop",
      "loop",
      "loop",
      "loop",
      "still:7",
    ]);
  });

  it("shares one media identity across contiguous loop steps so video never restarts", () => {
    expect(mediaKeyFor(3)).toBe(mediaKeyFor(6));
    expect(isLoopStep(3)).toBe(true);
    expect(isLoopStep(0)).toBe(false);
  });

  it("sequential story shows each still, the loop once at COLLECT, and no duplicate clips", () => {
    expect(WORKFLOW_STEPS.map((_, i) => sequentialMediaFor(i))).toEqual([
      "still",
      "still",
      "still",
      "loop",
      null,
      null,
      null,
      "still",
    ]);
  });
});

describe("active-step resolution", () => {
  const line = 400;
  // Steps every 300px starting at 150: at zero scroll only step 0 sits
  // above the 400px activation line.
  const topsAt = (scroll: number) =>
    WORKFLOW_STEPS.map((_, i) => 150 + i * 300 - scroll);

  it("resolves step 0 on initial load with no scroll", () => {
    expect(resolveActiveStep(topsAt(0), line, -1)).toBe(0);
  });

  it("resolves the correct step when refreshed mid-section", () => {
    // Scrolled deep into the section: steps 0-5 above the line.
    expect(resolveActiveStep(topsAt(1500), line, -1)).toBe(5);
  });

  it("advances while scrolling down and returns while scrolling up", () => {
    let active = resolveActiveStep(topsAt(0), line, -1);
    active = resolveActiveStep(topsAt(320), line, active);
    expect(active).toBe(1);
    active = resolveActiveStep(topsAt(920), line, active);
    expect(active).toBe(3);
    active = resolveActiveStep(topsAt(320), line, active);
    expect(active).toBe(1);
    active = resolveActiveStep(topsAt(0), line, active);
    expect(active).toBe(0);
  });

  it("survives a fast jump straight to the end and back", () => {
    let active = resolveActiveStep(topsAt(0), line, -1);
    active = resolveActiveStep(topsAt(9999), line, active);
    expect(active).toBe(7);
    active = resolveActiveStep(topsAt(0), line, active);
    expect(active).toBe(0);
  });

  it("does not flicker inside the hysteresis band at an exact boundary", () => {
    // Step 1's top sits exactly on the line: raw would flip to 1, but the
    // boundary is not cleared by the hysteresis margin.
    const exactlyAtLine = topsAt(150 + 300 - line); // tops[1] === line
    expect(resolveActiveStep(exactlyAtLine, line, 0)).toBe(0);
    // A few px past the line is still inside the band — no switch either way.
    const insideBand = topsAt(150 + 300 - line + ACTIVATION_HYSTERESIS_PX - 2);
    expect(resolveActiveStep(insideBand, line, 0)).toBe(0);
    // Clearing the band switches.
    const pastBand = topsAt(150 + 300 - line + ACTIVATION_HYSTERESIS_PX + 2);
    expect(resolveActiveStep(pastBand, line, 0)).toBe(1);
  });
});

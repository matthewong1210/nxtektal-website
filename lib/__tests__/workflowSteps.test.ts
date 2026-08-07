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

describe("registered-media mapping (Phase 2D Sprint 2B: eight identities)", () => {
  it("keeps simulator stills at [0], [1], [2], [7] and physical media at [3]-[6]", () => {
    expect(WORKFLOW_STEPS.map((_, i) => mediaKeyFor(i))).toEqual([
      "still:0", // MONITOR — simulator still
      "still:1", // PRIORITIZE — simulator still
      "still:2", // DISPATCH — simulator still
      "vloop:3", // COLLECT — dedicated collection loop (approved render)
      "vloop:4", // RETURN — dedicated loop
      "vloop:5", // HANDOFF — dedicated loop
      "vloop:6", // WASH & DISPENSE — dedicated loop
      "still:7", // VERIFY — simulator still
    ]);
  });

  it("gives every one of the eight steps a distinct media identity", () => {
    const keys = WORKFLOW_STEPS.map((_, i) => mediaKeyFor(i));
    expect(new Set(keys).size).toBe(8);
  });

  it("no longer groups HANDOFF or WASH & DISPENSE under COLLECT's identity", () => {
    expect(mediaKeyFor(5)).not.toBe(mediaKeyFor(3));
    expect(mediaKeyFor(6)).not.toBe(mediaKeyFor(3));
    expect(mediaKeyFor(6)).not.toBe(mediaKeyFor(5));
  });

  it("no step renders the retired shared robot-field fallback", () => {
    expect(WORKFLOW_STEPS.map((_, i) => isLoopStep(i))).toEqual([
      false, false, false, false, false, false, false, false,
    ]);
  });

  it("sequential story gives every step visible media: stills, loop once, posters for step loops", () => {
    expect(WORKFLOW_STEPS.map((_, i) => sequentialMediaFor(i))).toEqual([
      "still",
      "still",
      "still",
      "poster",
      "poster",
      "poster",
      "poster",
      "still",
    ]);
  });
});

describe("registry asset contracts", () => {
  it("simulator stills carry the simulation qualification caption", async () => {
    const { workflowStepStills } = await import("../visualAssets");
    for (const i of [0, 1, 2, 7]) {
      expect(workflowStepStills[i]?.caption).toMatch(/not live facility data/i);
    }
  });

  it("physical step loops each declare webm, mp4, and an alt-bearing poster still", async () => {
    const { workflowStepLoops } = await import("../visualAssets");
    for (const i of [3, 4, 5, 6]) {
      const loop = workflowStepLoops[i];
      expect(loop).not.toBeNull();
      expect(loop!.webm).toMatch(/\.webm$/);
      expect(loop!.mp4).toMatch(/\.mp4$/);
      expect(loop!.still.alt.length).toBeGreaterThan(10);
    }
    const { workflowStepStills } = await import("../visualAssets");
    expect(workflowStepStills[3]).toBeNull();
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

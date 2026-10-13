import { describe, expect, it } from "vitest";

import {
  ACTIVATION_HYSTERESIS_PX,
  MEDIA_TAGS,
  WORKFLOW_STEPS,
  captionFor,
  isLoopStep,
  mediaKeyFor,
  mediaTagFor,
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

describe("handoff wording (mechanism-neutral, confirmation required)", () => {
  it("states the handoff as a design requirement and names no settled mechanism or container", () => {
    const handoff = WORKFLOW_STEPS[5].body;
    expect(handoff).toContain("return to a handoff point for transfer into the range’s existing washer intake");
    expect(handoff).toContain("requires transfer confirmation before collection resumes");
    expect(handoff.toLowerCase()).toContain("mechanism is under development");
    const all = WORKFLOW_STEPS.map((s) => s.body).join(" ").toLowerCase();
    for (const banned of ["hopper", "basket", "chute", "conveyor", "robotic arm", "handoff unit", "lift and tilt"]) {
      expect(all).not.toContain(banned);
    }
  });

  it("keeps washing and dispensing with the existing equipment, outside current scope", () => {
    expect(WORKFLOW_STEPS[6].body.toLowerCase()).toContain("outside nxtektal’s current scope");
  });
});

describe("media labels (simulation vs concept, visible in the frame)", () => {
  it("labels every step and marks the handoff footage as a concept with the mechanism under development", () => {
    expect(MEDIA_TAGS).toHaveLength(WORKFLOW_STEPS.length);
    expect(mediaTagFor(5)).toContain("TRANSFER MECHANISM UNDER DEVELOPMENT");
    for (const i of [0, 1, 2, 7]) expect(mediaTagFor(i)).toBe("SIMULATION");
    for (const i of [3, 4, 5, 6]) expect(mediaTagFor(i)!.startsWith("CONCEPT")).toBe(true);
  });

  it("gives every step a caption: simulation qualification or a concept caption", () => {
    for (let i = 0; i < WORKFLOW_STEPS.length; i += 1) {
      expect(captionFor(i), `step ${i} caption`).toBeTruthy();
    }
    expect(captionFor(5)).toBe("Concept visualization. Transfer mechanism under development.");
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

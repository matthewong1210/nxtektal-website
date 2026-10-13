import { describe, expect, it } from "vitest";

import { heroMasterFrame, workflowStepLoops, workflowStepStills } from "../visualAssets";

/**
 * Alt text and captions are user-facing copy. They must follow the same
 * handoff rules as the body copy: no container word, no mechanism named as
 * settled, and every concept frame that shows a transfer option labelled as
 * under development.
 */
describe("handoff media labels", () => {
  const handoffLoop = workflowStepLoops[5];

  it("labels the HANDOFF concept footage as one option with the mechanism under development, next to the frame", () => {
    expect(handoffLoop).not.toBeNull();
    expect(handoffLoop?.still.caption).toBe("Concept visualization. Transfer mechanism under development.");
    const alt = handoffLoop?.still.alt.toLowerCase() ?? "";
    expect(alt).toContain("one option");
    expect(alt).toContain("under development");
    expect(alt).toContain("collected load");
  });

  it("the hero film, which contains the same handoff segment, says so in its alt text", () => {
    expect(heroMasterFrame.alt.toLowerCase()).toContain("transfer-mechanism option that is under development");
  });

  it("no alt or caption uses a container word or names a settled mechanism", () => {
    const corpus = [heroMasterFrame.alt]
      .concat(workflowStepLoops.flatMap((l) => (l ? [l.still.alt, l.still.caption ?? ""] : [])))
      .concat(workflowStepStills.flatMap((s) => (s ? [s.alt, s.caption ?? ""] : [])))
      .join(" ")
      .toLowerCase();
    for (const banned of ["basket", "hopper", "handoff unit", "chute", "conveyor", "universal handoff", "ball-handling station", "modular", "deployed system footage"]) {
      expect(corpus).not.toContain(banned);
    }
    // The chosen side of the arm is a design decision not made; the footage shows a robot-mounted arm.
    expect(corpus).not.toContain("station-side arm");
  });
});

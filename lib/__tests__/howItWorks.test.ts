import { describe, expect, it } from "vitest";

import { OPERATING_LOOP } from "../expansionStages";
import {
  BUILD_OR_USE_NOTE,
  DESIGN_STATUS_NOTE,
  IMPROVEMENT_LOOP,
  IMPROVEMENT_NOTE,
  LOOP_STEPS,
  PARTICIPANTS,
} from "../howItWorks";

describe("operating loop", () => {
  it("keeps the five approved steps in approved order", () => {
    expect(LOOP_STEPS.map((s) => s.name)).toEqual(["SENSE", "DECIDE", "COORDINATE", "EXECUTE", "CONFIRM"]);
  });

  it("matches the roadmap chapter's transferable loop exactly", () => {
    expect(LOOP_STEPS.map((s) => s.name)).toEqual(OPERATING_LOOP);
  });

  it("names the Site Brain as the decider, a person as the approver, robots as executors, and a person for exceptions", () => {
    expect(LOOP_STEPS[1].body).toContain("Site Brain");
    expect(LOOP_STEPS[1].body).toContain("approved, changed, or rejected by a person");
    expect(LOOP_STEPS[3].body.toLowerCase()).toContain("robots");
    expect(LOOP_STEPS[4].body.toLowerCase()).toContain("goes to a person");
  });
});

describe("participants and build-or-use", () => {
  it("covers the manager, robots and sensors, and existing equipment", () => {
    expect(PARTICIPANTS.map((p) => p.name)).toEqual([
      "Facility manager and staff",
      "Robots and sensors",
      "Existing equipment",
    ]);
  });

  it("never implies every device is NXTektal's or every third-party device is compatible", () => {
    expect(BUILD_OR_USE_NOTE).toContain("third-party");
    expect(BUILD_OR_USE_NOTE.toLowerCase()).toContain("not every piece is ours");
    expect(BUILD_OR_USE_NOTE.toLowerCase()).toContain("no third-party device is assumed compatible");
    expect(PARTICIPANTS[2].role.toLowerCase()).toContain("site by site");
  });

  it("states the chapter's development status inside the module", () => {
    expect(DESIGN_STATUS_NOTE).toContain("Range Operations Simulator");
    expect(DESIGN_STATUS_NOTE.toLowerCase()).toContain("not at a facility");
  });
});

describe("product-improvement loop", () => {
  it("keeps the five steps in order and separate from the operating loop", () => {
    expect(IMPROVEMENT_LOOP.map((s) => s.name)).toEqual(["RECORD", "ANALYZE", "IMPROVE", "TEST", "DELIVER"]);
    expect(IMPROVEMENT_LOOP.map((s) => s.name)).not.toEqual(LOOP_STEPS.map((s) => s.name));
  });

  it("records failures and interventions, and is framed as a method rather than self-learning", () => {
    expect(IMPROVEMENT_LOOP[0].body.toLowerCase()).toContain("manual interventions");
    expect(IMPROVEMENT_NOTE.toLowerCase()).toContain("not a self-learning system");
    expect(IMPROVEMENT_NOTE.toLowerCase()).toContain("foundation model");
  });
});

describe("truthfulness guard", () => {
  it("introduces no deployment, performance, approval-threshold, hopper, or interchangeable-hardware claim", () => {
    const corpus = LOOP_STEPS.concat(IMPROVEMENT_LOOP)
      .flatMap((s) => [s.name, s.body])
      .concat(PARTICIPANTS.flatMap((p) => [p.name, p.role, p.steps]), DESIGN_STATUS_NOTE, BUILD_OR_USE_NOTE, IMPROVEMENT_NOTE)
      .join(" ")
      .toLowerCase();
    for (const banned of ["deployed at", "proven", "validated", "modular", "fully autonomous", "guaranteed", "intelligence layer", "execution layer", "every deployment gets", "approval threshold", "hopper", "learns on its own"]) {
      expect(corpus).not.toContain(banned);
    }
  });
});

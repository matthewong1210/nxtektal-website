import { describe, expect, it } from "vitest";

import { OPERATING_LOOP } from "../expansionStages";
import { DESIGN_STATUS_NOTE, LOOP_STEPS, PARTICIPANTS } from "../howItWorks";

describe("operating loop", () => {
  it("keeps the five approved steps in approved order", () => {
    expect(LOOP_STEPS.map((s) => s.name)).toEqual(["SENSE", "PLAN", "COORDINATE", "EXECUTE", "VERIFY"]);
  });

  it("matches the roadmap chapter's transferable loop exactly", () => {
    expect(LOOP_STEPS.map((s) => s.name)).toEqual(OPERATING_LOOP);
  });

  it("names the Site Brain as the planner, a person as the approver, and robots as executors", () => {
    expect(LOOP_STEPS[1].body).toContain("Site Brain");
    expect(LOOP_STEPS[1].body).toContain("approved, changed, or rejected by a person");
    expect(LOOP_STEPS[3].body.toLowerCase()).toContain("robots");
  });
});

describe("participants", () => {
  it("covers the manager, NXTektal robots, and existing equipment", () => {
    expect(PARTICIPANTS.map((p) => p.name)).toEqual([
      "Facility manager and staff",
      "NXTektal robots",
      "Sensors and existing equipment",
    ]);
  });

  it("keeps compatibility a site-by-site assessment and robots contributing to Sense", () => {
    expect(PARTICIPANTS[2].role.toLowerCase()).toContain("site by site");
    expect(PARTICIPANTS[1].steps).toBe("Sense · Execute");
  });

  it("states the chapter's development status inside the module", () => {
    expect(DESIGN_STATUS_NOTE).toContain("Range Operations Simulator");
    expect(DESIGN_STATUS_NOTE.toLowerCase()).toContain("not at a facility");
  });
});

describe("truthfulness guard", () => {
  it("introduces no deployment, performance, approval-threshold, or interchangeable-hardware claim", () => {
    const corpus = LOOP_STEPS.flatMap((s) => [s.name, s.body])
      .concat(PARTICIPANTS.flatMap((p) => [p.name, p.role, p.steps]), DESIGN_STATUS_NOTE)
      .join(" ")
      .toLowerCase();
    for (const banned of ["deployed", "proven", "validated", "modular", "fully autonomous", "guaranteed", "intelligence layer", "execution layer", "every deployment", "approval threshold"]) {
      expect(corpus).not.toContain(banned);
    }
  });
});

import { describe, expect, it } from "vitest";

import {
  COURSE_INTEL_FACILITY_VALUE,
  COURSE_INTEL_FLOW,
  COURSE_INTEL_FUTURE_FLOW,
  COURSE_INTEL_LOOP,
  COURSE_INTEL_PLAYER_VALUE,
  COURSE_INTEL_QUALIFICATION,
  COURSE_INTEL_STAGES,
} from "../courseIntelligence";

describe("approved stages", () => {
  it("keeps the three stages in platform order with truthful statuses", () => {
    expect(COURSE_INTEL_STAGES.map((s) => s.label)).toEqual([
      "SCAN & COMMISSION",
      "RETROFIT EXISTING CARTS",
      "LOCALIZED COURSE CARE",
    ]);
    expect(COURSE_INTEL_STAGES.map((s) => s.status)).toEqual([
      "PLATFORM DIRECTION",
      "PLATFORM DIRECTION",
      "FUTURE MODULE",
    ]);
  });

  it("keeps course care future, safety-gated, and human-confirmed", () => {
    const stage3 = COURSE_INTEL_STAGES[2];
    expect(stage3.body.toLowerCase()).toContain("future");
    expect(stage3.body.toLowerCase()).toContain("human-confirmed");
    expect(stage3.body.toLowerCase()).toContain("safety-gated");
  });
});

describe("platform sequence and flow", () => {
  it("keeps the approved MAP→…→REPAIR sequence", () => {
    expect([...COURSE_INTEL_LOOP]).toEqual([
      "MAP",
      "LOCALIZE",
      "OBSERVE",
      "PREDICT",
      "GUIDE",
      "LEARN",
      "REPAIR",
    ]);
  });

  it("keeps the cart human-driven and the landing output probabilistic", () => {
    const corpus = COURSE_INTEL_FLOW.flatMap((n) => [n.name, n.note]).join(" ").toLowerCase();
    expect(corpus).toContain("human-driven");
    expect(corpus).toContain("vendor-neutral");
    expect(corpus).toContain("probability region");
    expect(corpus).toContain("structured map data");
  });

  it("keeps the future branch human-confirmed and stationary", () => {
    const corpus = COURSE_INTEL_FUTURE_FLOW.flatMap((n) => [n.name, n.note]).join(" ").toLowerCase();
    expect(corpus).toContain("human-confirmed");
    expect(corpus).toContain("stationary");
  });
});

describe("claims discipline", () => {
  it("never uses deployment, accuracy, or compatibility overclaims", () => {
    const corpus = [
      ...COURSE_INTEL_STAGES.flatMap((s) => [s.label, s.title, s.body, s.status]),
      ...COURSE_INTEL_FLOW.flatMap((n) => [n.name, n.note]),
      ...COURSE_INTEL_FUTURE_FLOW.flatMap((n) => [n.name, n.note]),
      // The qualification is asserted separately: its only "deployed" is the
      // negation "not …a deployed cart integration".
      ...COURSE_INTEL_PLAYER_VALUE,
      ...COURSE_INTEL_FACILITY_VALUE,
    ]
      .join(" ")
      .toLowerCase();
    for (const banned of [
      "deployed",
      "already installed",
      "production-ready",
      "fully autonomous",
      "centimeter",
      "every launch monitor",
      "every golf cart",
      "every ball",
      "perfectly",
      "eliminates",
      "autonomously drives",
      "customer",
      "guaranteed",
    ]) {
      expect(corpus, `banned claim: ${banned}`).not.toContain(banned);
    }
  });

  it("ships the illustrative qualification", () => {
    expect(COURSE_INTEL_QUALIFICATION).toContain("Illustrative platform direction");
    expect(COURSE_INTEL_QUALIFICATION).toContain("not live facility data");
  });
});

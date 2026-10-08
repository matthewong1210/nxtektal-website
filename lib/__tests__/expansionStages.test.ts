import { describe, expect, it } from "vitest";

import {
  BEYOND_ENVIRONMENTS,
  DEFAULT_STAGE,
  EXPANSION_STAGES,
  SITE_BRAIN_CORE,
  OPERATING_LOOP,
  clampStage,
} from "../expansionStages";

describe("expansion stages", () => {
  it("has exactly three stages in approved order", () => {
    expect(EXPANSION_STAGES).toHaveLength(3);
    expect(EXPANSION_STAGES.map((s) => s.label)).toEqual([
      "FIRST WORKFLOW",
      "NEXT JOBS ACROSS GOLF",
      "FACILITY-WIDE COORDINATION",
    ]);
  });

  it("defaults to the first workflow and clamps invalid stages back to it", () => {
    expect(DEFAULT_STAGE).toBe(1);
    expect(clampStage(1)).toBe(1);
    expect(clampStage(2)).toBe(2);
    expect(clampStage(3)).toBe(3);
    expect(clampStage(0)).toBe(1);
    expect(clampStage(99)).toBe(1);
    expect(clampStage(Number.NaN)).toBe(1);
  });

  it("assigns the approved status to each stage", () => {
    expect(EXPANSION_STAGES.map((s) => s.status)).toEqual([
      "IN DEVELOPMENT",
      "DIRECTION · NOT STARTED",
      "LATER DIRECTION",
    ]);
  });

  it("only the first stage is in development — later stages are direction, never product", () => {
    expect(EXPANSION_STAGES.filter((s) => s.status === "IN DEVELOPMENT").map((s) => s.number)).toEqual([1]);
  });

  it("stage 1 is Range-Ball Operations with the full loop, as exact entries", () => {
    const s1 = EXPANSION_STAGES[0];
    expect(s1.title).toBe("Range-Ball Operations");
    expect(s1.capabilities).toEqual([
      "Ball availability monitoring",
      "Demand-responsive dispatch",
      "Collection by the NXTektal collection robot",
      "Return",
      "Automated handoff into the existing washer",
      "Wash-and-dispense coordination",
      "Workflow verification",
    ]);
  });

  it("stage 2 covers drone, turf/soil, bunker, mowing, and inspection", () => {
    const caps = EXPANSION_STAGES[1].capabilities.join(" ").toLowerCase();
    for (const key of ["drone", "turf and soil", "bunker", "mowing", "equipment inspection"]) {
      expect(caps).toContain(key);
    }
  });

  it("stage 3 covers shared state, multi-robot coordination, logistics, and reporting", () => {
    const caps = EXPANSION_STAGES[2].capabilities.join(" ").toLowerCase();
    for (const key of ["facility-wide shared state", "multi-robot", "logistics", "reporting"]) {
      expect(caps).toContain(key);
    }
  });

  it("the Site Brain core lists the five approved functions", () => {
    expect(SITE_BRAIN_CORE.name).toBe("NXTektal Site Brain");
    expect(SITE_BRAIN_CORE.functions).toEqual([
      "Site State",
      "Planning",
      "Coordination",
      "Verification",
      "Field Feedback",
    ]);
  });
});

describe("beyond golf", () => {
  it("contains only the five approved environment categories", () => {
    expect(BEYOND_ENVIRONMENTS).toEqual([
      "Campuses",
      "Parks",
      "Sports Facilities",
      "Resorts",
      "Commercial Landscapes",
    ]);
  });

  it("keeps the operating loop in approved order", () => {
    expect(OPERATING_LOOP).toEqual([
      "SENSE",
      "PLAN",
      "COORDINATE",
      "EXECUTE",
      "VERIFY",
    ]);
  });
});

describe("truthfulness guard", () => {
  it("introduces no globe, planet, satellite, or deployment claim", () => {
    const corpus = EXPANSION_STAGES.flatMap((s) => [s.label, s.title, s.status, ...s.capabilities])
      .concat(BEYOND_ENVIRONMENTS, OPERATING_LOOP, SITE_BRAIN_CORE.functions, SITE_BRAIN_CORE.name)
      .join(" ")
      .toLowerCase();
    for (const banned of ["globe", "planet", "satellite", "earth", "deployed", "customer", "validated", "worldwide", "global", "operating layer", "modular"]) {
      expect(corpus).not.toContain(banned);
    }
  });
});

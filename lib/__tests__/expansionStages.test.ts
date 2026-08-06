import { describe, expect, it } from "vitest";

import {
  BEYOND_ENVIRONMENTS,
  DEFAULT_STAGE,
  EXPANSION_STAGES,
  OPERATING_LAYER,
  OPERATING_LOOP,
  clampStage,
} from "../expansionStages";

describe("expansion stages", () => {
  it("has exactly three stages in approved order", () => {
    expect(EXPANSION_STAGES).toHaveLength(3);
    expect(EXPANSION_STAGES.map((s) => s.label)).toEqual([
      "STARTING POINT",
      "EXPANDING ACROSS GOLF",
      "FACILITY-WIDE AUTONOMY",
    ]);
  });

  it("defaults to Starting Point and clamps invalid stages back to it", () => {
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
      "PLATFORM DIRECTION",
      "LONG-TERM DIRECTION",
    ]);
  });

  it("stage 1 is Range Ball Operations with the full closed loop", () => {
    const s1 = EXPANSION_STAGES[0];
    expect(s1.title).toBe("Range Ball Operations");
    for (const cap of ["Collection", "Return", "Automated handoff", "Workflow verification"]) {
      expect(s1.capabilities).toContain(cap);
    }
  });

  it("stage 2 covers drone, turf/soil, bunker, mowing, and inspection", () => {
    const caps = EXPANSION_STAGES[1].capabilities.join(" ").toLowerCase();
    for (const key of ["drone", "turf and soil", "bunker", "mowing", "equipment inspection"]) {
      expect(caps).toContain(key);
    }
  });

  it("stage 3 covers shared state, multi-robot coordination, logistics, and reporting", () => {
    const caps = EXPANSION_STAGES[2].capabilities.join(" ").toLowerCase();
    for (const key of ["shared facility state", "multi-robot", "logistics", "reporting"]) {
      expect(caps).toContain(key);
    }
  });

  it("the Operating Layer core lists the five approved functions", () => {
    expect(OPERATING_LAYER.functions).toEqual([
      "Shared State",
      "Prioritization",
      "Dispatch",
      "Verification",
      "Learning",
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
      "PRIORITIZE",
      "DISPATCH",
      "EXECUTE",
      "VERIFY",
      "IMPROVE",
    ]);
  });
});

describe("truthfulness guard", () => {
  it("introduces no globe, planet, satellite, or deployment claim", () => {
    const corpus = EXPANSION_STAGES.flatMap((s) => [s.label, s.title, s.status, ...s.capabilities])
      .concat(BEYOND_ENVIRONMENTS, OPERATING_LOOP, OPERATING_LAYER.functions, OPERATING_LAYER.name)
      .join(" ")
      .toLowerCase();
    for (const banned of ["globe", "planet", "satellite", "earth", "deployed", "customer", "validated", "worldwide", "global"]) {
      expect(corpus).not.toContain(banned);
    }
  });
});

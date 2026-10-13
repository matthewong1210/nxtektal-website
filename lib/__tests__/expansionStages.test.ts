import { describe, expect, it } from "vitest";

import {
  BEYOND_ENVIRONMENTS,
  CARRIES_OVER,
  CARRY_NOTE,
  DEFAULT_STAGE,
  EXPANSION_STAGES,
  JOB_SPECIFIC,
  OPERATING_LOOP,
  PROOF_METRICS,
  PROOF_NOTE,
  RECURRING_JOBS,
  REUSE_BY_JOB,
  SITE_BRAIN_CORE,
  clampStage,
  jobStatusForStage,
} from "../expansionStages";

describe("expansion stages", () => {
  it("has exactly three stages in approved order", () => {
    expect(EXPANSION_STAGES).toHaveLength(3);
    expect(EXPANSION_STAGES.map((s) => s.label)).toEqual([
      "FIRST JOB",
      "NEXT TO VALIDATE",
      "LATER DIRECTION",
    ]);
  });

  it("defaults to the first job and clamps invalid stages back to it", () => {
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
      "NEXT TO VALIDATE · NOT STARTED",
      "LATER DIRECTION",
    ]);
  });

  it("only the first job is in development — later stages are validation steps or direction, never product", () => {
    expect(EXPANSION_STAGES.filter((s) => s.status === "IN DEVELOPMENT").map((s) => s.number)).toEqual([1]);
  });

  it("stage 1 is the range-ball job with the handoff mechanism marked in development, as exact entries", () => {
    const s1 = EXPANSION_STAGES[0];
    expect(s1.title).toBe("Range-Ball Collection and Handoff");
    expect(s1.capabilities).toEqual([
      "Ball availability monitoring",
      "Demand-responsive scheduling",
      "Collection by the NXTektal collection robot",
      "Return to the handoff point",
      "Transfer into the existing washer intake (mechanism in development)",
      "Transfer confirmation before collection resumes",
      "Exception handling",
    ]);
  });

  it("stage 2 is mowing and grounds work on golf facilities, not started", () => {
    const caps = EXPANSION_STAGES[1].capabilities.join(" ").toLowerCase();
    for (const key of ["mowing", "bunker", "turf", "inspection", "spraying"]) {
      expect(caps).toContain(key);
    }
    expect(EXPANSION_STAGES[1].title.toLowerCase()).toContain("golf facilities");
  });

  it("stage 3 is the validated second job taken to similar outdoor facilities, with carry-over named", () => {
    expect(EXPANSION_STAGES[2].title).toBe("Similar Outdoor Facilities");
    const caps = EXPANSION_STAGES[2].capabilities.join(" ").toLowerCase();
    for (const key of ["similar outdoor facility", "carried-over", "site-specific", "multi-robot", "reporting"]) {
      expect(caps).toContain(key);
    }
  });

  it("stage 2 names mowing first, as the second job we intend to validate", () => {
    expect(EXPANSION_STAGES[1].capabilities[0].toLowerCase()).toMatch(/^mowing/);
  });
});

describe("recurring jobs list", () => {
  it("every job's status pill is its stage's own status, so The Work and How It Scales cannot disagree", () => {
    const pill = { 1: "FIRST JOB · IN DEVELOPMENT", 2: "NEXT TO VALIDATE · NOT STARTED", 3: "LATER DIRECTION" } as const;
    for (const j of RECURRING_JOBS) expect(j.status).toBe(pill[j.stage]);
    expect(EXPANSION_STAGES.map((s) => s.status)).toEqual(["IN DEVELOPMENT", pill[2], pill[3]]);
    expect([1, 2, 3].map((s) => jobStatusForStage(s as 1 | 2 | 3))).toEqual([pill[1], pill[2], pill[3]]);
  });

  it("only the range-ball job is the first job; stage-2 jobs are listed mowing first and none is started", () => {
    expect(RECURRING_JOBS.filter((j) => j.stage === 1).map((j) => j.name)).toEqual(["Range-ball collection and handoff"]);
    const stage2 = RECURRING_JOBS.filter((j) => j.stage === 2);
    expect(stage2[0].name).toBe("Mowing");
    for (const j of stage2) expect(j.status).toContain("NOT STARTED");
  });

  it("every stage-2 job named in The Work also appears in the stage-2 capabilities", () => {
    const caps = EXPANSION_STAGES[1].capabilities.join(" ").toLowerCase();
    for (const key of ["mowing", "bunker care", "course inspection", "spraying and irrigation checks"]) {
      expect(caps).toContain(key);
    }
  });

  it("the Site Brain core lists the five approved functions", () => {
    expect(SITE_BRAIN_CORE.name).toBe("NXTektal Site Brain");
    expect(SITE_BRAIN_CORE.functions).toEqual(["Sense", "Decide", "Coordinate", "Confirm", "Record"]);
  });
});

describe("what carries over", () => {
  it("names reusable parts as design intent and keeps the collection mechanism job-specific", () => {
    expect(CARRIES_OVER.join(" ").toLowerCase()).toContain("task interface");
    expect(JOB_SPECIFIC[0]).toBe("The ball-collection mechanism");
    expect(CARRY_NOTE.toLowerCase()).toContain("design intent");
    expect(CARRY_NOTE.toLowerCase()).toContain("does not mow");
  });
});

describe("per-job reuse hypothesis and proof metrics", () => {
  it("covers mowing, spraying, irrigation, and inspection with both reuse and confirm columns", () => {
    expect(REUSE_BY_JOB.map((r) => r.job)).toEqual(["Mowing", "Spraying", "Irrigation checks", "Inspection and transport"]);
    for (const row of REUSE_BY_JOB) {
      expect(row.reuse.length).toBeGreaterThan(0);
      expect(row.confirm.length).toBeGreaterThan(0);
    }
    expect(REUSE_BY_JOB[1].confirm.join(" ").toLowerCase()).toContain("legally binding");
  });

  it("frames reuse as an opportunity with business metrics still to prove, not a moat", () => {
    expect(PROOF_METRICS).toHaveLength(4);
    expect(PROOF_NOTE.toLowerCase()).toContain("not a moat");
    expect(PROOF_NOTE.toLowerCase()).toContain("targets today, not results");
  });
});

describe("later direction", () => {
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
      "DECIDE",
      "COORDINATE",
      "EXECUTE",
      "CONFIRM",
    ]);
  });
});

describe("truthfulness guard", () => {
  it("introduces no globe, deployment, seamless-fit, or retired-positioning claim", () => {
    const corpus = EXPANSION_STAGES.flatMap((s) => [s.label, s.title, s.status, ...s.capabilities])
      .concat(BEYOND_ENVIRONMENTS, OPERATING_LOOP, SITE_BRAIN_CORE.functions, SITE_BRAIN_CORE.name, CARRIES_OVER, JOB_SPECIFIC, CARRY_NOTE, PROOF_METRICS, PROOF_NOTE, REUSE_BY_JOB.flatMap((r) => [r.job, ...r.reuse, ...r.confirm]), RECURRING_JOBS.flatMap((j) => [j.name, j.body, j.status]))
      .join(" ")
      .toLowerCase();
    for (const banned of ["globe", "planet", "satellite", "earth", "deployed", "customer", "validated capability", "worldwide", "global", "operating layer", "seamless", "hopper", "handoff unit"]) {
      expect(corpus).not.toContain(banned);
    }
  });
});

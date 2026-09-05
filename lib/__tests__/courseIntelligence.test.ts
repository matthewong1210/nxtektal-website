import { describe, expect, it } from "vitest";

import {
  COURSE_INTEL_BRIEFING,
  COURSE_INTEL_BRIEFING_ACTIONS,
  COURSE_INTEL_CONDITION_COVERAGE,
  COURSE_INTEL_COPY,
  COURSE_INTEL_COVERAGE_CALLOUT,
  COURSE_INTEL_FACILITY_VALUE,
  COURSE_INTEL_FLOW,
  COURSE_INTEL_FUTURE_BRANCH_LABEL,
  COURSE_INTEL_FUTURE_FLOW,
  COURSE_INTEL_LOOP,
  COURSE_INTEL_PLAYER_BRANCH_LABEL,
  COURSE_INTEL_PLAYER_FLOW,
  COURSE_INTEL_PLAYER_VALUE,
  COURSE_INTEL_QUALIFICATION,
  COURSE_INTEL_STAGES,
} from "../courseIntelligence";

const flat = (nodes: { name: string; note: string }[]) =>
  nodes.flatMap((n) => [n.name, n.note]).join(" ").toLowerCase();

/** Every COURSE_INTEL_COPY string the section renders. */
const copyCorpus = [
  COURSE_INTEL_COPY.eyebrow,
  COURSE_INTEL_COPY.heading,
  COURSE_INTEL_COPY.tagline,
  ...COURSE_INTEL_COPY.intro,
  COURSE_INTEL_COPY.support,
  COURSE_INTEL_COPY.briefingTitle,
  COURSE_INTEL_COPY.briefingTag,
  COURSE_INTEL_COPY.briefingCaption,
  COURSE_INTEL_COPY.facilityHeading,
  COURSE_INTEL_COPY.playerHeading,
  COURSE_INTEL_COPY.thesis,
]
  .join(" ")
  .toLowerCase();

describe("grounds-operations spine", () => {
  it("keeps the three stages in platform order, all PLATFORM DIRECTION", () => {
    expect(COURSE_INTEL_STAGES.map((s) => s.label)).toEqual([
      "MAP & COMMISSION",
      "INSPECT CONTINUOUSLY",
      "PRIORITIZE & VERIFY",
    ]);
    expect(COURSE_INTEL_STAGES.every((s) => s.status === "PLATFORM DIRECTION")).toBe(true);
  });

  it("keeps the approved grounds operating sequence", () => {
    expect([...COURSE_INTEL_LOOP]).toEqual([
      "MAP",
      "LOCALIZE",
      "INSPECT",
      "DETECT",
      "DEDUPLICATE",
      "PRIORITIZE",
      "CONFIRM",
      "VERIFY",
    ]);
  });

  it("carries the grounds-intelligence vocabulary end to end", () => {
    const corpus = [
      flat(COURSE_INTEL_FLOW),
      COURSE_INTEL_STAGES.map((s) => `${s.title} ${s.body}`).join(" ").toLowerCase(),
      COURSE_INTEL_FACILITY_VALUE.join(" ").toLowerCase(),
    ].join(" ");
    for (const key of [
      "condition",
      "coverage",
      "deduplicat",
      "maintenance briefing",
      "supervisor",
      "human-reviewed",
      "verification",
      "human-driven",
      "structured map data",
      "versioned",
    ]) {
      expect(corpus, `missing: ${key}`).toContain(key);
    }
  });

  it("keeps condition and coverage distinct, and never equates no-observation with no-issue", () => {
    expect(COURSE_INTEL_CONDITION_COVERAGE.map((c) => c.name)).toEqual([
      "Course condition",
      "Inspection coverage",
    ]);
    expect(COURSE_INTEL_COVERAGE_CALLOUT).toContain("No observation is not the same as no issue");
    expect(COURSE_INTEL_COVERAGE_CALLOUT.toLowerCase()).toContain("coverage remains incomplete");
  });
});

describe("branch containment", () => {
  it("keeps launch-monitor vocabulary only in the optional player module", () => {
    const outside = [
      copyCorpus,
      flat(COURSE_INTEL_FLOW),
      flat(COURSE_INTEL_FUTURE_FLOW),
      COURSE_INTEL_STAGES.map((s) => `${s.label} ${s.title} ${s.body}`).join(" ").toLowerCase(),
      COURSE_INTEL_FACILITY_VALUE.join(" ").toLowerCase(),
      COURSE_INTEL_BRIEFING.flatMap((r) => [r.place, r.finding, r.evidence, r.action]).join(" ").toLowerCase(),
    ].join(" ");
    for (const key of ["launch", "landing region", "club"]) {
      expect(outside, `player vocabulary leaked: ${key}`).not.toContain(key);
    }
    expect(COURSE_INTEL_PLAYER_BRANCH_LABEL).toContain("OPTIONAL");
    const player = flat(COURSE_INTEL_PLAYER_FLOW);
    expect(player).toContain("launch-monitor");
    expect(player).toContain("vendor-neutral");
    expect(player).toContain("probability region");
  });

  it("keeps actuator vocabulary only in the future safety-gated branch", () => {
    const outside = [
      copyCorpus,
      flat(COURSE_INTEL_FLOW),
      flat(COURSE_INTEL_PLAYER_FLOW),
      COURSE_INTEL_STAGES.map((s) => `${s.label} ${s.title} ${s.body}`).join(" ").toLowerCase(),
      COURSE_INTEL_FACILITY_VALUE.join(" ").toLowerCase(),
      COURSE_INTEL_BRIEFING.flatMap((r) => [r.place, r.finding, r.evidence, r.action]).join(" ").toLowerCase(),
    ].join(" ");
    for (const key of ["sand", "tamp", "auger", "nozzle"]) {
      expect(outside, `actuator vocabulary leaked: ${key}`).not.toContain(key);
    }
    expect(COURSE_INTEL_FUTURE_BRANCH_LABEL).toContain("FUTURE");
    expect(COURSE_INTEL_FUTURE_BRANCH_LABEL).toContain("SAFETY-GATED");
    const future = flat(COURSE_INTEL_FUTURE_FLOW);
    expect(future).toContain("human-confirmed");
    expect(future).toContain("stationary");
  });
});

describe("illustrative briefing", () => {
  it("keeps the supervisor in control and coverage gaps inconclusive", () => {
    expect([...COURSE_INTEL_BRIEFING_ACTIONS]).toEqual([
      "CONFIRM",
      "DEFER",
      "MONITOR",
      "FALSE POSITIVE",
    ]);
    const gap = COURSE_INTEL_BRIEFING[COURSE_INTEL_BRIEFING.length - 1];
    expect(gap.place.toLowerCase()).toContain("coverage gap");
    expect(gap.evidence.toLowerCase()).toContain("no conclusion");
  });
});

describe("claims discipline", () => {
  it("keeps the main public copy human-driven, supervisor-controlled, and platform-direction qualified", () => {
    for (const key of ["human-driven", "supervisor", "platform direction", "can ", "optional module"]) {
      expect(copyCorpus, `missing qualifier: ${key}`).toContain(key);
    }
    expect(COURSE_INTEL_COPY.briefingCaption).toContain("not live facility data");
    expect(COURSE_INTEL_COPY.briefingCaption.toLowerCase()).toContain("human decision");
  });

  it("never uses deployment, accuracy, or compatibility overclaims", () => {
    const corpus = [
      copyCorpus,
      ...COURSE_INTEL_STAGES.flatMap((s) => [s.label, s.title, s.body, s.status]),
      ...COURSE_INTEL_FLOW.flatMap((n) => [n.name, n.note]),
      ...COURSE_INTEL_PLAYER_FLOW.flatMap((n) => [n.name, n.note]),
      ...COURSE_INTEL_FUTURE_FLOW.flatMap((n) => [n.name, n.note]),
      ...COURSE_INTEL_CONDITION_COVERAGE.flatMap((c) => [c.name, c.note]),
      COURSE_INTEL_COVERAGE_CALLOUT,
      ...COURSE_INTEL_FACILITY_VALUE,
      ...COURSE_INTEL_PLAYER_VALUE,
      ...COURSE_INTEL_BRIEFING.flatMap((r) => [r.place, r.finding, r.evidence, r.action]),
      // The qualification is asserted separately: its only "deployed" is the
      // negation "not …a deployed cart integration".
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
      "every divot",
      "perfectly",
      "eliminates",
      "autonomously drives",
      "customer",
      "guaranteed",
      "no issue found",
    ]) {
      expect(corpus, `banned claim: ${banned}`).not.toContain(banned);
    }
  });

  it("ships the illustrative qualification", () => {
    expect(COURSE_INTEL_QUALIFICATION).toContain("Illustrative platform direction");
    expect(COURSE_INTEL_QUALIFICATION).toContain("not live facility data");
  });
});

import { describe, expect, it } from "vitest";

import {
  COMPARE_DEFAULT,
  CURRENT_WORKFLOW,
  NXTEKTAL_WORKFLOW,
  WHAT_NXTEKTAL_ADDS,
  WHAT_STAYS,
  clampComparePosition,
  representsExistingEquipment,
} from "../equipmentCompare";

describe("compare position", () => {
  it("defaults to an even 50% split", () => {
    expect(COMPARE_DEFAULT).toBe(50);
  });

  it("clamps to the 0-100 range", () => {
    expect(clampComparePosition(-20)).toBe(0);
    expect(clampComparePosition(0)).toBe(0);
    expect(clampComparePosition(37)).toBe(37);
    expect(clampComparePosition(100)).toBe(100);
    expect(clampComparePosition(340)).toBe(100);
  });

  it("recenters non-finite input instead of propagating NaN", () => {
    expect(clampComparePosition(Number.NaN)).toBe(COMPARE_DEFAULT);
    expect(clampComparePosition(Infinity)).toBe(100);
  });
});

describe("workflow states", () => {
  it("uses the approved state labels, with the NXTektal state marked in development", () => {
    expect(CURRENT_WORKFLOW.label).toBe("TYPICAL CURRENT WORKFLOW");
    expect(NXTEKTAL_WORKFLOW.label).toBe("WITH NXTEKTAL · IN DEVELOPMENT");
  });

  it("shows the approved steps per state, in order", () => {
    expect(CURRENT_WORKFLOW.nodes.map((n) => n.label)).toEqual([
      "Collection equipment",
      "Manual unloading",
      "Existing washer",
      "Manual transfer",
      "Existing dispenser",
    ]);
    expect(NXTEKTAL_WORKFLOW.nodes.map((n) => n.label)).toEqual([
      "Site Brain: Sense & Decide",
      "Collection Robot",
      "Handoff & Transfer",
      "Confirm & Report",
      "Existing washer",
      "Manual transfer (unchanged)",
      "Existing dispenser",
    ]);
  });

  it("keeps the existing washer and dispenser visible in BOTH states", () => {
    expect(representsExistingEquipment(CURRENT_WORKFLOW)).toBe(true);
    expect(representsExistingEquipment(NXTEKTAL_WORKFLOW)).toBe(true);
  });

  it("labels every manual step as manual (never color-only)", () => {
    const manual = CURRENT_WORKFLOW.nodes.filter((n) => n.kind === "manual");
    expect(manual.map((n) => n.label)).toEqual(["Manual unloading", "Manual transfer"]);
  });

  it("keeps the washer-to-dispenser step manual and unchanged in the NXTektal state — wash and dispense are outside scope", () => {
    const manual = NXTEKTAL_WORKFLOW.nodes.filter((n) => n.kind === "manual");
    expect(manual.map((n) => n.label)).toEqual(["Manual transfer (unchanged)"]);
    expect(NXTEKTAL_WORKFLOW.conditions.join(" ").toLowerCase()).toContain("outside current scope");
  });

  it("never claims the manual workflow disappears entirely, and requires transfer confirmation", () => {
    expect(NXTEKTAL_WORKFLOW.conditions).toContain("Designed to replace manual unloading at the handoff point");
    expect(NXTEKTAL_WORKFLOW.conditions).toContain("Transfer confirmation before collection resumes");
    const all = NXTEKTAL_WORKFLOW.conditions.join(" ").toLowerCase();
    expect(all).not.toMatch(/no manual|fully autonomous|eliminates/);
  });
});

describe("what stays / what NXTektal adds", () => {
  it("keeps the approved lists and marks the transfer mechanism as in development", () => {
    expect(WHAT_STAYS).toHaveLength(4);
    expect(WHAT_STAYS[0]).toBe("Existing washer and dispenser");
    expect(WHAT_STAYS[1].toLowerCase()).toContain("compatibility checked per site");
    expect(WHAT_NXTEKTAL_ADDS).toHaveLength(5);
    expect(WHAT_NXTEKTAL_ADDS[2]).toContain("mechanism in development");
  });
});

describe("truthfulness guard", () => {
  it("introduces no unsupported compatibility copy and names no settled transfer mechanism", () => {
    const corpus = [
      CURRENT_WORKFLOW,
      NXTEKTAL_WORKFLOW,
    ]
      .flatMap((s) => [s.label, ...s.nodes.map((n) => n.label), ...s.conditions])
      .concat(WHAT_STAYS, WHAT_NXTEKTAL_ADDS)
      .join(" ")
      .toLowerCase();
    for (const banned of ["universal", "guaranteed", "every washer", "all equipment", "no modification", "deployed", "customer", "modular", "hopper", "handoff unit", "chute", "conveyor", "robotic arm", "basket", "compatible receiving"]) {
      expect(corpus).not.toContain(banned);
    }
  });
});

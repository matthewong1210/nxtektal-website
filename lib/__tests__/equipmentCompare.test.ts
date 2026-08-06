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
  it("uses the approved state labels", () => {
    expect(CURRENT_WORKFLOW.label).toBe("TYPICAL CURRENT WORKFLOW");
    expect(NXTEKTAL_WORKFLOW.label).toBe("WITH NXTEKTAL");
  });

  it("shows the approved five steps per state, in order", () => {
    expect(CURRENT_WORKFLOW.nodes.map((n) => n.label)).toEqual([
      "Collection equipment",
      "Manual unloading",
      "Existing washer",
      "Manual transfer",
      "Existing dispenser",
    ]);
    expect(NXTEKTAL_WORKFLOW.nodes.map((n) => n.label)).toEqual([
      "Monitor & Prioritize",
      "Autonomous Collection",
      "Modular Handoff",
      "Existing Washer & Dispenser",
      "Verify & Report",
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

  it("never claims the manual workflow disappears entirely", () => {
    expect(NXTEKTAL_WORKFLOW.conditions).toContain("Reduced routine manual transfer");
    const all = NXTEKTAL_WORKFLOW.conditions.join(" ").toLowerCase();
    expect(all).not.toMatch(/no manual|fully autonomous|eliminates/);
  });
});

describe("what stays / what NXTektal adds", () => {
  it("keeps the approved lists", () => {
    expect(WHAT_STAYS).toHaveLength(4);
    expect(WHAT_STAYS[0]).toBe("Existing washer and dispenser");
    expect(WHAT_NXTEKTAL_ADDS).toHaveLength(5);
  });
});

describe("truthfulness guard", () => {
  it("introduces no unsupported compatibility copy", () => {
    const corpus = [
      CURRENT_WORKFLOW,
      NXTEKTAL_WORKFLOW,
    ]
      .flatMap((s) => [s.label, ...s.nodes.map((n) => n.label), ...s.conditions])
      .concat(WHAT_STAYS, WHAT_NXTEKTAL_ADDS)
      .join(" ")
      .toLowerCase();
    for (const banned of ["universal", "guaranteed", "every washer", "all equipment", "no modification", "deployed", "customer"]) {
      expect(corpus).not.toContain(banned);
    }
  });
});

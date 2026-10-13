import { describe, expect, it } from "vitest";

import { BUILD_TRACKS, HANDOFF_REFERENCE, HERO_CAPTION, SCOPE, SYSTEM_COMPONENTS } from "../firstJob";
import { HANDOFF_PANELS, HANDOFF_SCHEMATIC_CAPTION } from "../handoffPanels";

const BANNED = [
  "hopper", "basket", "handoff unit", "chute", "conveyor", "robotic arm", "lift and tilt", "modular",
  "bench", "seamless", "deployed at", "intelligence layer", "execution layer", "operating layer",
  "robotic workforce", "learns on its own", "universal",
];

describe("first-job copy contracts", () => {
  it("the Handoff and Transfer card carries the reference sentence verbatim, with the mechanism under development and compatibility per site", () => {
    const card = SYSTEM_COMPONENTS.find((c) => c.title === "Handoff and Transfer");
    expect(card?.body.startsWith(HANDOFF_REFERENCE)).toBe(true);
    expect(card?.body).toContain("Transfer mechanism under development");
    expect(card?.body).toContain("compatibility confirmed per site");
  });

  it("the Site Brain card defines the software and states its stage; the robot card claims a prototype, not a deployed machine", () => {
    const brain = SYSTEM_COMPONENTS.find((c) => c.title === "Site Brain");
    expect(brain?.body).toContain("scheduling and coordination software");
    expect(brain?.body).toContain("Runs in the Range Operations Simulator today");
    const robot = SYSTEM_COMPONENTS.find((c) => c.title === "Collection Robot");
    expect(robot?.body).toContain("Prototype in development");
  });

  it("keeps the development scope apart from the full-supply vision", () => {
    expect(SCOPE.map((s) => [s.key, s.label])).toEqual([
      ["now", "IN DEVELOPMENT NOW"],
      ["vision", "NOT CLAIMED YET"],
    ]);
    expect(SCOPE[0].items.join(" ")).toContain("the transfer mechanism is under development");
    expect(SCOPE[0].items.join(" ")).toContain("Transfer confirmation");
    expect(SCOPE[0].note).toContain("Not yet run at a facility");
    expect(SCOPE[1].items.join(" ")).toContain("not “supply restored”");
    expect(SCOPE[1].note).toContain("measured only at a pilot");
  });

  it("the progress tracks use one status vocabulary, with the transfer mechanism unselected and confirmation not field-tested", () => {
    expect(BUILD_TRACKS.map((t) => t.name)).toEqual(["Site Brain · Software", "Machines · Hardware", "Field · Pilots"]);
    expect(BUILD_TRACKS[1].items.map((i) => `${i.name} — ${i.status}`)).toEqual([
      "Collection robot — PROTOTYPE IN DEVELOPMENT",
      "Handoff transfer mechanism — IN DEVELOPMENT · NOT SELECTED",
      "Transfer confirmation — REQUIRED · NOT FIELD-TESTED",
      "Robot-to-handoff integration — IN DEVELOPMENT",
    ]);
    expect(BUILD_TRACKS[0].items.map((i) => i.status)).toEqual(["WORKING · SIMULATION ONLY", "WORKING · SIMULATION ONLY", "DESIGNED · NOT CONNECTED", "CONCEPT UI"]);
    expect(BUILD_TRACKS[2].items.map((i) => i.status)).toEqual(["PILOT PREPARATION", "OPEN", "NONE YET"]);
  });

  it("the hero caption labels the background as concept and names the transfer mechanism as under development", () => {
    expect(HERO_CAPTION).toContain("concept visualization, not footage of a deployed system");
    expect(HERO_CAPTION).toContain("transfer mechanism that is under development");
  });

  it("the schematic panels express the workflow relationship without a mechanism", () => {
    expect(HANDOFF_PANELS.map((p) => p.name)).toEqual(["RETURN / DOCK", "TRANSFER", "CONFIRM & RELEASE"]);
    expect(HANDOFF_PANELS.map((p) => p.tag)).toEqual(["WORKFLOW SCHEMATIC", "MECHANISM UNDER DEVELOPMENT", "WORKFLOW REQUIREMENT"]);
    expect(HANDOFF_PANELS[1].alt).toContain("not drawn because it is still under development");
    expect(HANDOFF_PANELS[2].label).toContain("collection resumes");
    expect(HANDOFF_SCHEMATIC_CAPTION).toContain("not drawn because it is still under development");
    expect(HANDOFF_SCHEMATIC_CAPTION).toContain("confirmed on site");
  });

  it("introduces no container word, settled mechanism, validation stage, or retired positioning", () => {
    const corpus = [HANDOFF_REFERENCE, HERO_CAPTION, HANDOFF_SCHEMATIC_CAPTION]
      .concat(SCOPE.flatMap((s) => [s.label, s.status, s.title, s.note, ...s.items]))
      .concat(SYSTEM_COMPONENTS.flatMap((c) => [c.title, c.body]))
      .concat(BUILD_TRACKS.flatMap((t) => [t.name, ...t.items.flatMap((i) => [i.name, i.status])]))
      .concat(HANDOFF_PANELS.flatMap((p) => [p.name, p.label, p.alt, p.tag]))
      .join(" ")
      .toLowerCase();
    for (const banned of BANNED) expect(corpus).not.toContain(banned);
  });
});

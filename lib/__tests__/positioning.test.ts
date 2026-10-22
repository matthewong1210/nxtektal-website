import { describe, expect, it } from "vitest";

import manifest from "../../app/manifest";
import { FIRST_JOB_SENTENCE, POSITIONING_SENTENCE, SITE_DESCRIPTION } from "../positioning";

describe("positioning", () => {
  it("states the approved positioning sentence, work before architecture", () => {
    expect(POSITIONING_SENTENCE).toBe(
      "NXTektal is building robots and the operating system behind them to carry out outdoor work, starting with golf facilities.",
    );
    expect(SITE_DESCRIPTION).toBe(
      "NXTektal is building robots and the operating system behind them to carry out outdoor work, starting with golf facilities. First job: range-ball collection with handoff into the range’s existing washer.",
    );
    expect(FIRST_JOB_SENTENCE.toLowerCase()).toContain("existing washer");
  });

  it("the web-app manifest carries the same positioning as the metadata and JSON-LD", () => {
    expect(manifest().description).toBe(POSITIONING_SENTENCE);
  });

  it("never reintroduces a retired positioning phrase on any shared surface", () => {
    const corpus = [POSITIONING_SENTENCE, FIRST_JOB_SENTENCE, SITE_DESCRIPTION, manifest().description ?? "", manifest().name ?? ""]
      .join(" ")
      .toLowerCase();
    for (const banned of ["robotic workforce", "site brain and", "intelligence layer", "execution layer", "operating layer", "hopper", "modular"]) {
      expect(corpus).not.toContain(banned);
    }
  });
});

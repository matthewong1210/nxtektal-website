import { describe, expect, it } from "vitest";

import { CE82A, CONTACT, FEATURES, FEATURES_NOTE, GALLERY_HEADING, HERO_STATS, IMAGES, SPEC_GROUPS, SPEC_NOTE } from "../products/ce82a";

const rows = SPEC_GROUPS.flatMap((g) => g.rows);
const row = (name: string) => rows.find((r) => r.name === name)!;
const corpus = [
  CE82A.name, CE82A.nativeName, CE82A.category, CE82A.summary, CE82A.relationship, FEATURES_NOTE, GALLERY_HEADING, SPEC_NOTE,
  CONTACT.body, CONTACT.heading, CONTACT.cta, CONTACT.secondaryLabel,
  ...HERO_STATS.map((s) => s.label),
  ...FEATURES.flatMap((f) => [f.title, f.body]),
  ...IMAGES.flatMap((i) => [i.alt, i.caption, i.label]),
  ...SPEC_GROUPS.flatMap((g) => [g.title, ...g.rows.flatMap((r) => [r.name, r.value, r.note ?? ""])]),
].join(" ");
const lower = corpus.toLowerCase();
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Single words are matched on word boundaries (so "signed" does not trip on "designed"); phrases with spaces as substrings. */
const ban = (terms: string[]) => {
  for (const term of terms) {
    if (/\s/.test(term)) expect(lower).not.toContain(term);
    else expect(lower).not.toMatch(new RegExp(`(^|[^a-z])${escapeRe(term)}([^a-z]|$)`));
  }
};

describe("CE82A identity and relationship", () => {
  it("keeps the YAWIN manufacturer identity and states the co-development as the owner worded it", () => {
    expect(CE82A.brand).toBe("YAWIN");
    expect(CE82A.model).toBe("CE82A");
    expect(CE82A.relationship).toContain("developed jointly by NXTektal and YAWIN");
    expect(CE82A.relationship).toContain("manufactured by YAWIN");
    expect(CE82A.relationship).toContain("confirmed for each site");
    ban(["manufactured by nxtektal", "built by nxtektal", "authorised dealer", "authorized dealer", "exclusive", "fully integrated", "signed", "contracted"]);
  });

  it("presents the features as the manufacturer's description", () => {
    expect(FEATURES).toHaveLength(4);
    expect(FEATURES_NOTE.toLowerCase()).toContain("manufacturer’s description");
    expect(FEATURES[1].body).toContain("The manufacturer describes");
    expect(FEATURES[3].body).toContain("the manufacturer describes automatic delivery and unloading");
  });
});

describe("CE82A specification boundaries", () => {
  it("leads with the two hero figures", () => {
    expect(HERO_STATS.map((s) => `${s.value}${s.unit ? " " + s.unit : ""}`)).toEqual(["2 m", "1,200"]);
  });

  it("holds every value from the manufacturer's sheet", () => {
    expect(row("Collection width").value).toBe("2 m");
    expect(row("Ball basket capacity").value).toBe("1,200 balls");
    expect(row("Rated area coverage").value).toBe("8,000 m²/h");
    expect(row("Battery rating").value).toBe("48 V / 60 Ah");
    expect(row("Run time, dual battery").value).toBe("Up to 4.5 h");
    expect(row("Maximum travel speed").value).toBe("8 km/h");
    expect(row("Maximum gradient").value).toBe("25%");
    expect(row("Rated braking distance").value).toBe("0.5 m"); // the sheet's "≤" belongs to the 4.5 h run time, not the braking figure
    expect(row("Length × width × height").value).toBe("315 × 210 × 73 cm");
    expect(row("Weight").value).toBe("248 kg");
    expect(rows).toHaveLength(18);
  });

  it("keeps the data boundaries the owner set", () => {
    expect(row("Rated area coverage").note).toContain("not balls per hour");
    expect(lower).not.toMatch(/8,?000 balls/);
    expect(lower).not.toContain("25°");
    expect(row("Maximum travel speed").note).toContain("not a sustained collection speed");
    expect(row("Run time, dual battery").note).toContain("Manufacturer rating");
    expect(lower).not.toMatch(/\b\d+(\.\d+)?\s?k?wh\b/); // no derived energy total
    expect(row("Battery rating").note).toContain("not specified");
    expect(row("Rated braking distance").note).toContain("test conditions not provided");
    ban(["automatic charging", "auto-charging", "self-charging", "automatic battery swap", "charging dock", "docking station", "unattended", "fully autonomous operation"]);
  });

  it("adds no price, stock, lead time, savings, payback, certification or customer figures", () => {
    ban(["price", "pricing", "in stock", "lead time", "delivery time", "payback", "roi", "saves", "savings", "labor saving", "labour saving", "zero missed", "certified", "certification", "customers", "deployed at", "order now", "buy now"]);
    expect(SPEC_NOTE).toContain("product literature (YAWIN)");
  });
});

describe("CE82A media and contact", () => {
  it("labels the scene image as manufacturer material, not a customer deployment", () => {
    const scene = IMAGES.find((i) => i.key === "scene")!;
    expect(scene.caption).toContain("not an NXTektal customer deployment");
    expect(scene.caption.toLowerCase()).toContain("manufacturer");
    // the six files are manufacturer renders/display art, so nothing may call them photographs
    expect(lower).not.toContain("photograph");
    ban(["exploded", "cutaway", "internal", "sensor position", "charging station", "customer photo"]);
    const white = IMAGES.find((i) => i.key === "white")!;
    expect(white.fit).toBe("contain");
    expect([white.width, white.height]).toEqual([980, 731]);
    expect([scene.width, scene.height]).toEqual([1920, 1079]);
  });

  it("uses the site's existing contact address", () => {
    expect(CONTACT.email).toBe("founders@nxtektal.com");
    expect(CONTACT.mailto.startsWith("mailto:founders@nxtektal.com?subject=")).toBe(true);
  });
});

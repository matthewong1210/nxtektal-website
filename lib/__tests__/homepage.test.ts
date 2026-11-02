import { describe, expect, it } from "vitest";

import { CONTACT, CONTACT_LABEL, FOOTER_TAGLINE, GOLF, HERO, INSITE, NAV_ITEMS, ROBOTS, SOFTWARE_NAME, robotCards } from "../homepage";
import { FIELD_STATUS, FIRST_JOB_SENTENCE, POSITIONING_SENTENCE, SITE } from "../positioning";
import { PRODUCTS, PRODUCTS_ROUTE } from "../products";
import { agentSimulatorDemo, heroMasterFrame } from "../visualAssets";

const corpus = [
  HERO.title,
  HERO.subtitle,
  GOLF.eyebrow,
  GOLF.heading,
  GOLF.body,
  GOLF.filmLabel,
  INSITE.eyebrow,
  INSITE.heading,
  INSITE.body,
  INSITE.status,
  ...INSITE.values.flatMap((v) => [v.title, v.body]),
  ROBOTS.eyebrow,
  ROBOTS.heading,
  ROBOTS.body,
  ROBOTS.allLabel,
  FOOTER_TAGLINE,
  ...ROBOTS.cards.flatMap((c) => [c.stage, c.status]),
  CONTACT.heading,
  CONTACT.body,
  CONTACT.cta,
  CONTACT.subject,
  ...NAV_ITEMS.map((i) => i.label),
  CONTACT_LABEL,
  heroMasterFrame.alt,
  agentSimulatorDemo.alt,
  agentSimulatorDemo.truthLabel,
  POSITIONING_SENTENCE,
  FIRST_JOB_SENTENCE,
]
  .join(" ")
  .toLowerCase();

/** Whole-word match, so "site" never trips on "Insite" and "deployed" never trips on "undeployed". */
function ban(term: string) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  expect(corpus, `banned phrase on the homepage: "${term}"`).not.toMatch(new RegExp(`(^|[^\\p{L}])${escaped}(?=$|[^\\p{L}])`, "u"));
}

describe("homepage copy", () => {
  it("opens with the promise in two lines: Insite understands, robots execute", () => {
    expect(HERO.title).toBe("Automate your outdoor operations.");
    expect(HERO.subtitle).toBe("Insite understands your site. Robots execute the work.");
  });

  it("the golf block states the first job with handoff into the existing washer and labels the film as concept", () => {
    expect(GOLF.heading).toBe("Starting with golf facilities.");
    expect(GOLF.body).toContain("range-ball collection");
    expect(GOLF.body).toContain("existing washer");
    expect(GOLF.filmLabel).toContain("Concept visualization, not site footage");
    expect(GOLF.filmLabel).toContain("transfer mechanism shown is under development");
    expect(heroMasterFrame.alt.startsWith("Concept visualization")).toBe(true);
    expect(heroMasterFrame.alt).toContain(SOFTWARE_NAME);
  });

  it("Insite is the software's name; understanding comes first, then judgement and follow-through; its status is the founders' field fact", () => {
    expect(SOFTWARE_NAME).toBe("Insite");
    expect(INSITE.heading).toBe("Insite understands your site.");
    expect(INSITE.values.map((v) => v.title)).toEqual([
      "See what is happening on the site.",
      "Know which work needs attention first.",
      "Follow progress, exceptions, and results.",
    ]);
    expect(INSITE.status).toBe(FIELD_STATUS.insite);
    expect(FIELD_STATUS.insite).toBe("Insite is in use at five golf facilities.");
    expect(agentSimulatorDemo.truthLabel).toBe("Range Operations Simulator — development view");
    expect(agentSimulatorDemo.alt).toContain(SOFTWARE_NAME);
  });

  it("each robot card maps to a registered product, with the founders' field status and nothing beyond it", () => {
    const cards = robotCards();
    expect(cards.map((c) => c.route)).toEqual(PRODUCTS.map((p) => p.route));
    expect(cards.map((c) => c.stage)).toEqual(["First job", "Next job"]);
    expect(cards[0].product.model).toBe("CE82A");
    expect(cards[0].status).toBe("First generation, remote-controlled, in use by course staff. Second generation in field testing at a golf course in Shanghai.");
    expect(FIELD_STATUS.firstGeneration).toBe("The first-generation remote-controlled collection robot is used by course staff.");
    expect(FIELD_STATUS.secondGeneration).toBe("The second-generation robot is in field testing at a golf course in Shanghai.");
    expect(cards[1].product.model).toBe("ME74A");
    expect(cards[1].status).toContain("Next to validate");
    expect(cards[1].status).toContain("Not started");
    expect("note" in ROBOTS).toBe(false); // the neutral inquiry line stays on the product pages, not under the cards
  });

  it("navigation is Golf, Insite, Robots, Products, and the one button is Contact", () => {
    expect(NAV_ITEMS.map((i) => [i.label, i.href])).toEqual([
      ["Golf", "#golf"],
      ["Insite", "#insite"],
      ["Robots", "#robots"],
      ["Products", PRODUCTS_ROUTE],
    ]);
    expect(CONTACT_LABEL).toBe("Contact");
  });

  it("the footer line names Insite and the robots, and golf as the start", () => {
    expect(FOOTER_TAGLINE).toBe("INSITE + ROBOTS FOR OUTDOOR OPERATIONS · STARTING WITH GOLF");
  });

  it("the contact entry writes to the site mailbox", () => {
    expect(CONTACT.mailto.startsWith(`mailto:${SITE.email}?subject=`)).toBe(true);
    expect(decodeURIComponent(CONTACT.mailto.split("subject=")[1])).toBe(CONTACT.subject);
  });

  it("the positioning sentence names Insite and keeps the first job", () => {
    expect(POSITIONING_SENTENCE).toContain("Insite");
    expect(POSITIONING_SENTENCE).not.toContain("is building");
    expect(POSITIONING_SENTENCE).toContain("starting with golf facilities");
    expect(FIRST_JOB_SENTENCE).toContain("existing washer");
  });

  it("never says Site Brain, names no maker, and claims nothing beyond the founders' field facts", () => {
    for (const term of [
      "not yet",
      "in development.",
      "not live facility data",
      "site names",
      "fleet",
      "nationwide",
      "fully autonomous",
      "site brain",
      "robotic workforce",
      "intelligence layer",
      "execution layer",
      "operating layer",
      "operating system",
      "hopper",
      "basket",
      "handoff unit",
      "chute",
      "conveyor",
      "robotic arm",
      "seamless",
      "deployed at",
      "in production",
      "learns on its own",
      "manufactured by",
      "manufacturer",
      "made by",
      "yawin",
      "亚云",
      "photograph",
      "pilot program",
      "customers",
    ]) {
      ban(term);
    }
  });
});

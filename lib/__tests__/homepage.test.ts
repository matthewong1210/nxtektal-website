import { describe, expect, it } from "vitest";

import { CONTACT, CONTACT_LABEL, GOLF, HERO, INSITE, NAV_ITEMS, ROBOTS, SOFTWARE_NAME, robotCards } from "../homepage";
import { FIRST_JOB_SENTENCE, POSITIONING_SENTENCE, SITE } from "../positioning";
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
  INSITE.screenCaption,
  INSITE.status,
  ...INSITE.values.flatMap((v) => [v.title, v.body]),
  ROBOTS.eyebrow,
  ROBOTS.heading,
  ROBOTS.body,
  ROBOTS.note,
  ROBOTS.allLabel,
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
    expect(GOLF.filmLabel).toContain("Concept visualization, not footage of a deployed system");
    expect(GOLF.filmLabel).toContain("transfer mechanism shown is under development");
    expect(heroMasterFrame.alt.startsWith("Concept visualization")).toBe(true);
    expect(heroMasterFrame.alt).toContain(SOFTWARE_NAME);
  });

  it("Insite is the software's name; understanding comes first, then judgement and follow-through; its stage is simulation only", () => {
    expect(SOFTWARE_NAME).toBe("Insite");
    expect(INSITE.heading).toBe("Insite understands your site.");
    expect(INSITE.values.map((v) => v.title)).toEqual([
      "See what is happening on the site.",
      "Know which work needs attention first.",
      "Follow progress, exceptions, and results.",
    ]);
    expect(INSITE.status).toContain("Range Operations Simulator today");
    expect(INSITE.status).toContain("not yet connected to a customer site");
    expect(agentSimulatorDemo.truthLabel).toBe("Simulation results — not live facility data.");
    expect(agentSimulatorDemo.alt).toContain(SOFTWARE_NAME);
  });

  it("each robot card maps to a registered product, with a status from the approved vocabulary and no deployment claim", () => {
    const cards = robotCards();
    expect(cards.map((c) => c.route)).toEqual(PRODUCTS.map((p) => p.route));
    expect(cards.map((c) => c.stage)).toEqual(["First job", "Next job"]);
    expect(cards[0].product.model).toBe("CE82A");
    expect(cards[0].status).toContain("In development");
    expect(cards[0].status).toContain("Not yet running at a customer facility");
    expect(cards[1].product.model).toBe("ME74A");
    expect(cards[1].status).toContain("Next to validate");
    expect(cards[1].status).toContain("Not started");
    expect(ROBOTS.note).toBe("Software integration scope, site fit and supply arrangements are confirmed with NXTektal for each site.");
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

  it("the contact entry writes to the site mailbox", () => {
    expect(CONTACT.mailto.startsWith(`mailto:${SITE.email}?subject=`)).toBe(true);
    expect(decodeURIComponent(CONTACT.mailto.split("subject=")[1])).toBe(CONTACT.subject);
  });

  it("the positioning sentence names Insite and keeps the first job", () => {
    expect(POSITIONING_SENTENCE).toContain("Insite");
    expect(POSITIONING_SENTENCE).toContain("starting with golf facilities");
    expect(FIRST_JOB_SENTENCE).toContain("existing washer");
  });

  it("never says Site Brain, names no maker, and claims no deployment, learning, or chosen mechanism", () => {
    for (const term of [
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

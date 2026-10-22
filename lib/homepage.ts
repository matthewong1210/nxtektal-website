/**
 * Homepage copy — the five blocks of the minimal homepage (2026-10-22): the
 * promise, the first application (golf), Insite, the robots, and the contact
 * entry. It lives here as data so the truthfulness tests can hold the page
 * to the approved wording, the media labels, and the status vocabulary.
 *
 * "Insite" is the name of the software (formerly "Site Brain"). Insite is
 * advisory: it understands the site and helps the people running it decide;
 * the robots carry out the work. Nothing here claims a connected site, a
 * deployed machine, or a completed integration.
 */

import { SITE } from "./positioning";
import { PRODUCTS, PRODUCTS_ROUTE } from "./products";
import type { ProductData } from "./products/types";

export const SOFTWARE_NAME = "Insite";

/** Primary navigation. Product pages prefix the hash links with "/" (see `productNavItems`). */
export const NAV_ITEMS = [
  { label: "Golf", href: "#golf" },
  { label: SOFTWARE_NAME, href: "#insite" },
  { label: "Robots", href: "#robots" },
  { label: "Products", href: PRODUCTS_ROUTE },
];

/** The one header button, on every page. */
export const CONTACT_LABEL = "Contact";

/** Block 1 — the promise. Two lines, nothing else. */
export const HERO = {
  title: "Automate your outdoor operations.",
  subtitle: "Insite understands your site. Robots execute the work.",
} as const;

/** Block 2 — the first application. The film does the explaining; one sentence states the first job. */
export const GOLF = {
  eyebrow: "First application",
  heading: "Starting with golf facilities.",
  body:
    "We start with range-ball collection at driving ranges: a robot gathers the balls across the outfield and brings them back for transfer into the range’s existing washer.",
  /** The short label under the film: a concept visualization that also shows a transfer mechanism under development. */
  filmLabel:
    "Concept visualization, not footage of a deployed system. The transfer mechanism shown is under development.",
} as const;

/** Block 3 — Insite: understanding first, then judgement, coordination, and follow-through. No architecture. */
export const INSITE = {
  eyebrow: SOFTWARE_NAME,
  heading: "Insite understands your site.",
  body:
    "Insite is NXTektal’s software. It keeps track of what is happening across the grounds, helps the people running the site decide what to do next, and follows the work through to the result.",
  values: [
    {
      title: "See what is happening on the site.",
      body: "Ball availability on the range, where each robot is, and the state of the equipment, in one view.",
    },
    {
      title: "Know which work needs attention first.",
      body: "Insite weighs demand against what is available and schedules the next run, within the rules the manager sets.",
    },
    {
      title: "Follow progress, exceptions, and results.",
      body: "Runs in progress, exceptions such as a late run or an unconfirmed transfer, and completed work are recorded as they happen.",
    },
  ],
  status: "Insite runs in the Range Operations Simulator today. It is not yet connected to a customer site.",
} as const;

/** Block 4 — the robots. Name, job, and a short development status per machine; details on the product pages.
 * The neutral inquiry line stays on the product pages (contact block and list note), not here. */
export type RobotCardCopy = { route: string; stage: string; status: string };

export const ROBOTS = {
  eyebrow: "Robots",
  heading: "Robots do the work Insite hands over.",
  body: "Each robot takes one job on the site. Insite works out what needs doing; the robot carries it out.",
  allLabel: "All products",
  cards: [
    { route: "/products/ce82a", stage: "First job", status: "In development. Not yet running at a customer facility." },
    { route: "/products/me74a", stage: "Next job", status: "Next to validate. Not started." },
  ] as RobotCardCopy[],
};

/** Each robot card joined with its registered product; an unregistered route fails the build rather than rendering a blank card. */
export function robotCards(): (RobotCardCopy & { product: ProductData })[] {
  return ROBOTS.cards.map((card) => {
    const product = PRODUCTS.find((p) => p.route === card.route);
    if (!product) throw new Error(`Homepage robot card points at an unregistered product: ${card.route}`);
    return { ...card, product };
  });
}

/** The footer line, kept with the rest of the homepage copy so the tests cover it. */
export const FOOTER_TAGLINE = "INSITE + ROBOTS FOR OUTDOOR OPERATIONS · STARTING WITH GOLF";

/** Block 5 — one contact entry. */
const CONTACT_SUBJECT = "Site inquiry — [Facility name]";

export const CONTACT = {
  heading: "Tell us about your site.",
  body: "Write to us with your facility, the work you want taken over, and how it is done today. We reply by email.",
  cta: "Contact NXTektal",
  subject: CONTACT_SUBJECT,
  mailto: `mailto:${SITE.email}?subject=${encodeURIComponent(CONTACT_SUBJECT)}`,
} as const;

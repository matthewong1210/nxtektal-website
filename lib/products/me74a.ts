/**
 * YAWIN ME74A robotic fairway mower — product page data.
 *
 * One module holds everything the /products/me74a page shows, in the same
 * shape as the CE82A module, so the copy, the specification table and the
 * media captions can be checked by tests. All figures come from the
 * manufacturer's product literature (ME74A.pdf and the spec table the owner
 * supplied on 2026-10-18); the notes next to each figure keep the data
 * boundaries the owner set:
 *
 * - the travel gradient (60%) and the mowing gradient (44%) are separate
 *   figures; the machine is never described as mowing on a 60% slope;
 * - 9 km/h is a maximum travel speed, not a sustained mowing speed;
 * - 8,000 m²/h and 60,000 m² per charge are manufacturer ratings, not
 *   NXTektal measurements or guarantees;
 * - charging time is the spec-table figure of 4.5 h with the configuration
 *   still to be confirmed (the brochure cover says "<4.5 h"; nothing here
 *   promises "under 4.5 h");
 * - the 48 V / 450 Ah rating is not expanded into an energy total (the
 *   literature's "21.6 kW" figure has a unit problem and is omitted);
 * - the reel length is omitted (the literature gives 27 in and 680 mm, which
 *   disagree); the reel count and diameter are kept;
 * - automatic return to the charging station is a manufacturer description,
 *   not evidence of verified round-the-clock operation;
 * - whether a charging station is included, whether wireless charging is
 *   standard, and who provides the warranty on what terms are not decided
 *   here; IP65 is reported as marked, not expanded into weather or
 *   certification claims; the literature's marketing percentages are left out.
 *
 * Relationship (owner's wording, 2026-10-18): the ME74A is YAWIN's
 * pure-electric fairway mower — a fairway mower, not a greens mower, and not
 * claimed to suit every turf setting. NXTektal plans to extend from the CE82A
 * to mowing, but there is no evidence that the ME74A has been integrated with
 * NXTektal software, so nothing here may say integration is complete, that
 * the machine is deployed at a customer site, or that orders are being
 * taken. Nothing may say NXTektal developed the hardware, is an authorised
 * dealer, or has signed a joint-development agreement. Manufacturer markings
 * (YAWIN and Rural Dog) stay on the images as supplied; no brand relationship
 * between them is inferred.
 */

import {
  PRODUCT_SECTIONS,
  type Feature,
  type HeroStat,
  type ProductContact,
  type ProductData,
  type ProductImage,
  type SpecGroup,
} from "./types";

export const ME74A_ROUTE = "/products/me74a";

export const ME74A = {
  brand: "YAWIN",
  brandNative: "亚云",
  model: "ME74A",
  name: "ME74A Robotic Fairway Mower",
  nativeName: "ME74A 智能球道割草机器人",
  category: "Robotic fairway mower for golf courses",
  summary:
    "A pure-electric robotic mower for golf-course fairway maintenance, made by YAWIN. It cuts with three reel cutting units and combines positioning, environment perception and automatic operation, with a 1.88 m cutting width and a 10–60 mm cutting height range.",
  /** How NXTektal relates to the machine — stated once, near the top, in plain terms. */
  relationship:
    "The ME74A is a YAWIN (亚云) product: a pure-electric fairway mower, not a greens mower. NXTektal plans to extend from the CE82A’s ball collection to fairway mowing. The ME74A is not yet integrated with NXTektal’s software, NXTektal has no customer deployment of it and takes no orders for it; whether it fits a given course is confirmed during the inquiry.",
} as const;

/** The three figures the first screen leads with. */
export const HERO_STATS: HeroStat[] = [
  { value: "1.88", unit: "m", label: "Cutting width" },
  { value: "10–60", unit: "mm", label: "Cutting height" },
  { value: "3", label: "Reel cutting units" },
];

/** Four themes, as described in the manufacturer's literature. */
export const FEATURES: Feature[] = [
  {
    title: "Cutting system",
    body: "Three reel cutting units, each driven by its own brushless DC motor, with the cutting height adjustable from 10 to 60 mm.",
  },
  {
    title: "Positioning and perception",
    body: "Dual-antenna RTK positioning with virtual boundaries. 3D lidar, a full-colour camera and ultrasonic sensors for obstacle detection.",
  },
  {
    title: "Automatic operation and cross-area travel",
    body: "The manufacturer describes automatic travel between the maintenance yard and the fairways, movement across areas, obstacle avoidance, and automatic return when it rains or a fault occurs. Routes and site fit are confirmed per course.",
  },
  {
    title: "Battery and recharging",
    body: "48 V / 450 Ah lithium iron phosphate battery. The manufacturer describes automatic return to the charging station and lists wired plug-in and wireless contactless charging options.",
  },
];

export const FEATURES_INTRO = "What the ME74A does, as described in its product literature.";

export const FEATURES_NOTE =
  "These functions are the manufacturer’s description of the machine’s hardware capability, not NXTektal software. The ME74A is not integrated with NXTektal’s operating software today.";

export const IMAGES: ProductImage[] = [
  {
    key: "studio",
    src: "/products/me74a/me74a-product-studio.webp",
    width: 1322,
    height: 747,
    alt: "ME74A robotic fairway mower, studio product photograph: the complete machine with its wheels and the three front reel cutting units",
    caption: "ME74A, manufacturer studio photograph. The whole machine is shown, including the wheels and the front cutting units; nothing is cropped.",
    label: "Studio view",
    fit: "contain",
  },
  {
    key: "front",
    src: "/products/me74a/me74a-front.webp",
    width: 617,
    height: 436,
    alt: "ME74A robotic fairway mower seen from the front, manufacturer photograph",
    caption: "Front view, manufacturer material. The source is low resolution and is shown at its natural size.",
    label: "Front view",
    fit: "contain",
  },
  {
    key: "top",
    src: "/products/me74a/me74a-top-angle.webp",
    width: 690,
    height: 488,
    alt: "ME74A robotic fairway mower seen from a raised front angle, manufacturer photograph",
    caption: "Raised-angle view, manufacturer material. The source is low resolution and is shown at its natural size.",
    label: "Raised angle",
    fit: "contain",
  },
  {
    key: "course",
    src: "/products/me74a/me74a-golf-course.webp",
    width: 1920,
    height: 1440,
    alt: "ME74A on a golf course fairway, manufacturer display photograph",
    caption: "Manufacturer display material showing the ME74A on a golf course. It illustrates the kind of setting the machine works in; it is not an NXTektal customer deployment.",
    label: "On the course",
    fit: "cover",
  },
];

export const GALLERY_HEADING = "Four manufacturer views: studio, front, raised angle, and on the course.";

export const GALLERY_NOTE =
  "Manufacturer display material; the markings on the machine (YAWIN, Rural Dog) are kept as supplied. The front and raised-angle sources are low resolution and are shown at their natural size.";

/** Grouped specification table. Values are the manufacturer's; notes keep the data boundaries. */
export const SPEC_GROUPS: SpecGroup[] = [
  {
    title: "Cutting system",
    rows: [
      { name: "Cutting width", value: "1.88 m" },
      { name: "Cutting height", value: "10–60 mm" },
      { name: "Reel cutting units", value: "3" },
      { name: "Reel diameter", value: "203.2 mm (8 in)" },
      { name: "Reel drive", value: "Independent brushless DC motors" },
    ],
  },
  {
    title: "Work rate",
    rows: [
      { name: "Rated mowing rate", value: "8,000 m²/h", note: "Manufacturer rating, not measured or guaranteed by NXTektal." },
      { name: "Rated area per charge", value: "60,000 m²", note: "Manufacturer rating." },
      { name: "Rated run time on a full charge", value: "8–9 h", note: "Manufacturer rating." },
    ],
  },
  {
    title: "Battery and charging",
    rows: [
      { name: "Battery type", value: "Lithium iron phosphate (LiFePO₄)" },
      { name: "Battery rating", value: "48 V / 450 Ah" },
      { name: "Rated charging time", value: "4.5 h", note: "Manufacturer figure; the charging configuration is to be confirmed." },
      { name: "Charging", value: "Wired plug-in and wireless contactless options are listed in the literature", note: "Configuration to be confirmed; neither option is assumed to be included." },
    ],
  },
  {
    title: "Positioning and perception",
    rows: [
      { name: "Positioning", value: "Dual-antenna RTK with virtual boundaries" },
      { name: "Obstacle detection", value: "3D lidar, full-colour camera, ultrasonic sensors" },
    ],
  },
  {
    title: "Travel and drive",
    rows: [
      { name: "Maximum travel speed", value: "9 km/h", note: "Maximum travel speed, not a sustained mowing speed." },
      { name: "Drive", value: "Three independent drive motors" },
      { name: "Steering and control", value: "Wide-angle rear-wheel steering with torque vectoring" },
      { name: "Tyres", value: "Turf tyres" },
    ],
  },
  {
    title: "Gradient",
    rows: [
      { name: "Maximum travel gradient", value: "60% (about 31°)", note: "Manufacturer rating for travel only." },
      { name: "Maximum mowing gradient", value: "44% (about 24°)", note: "Manufacturer rating for mowing." },
    ],
  },
  {
    title: "Dimensions and weight",
    rows: [
      { name: "Length × width × height", value: "2.78 × 1.98 × 1.56 m" },
      { name: "Weight", value: "950 kg" },
    ],
  },
  {
    title: "Protection and warranty",
    rows: [
      { name: "Ingress protection", value: "IP65", note: "As marked by the manufacturer." },
      { name: "Warranty period", value: "2 years, per the manufacturer’s literature", note: "Scope and conditions are set by the delivery contract." },
    ],
  },
];

export const SPEC_NOTE =
  "Specifications are from the manufacturer’s product literature (YAWIN). Actual performance depends on turf conditions, slope, route, weather and the delivered configuration.";

/** Contact entry: the site's existing address, with a product-specific subject. */
export const CONTACT: ProductContact = {
  email: "founders@nxtektal.com",
  subject: "ME74A — product and site fit",
  mailto: "mailto:founders@nxtektal.com?subject=ME74A%20%E2%80%94%20product%20and%20site%20fit",
  heading: "Ask about the product and site fit",
  body:
    "Tell us about your course — fairway area, slopes, and how mowing is done today. We reply by email on whether the ME74A could fit your site, and on where NXTektal’s software stands for mowing.",
  cta: "Ask about product and site fit",
  secondaryLabel: "Pilot program on the homepage",
  secondaryHref: "/#pilot",
};

/** Everything the /products/me74a page shows, in the shared product shape. */
export const ME74A_PRODUCT: ProductData = {
  route: ME74A_ROUTE,
  ...ME74A,
  job: "Fairway mowing",
  heroStats: HERO_STATS,
  images: IMAGES,
  heroImageKey: "studio",
  featuresIntro: FEATURES_INTRO,
  features: FEATURES,
  featuresNote: FEATURES_NOTE,
  galleryHeading: GALLERY_HEADING,
  galleryNote: GALLERY_NOTE,
  specGroups: SPEC_GROUPS,
  specNote: SPEC_NOTE,
  contact: CONTACT,
  sections: PRODUCT_SECTIONS,
};

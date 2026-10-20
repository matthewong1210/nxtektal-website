/**
 * YAWIN CE82A robotic ball collector — product page data.
 *
 * One module holds everything the /products/ce82a page shows, so the copy,
 * the specification table and the media captions can be checked by tests
 * and so later models can follow the same shape (see ./types.ts and ./me74a.ts). All figures come from the
 * manufacturer's product literature (亚云自动捡球机CE82A.pdf); the notes next
 * to each figure keep the data boundaries the owner set: area efficiency is
 * not balls per hour, 25% is a gradient not degrees, 8 km/h is a maximum
 * travel speed, run time is a manufacturer rating, the 48 V / 60 Ah rating is
 * not expanded into a total energy figure, quick battery swap is not
 * automatic recharging, and "automatic unloading when full" is a
 * manufacturer description whose delivered form is confirmed per site.
 *
 * Presentation (owner's direction, 2026-10-20): the page presents functions
 * and specifications only — no maker attribution, no co-development or
 * relationship copy, no commercial status. `brand`/`brandNative` are kept for
 * records (ATTRIBUTIONS) and never rendered. Nothing may present the machine
 * as NXTektal-manufactured, as an authorised dealership, or as fully
 * integrated with NXTektal software; software coverage and commercial terms
 * are a matter for the inquiry (contact block).
 */

import {
  IMAGE_PENDING_TEXT,
  PRODUCT_SECTIONS,
  type Feature,
  type HeroStat,
  type ProductData,
  type ProductImage,
  type SpecGroup,
  type SpecRow,
} from "./types";

export type { Feature, HeroStat, ProductImage, SpecGroup, SpecRow };
export { IMAGE_PENDING_TEXT };

export const CE82A_ROUTE = "/products/ce82a";

export const CE82A = {
  brand: "YAWIN",
  brandNative: "亚云",
  model: "CE82A",
  name: "CE82A Robotic Ball Collector",
  nativeName: "CE82A 自动捡球机",
  category: "Robotic ball collector for golf driving ranges",
  summary:
    "A robotic ball collector for golf driving ranges. It gathers range balls across the outfield under remote control or autonomous navigation, with a 2 m collection width and a 1,200-ball basket.",
} as const;

/** The two figures the first screen leads with. */
export const HERO_STATS: HeroStat[] = [
  { value: "2", unit: "m", label: "Collection width" },
  { value: "1,200", label: "Ball basket capacity" },
];

/** Four themes, as described in the product literature. */
export const FEATURES: Feature[] = [
  {
    title: "Control and navigation",
    body: "Two operating modes: beyond-line-of-sight remote control and autonomous navigation. Dual-antenna RTK positioning with virtual boundaries.",
  },
  {
    title: "Perception and obstacle avoidance",
    body: "3D lidar, a full-colour camera and a 3D camera, for obstacle detection and avoidance as described in the product literature.",
  },
  {
    title: "Work management",
    body: "Path planning, zoned operation, and display and recording of the work track.",
  },
  {
    title: "Full basket and recharging",
    body: "Vision-based full-basket detection, with automatic delivery and unloading when the basket is full, as described in the product literature. Recharging by direct charging or quick battery swap.",
  },
];

export const FEATURES_INTRO = "What the CE82A does.";

export const FEATURES_NOTE =
  "Functions are as described in the product literature. How automatic unloading is set up at a given range is confirmed per delivery configuration.";

export const IMAGES: ProductImage[] = [
  {
    key: "white",
    src: "/products/ce82a/ce82a-product-white.webp",
    width: 980,
    height: 731,
    alt: "CE82A robotic ball collector on a white background: the complete machine with its body, wheels and collection unit",
    caption: "CE82A, product image on white. The whole machine is shown; nothing is cropped.",
    label: "Product on white",
    fit: "contain",
  },
  {
    key: "scene",
    src: "/products/ce82a/ce82a-golf-course.webp",
    width: 1920,
    height: 1079,
    alt: "CE82A on golf turf, display image from the product literature",
    caption: "Display image from the product literature showing the CE82A on golf turf; not an NXTektal customer deployment.",
    label: "On the course",
    fit: "cover",
  },
];

/** Grouped specification table. Values are from the product literature; notes keep the data boundaries. */
export const SPEC_GROUPS: SpecGroup[] = [
  {
    title: "Collection",
    rows: [
      { name: "Collection width", value: "2 m" },
      { name: "Ball basket capacity", value: "1,200 balls" },
      { name: "Rated area coverage", value: "8,000 m²/h", note: "Area covered per hour, not balls per hour." },
    ],
  },
  {
    title: "Battery and recharging",
    rows: [
      { name: "Battery type", value: "Lithium iron phosphate (LiFePO₄)" },
      { name: "Battery rating", value: "48 V / 60 Ah", note: "Whether this is one battery or the combined pack is not specified." },
      { name: "Run time, dual battery", value: "Up to 4.5 h", note: "Rated figure, not a measured guarantee." },
      { name: "Recharging", value: "Direct charging; quick battery swap" },
    ],
  },
  {
    title: "Travel and control",
    rows: [
      { name: "Maximum travel speed", value: "8 km/h", note: "Maximum travel speed, not a sustained collection speed." },
      { name: "Maximum gradient", value: "25%", note: "Slope as a percentage." },
      { name: "Drive", value: "Dual-motor drive" },
      { name: "Steering", value: "Differential steering" },
      { name: "Braking", value: "Electromagnetic brake" },
      { name: "Rated braking distance", value: "0.5 m", note: "Test conditions not provided." },
    ],
  },
  {
    title: "Positioning and perception",
    rows: [
      { name: "Positioning", value: "Dual-antenna RTK with virtual boundaries" },
      { name: "Sensors", value: "3D lidar, full-colour camera, 3D camera" },
      { name: "Operating modes", value: "Beyond-line-of-sight remote control / autonomous navigation" },
    ],
  },
  {
    title: "Dimensions and weight",
    rows: [
      { name: "Length × width × height", value: "315 × 210 × 73 cm" },
      { name: "Weight", value: "248 kg" },
    ],
  },
];

export const SPEC_NOTE =
  "Specifications are taken from the CE82A product literature. Actual performance depends on the site, the load, the operating method and the delivered configuration.";

/** Contact entry: the site's existing address, with a product-specific subject. */
export const CONTACT = {
  email: "founders@nxtektal.com",
  subject: "CE82A — product and site fit",
  mailto: "mailto:founders@nxtektal.com?subject=CE82A%20%E2%80%94%20product%20and%20site%20fit",
  heading: "Ask about the product and site fit",
  body:
    "Tell us about your range — outfield size and terrain, how balls are collected and washed today, and what you would want a machine to take over. We reply by email on whether the CE82A, and NXTektal’s software, could fit your site.",
  cta: "Ask about product and site fit",
  secondaryLabel: "Pilot program on the homepage",
  secondaryHref: "/#pilot",
} as const;

/** Section anchors, in page order (shared by every product page). */
export const SECTIONS = PRODUCT_SECTIONS;

export const GALLERY_HEADING = "The machine on white, and on the course.";

/** Everything the /products/ce82a page shows, in the shared product shape. */
export const CE82A_PRODUCT: ProductData = {
  route: CE82A_ROUTE,
  ...CE82A,
  job: "Driving-range ball collection",
  heroStats: HERO_STATS,
  images: IMAGES,
  heroImageKey: "white",
  featuresIntro: FEATURES_INTRO,
  features: FEATURES,
  featuresNote: FEATURES_NOTE,
  galleryHeading: GALLERY_HEADING,
  specGroups: SPEC_GROUPS,
  specNote: SPEC_NOTE,
  contact: CONTACT,
  sections: SECTIONS,
};

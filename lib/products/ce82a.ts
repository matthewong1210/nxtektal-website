/**
 * YAWIN CE82A robotic ball collector — product page data.
 *
 * One module holds everything the /products/ce82a page shows, so the copy,
 * the specification table and the media captions can be checked by tests
 * and so later models can follow the same shape. All figures come from the
 * manufacturer's product literature (亚云自动捡球机CE82A.pdf); the notes next
 * to each figure keep the data boundaries the owner set: area efficiency is
 * not balls per hour, 25% is a gradient not degrees, 8 km/h is a maximum
 * travel speed, run time is a manufacturer rating, the 48 V / 60 Ah rating is
 * not expanded into a total energy figure, quick battery swap is not
 * automatic recharging, and "automatic unloading when full" is a
 * manufacturer description whose delivered form is confirmed per site.
 *
 * Relationship (owner's wording, 2026-10-16): the CE82A is developed jointly
 * by NXTektal and YAWIN and manufactured by YAWIN. Software coverage and
 * commercial terms for a given site are confirmed during the inquiry. Nothing
 * here may present the machine as NXTektal-manufactured, as an authorised
 * dealership, or as fully integrated with NXTektal software at every site.
 */

export const CE82A_ROUTE = "/products/ce82a";

export const CE82A = {
  brand: "YAWIN",
  brandNative: "亚云",
  model: "CE82A",
  name: "CE82A Robotic Ball Collector",
  nativeName: "CE82A 自动捡球机",
  category: "Robotic ball collector for golf driving ranges",
  summary:
    "A robotic ball collector for golf driving ranges, developed jointly by NXTektal and YAWIN and manufactured by YAWIN. It gathers range balls across the outfield under remote control or autonomous navigation, with a 2 m collection width and a 1,200-ball basket.",
  /** How NXTektal and YAWIN relate — stated once, near the top, in plain terms. */
  relationship:
    "The CE82A is developed jointly by NXTektal and YAWIN (亚云) and manufactured by YAWIN. Which parts of a range’s operation NXTektal’s software runs, and the commercial terms, are confirmed for each site during the inquiry.",
} as const;

export type HeroStat = { value: string; unit?: string; label: string };

/** The two figures the first screen leads with. */
export const HERO_STATS: HeroStat[] = [
  { value: "2", unit: "m", label: "Collection width" },
  { value: "1,200", label: "Ball basket capacity" },
];

export type Feature = { title: string; body: string };

/** Four themes, as described in the manufacturer's literature. */
export const FEATURES: Feature[] = [
  {
    title: "Control and navigation",
    body: "Two operating modes: beyond-line-of-sight remote control and autonomous navigation. Dual-antenna RTK positioning with virtual boundaries.",
  },
  {
    title: "Perception and obstacle avoidance",
    body: "3D lidar, a full-colour camera and a 3D camera. The manufacturer describes obstacle detection and avoidance.",
  },
  {
    title: "Work management",
    body: "Path planning, zoned operation, and display and recording of the work track.",
  },
  {
    title: "Full basket and recharging",
    body: "Vision-based full-basket detection; the manufacturer describes automatic delivery and unloading when the basket is full. Recharging by direct charging or quick battery swap.",
  },
];

export const FEATURES_INTRO = "What the CE82A does, as described in its product literature.";

export const FEATURES_NOTE =
  "These functions are the manufacturer’s description of the machine. Which of them NXTektal’s operating software runs at a given range, and how automatic unloading is set up there, are confirmed per delivery configuration.";

export type ProductImage = {
  key: "white" | "scene";
  /** Public path; the file is supplied by the manufacturer and copied into public/products/ce82a/. */
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Short label for the thumbnail button. */
  label: string;
  /** "contain" keeps the whole machine visible (white-background product shot); "cover" is for scene photography. */
  fit: "contain" | "cover";
};

export const IMAGES: ProductImage[] = [
  {
    key: "white",
    src: "/products/ce82a/ce82a-product-white.webp",
    width: 980,
    height: 731,
    alt: "CE82A robotic ball collector on a white background: the complete machine with its body, wheels and front collection mechanism, YAWIN marking visible",
    caption: "CE82A, product photograph on white (manufacturer material). The whole machine is shown; nothing is cropped.",
    label: "Product on white",
    fit: "contain",
  },
  {
    key: "scene",
    src: "/products/ce82a/ce82a-golf-course.webp",
    width: 1920,
    height: 1079,
    alt: "CE82A on a golf course lawn, manufacturer display photograph",
    caption: "Manufacturer display material showing the CE82A on a golf course. It illustrates the kind of setting the machine works in; it is not an NXTektal customer deployment.",
    label: "On the course",
    fit: "cover",
  },
];

/** Shown in place of a photograph when the file has not been supplied yet. */
export const IMAGE_PENDING_TEXT = "Manufacturer photograph to be added";

export type SpecRow = { name: string; value: string; note?: string };
export type SpecGroup = { title: string; rows: SpecRow[] };

/** Grouped specification table. Values are the manufacturer's; notes keep the data boundaries. */
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
      { name: "Battery rating", value: "48 V / 60 Ah", note: "As stated by the manufacturer; whether this is one battery or the combined pack is not specified." },
      { name: "Run time, dual battery", value: "Up to 4.5 h", note: "Manufacturer rating, not a measured guarantee." },
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
      { name: "Rated braking distance", value: "≤ 0.5 m", note: "Test conditions not provided." },
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
  "Specifications are taken from the CE82A product literature (YAWIN). Actual performance depends on the site, the load, the operating method and the delivered configuration.";

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

/** Section anchors, in page order. */
export const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "gallery", label: "Images" },
  { id: "specs", label: "Specifications" },
  { id: "contact", label: "Contact" },
] as const;

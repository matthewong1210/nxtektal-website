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
 * Presentation (owner's direction, 2026-10-20): the page presents functions
 * and specifications only. No maker attribution, no brand names (YAWIN,
 * Rural Dog), no co-development or relationship copy, no "plans to extend"
 * narrative, no commercial status in the hero. `brand`/`brandNative` are kept
 * for records (ATTRIBUTIONS) and never rendered. The machine is a fairway
 * mower, not a greens mower, and is not claimed to suit every turf setting.
 * Nothing may claim that integration with NXTektal software is complete, that
 * the machine is deployed at a customer site, or that orders are being taken —
 * and nothing may assert the opposite either, because neither has been
 * confirmed; the neutral inquiry line lives in the contact block only. The
 * markings on the images stay as supplied and are not described in copy.
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
    "A pure-electric robotic mower for golf-course fairway maintenance — a fairway mower, not a greens mower. It cuts with three reel cutting units and combines positioning, environment perception and automatic operation, with a 1.88 m cutting width and a 10–60 mm cutting height range.",
} as const;

/** The three figures the first screen leads with. */
export const HERO_STATS: HeroStat[] = [
  { value: "1.88", unit: "m", label: "Cutting width" },
  { value: "10–60", unit: "mm", label: "Cutting height" },
  { value: "3", label: "Reel cutting units" },
];

/** Four themes, as described in the product literature. */
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
    body: "Automatic travel between the maintenance yard and the fairways, movement across areas, obstacle avoidance, and automatic return when it rains or a fault occurs, as described in the product literature. Routes and site fit are confirmed per course.",
  },
  {
    title: "Battery and recharging",
    body: "48 V / 450 Ah lithium iron phosphate battery. Automatic return to the charging station as described in the product literature; wired plug-in and wireless contactless charging options are listed.",
  },
];

export const FEATURES_INTRO = "What the ME74A does.";

export const FEATURES_NOTE =
  "Functions are as described in the product literature.";

export const IMAGES: ProductImage[] = [
  {
    key: "raised",
    src: "/products/me74a/me74a-raised-angle.webp",
    width: 1536,
    height: 1024,
    alt: "ME74A robotic fairway mower from a raised front angle: the complete machine with its wheels and the three reel cutting units",
    caption: "ME74A, studio image from a raised front angle. The whole machine is shown, including the wheels and the reel cutting units; nothing is cropped.",
    label: "Raised angle",
    fit: "contain",
  },
  {
    key: "front",
    src: "/products/me74a/me74a-front.webp",
    width: 1537,
    height: 1023,
    alt: "ME74A robotic fairway mower seen from the front, with the reel cutting units across the full width",
    caption: "Front view: the reel cutting units across the full width, with the lidar and camera housing on top of the body.",
    label: "Front view",
    fit: "contain",
  },
  {
    key: "side",
    src: "/products/me74a/me74a-side.webp",
    width: 1537,
    height: 1023,
    alt: "ME74A robotic fairway mower seen from the side: a front reel cutting unit, the drive wheel and the rear caster wheel",
    caption: "Side view: a front reel cutting unit ahead of the drive wheel, with the rear caster wheel behind.",
    label: "Side view",
    fit: "contain",
  },
  {
    key: "course",
    src: "/products/me74a/me74a-golf-course.webp",
    width: 1537,
    height: 1023,
    alt: "ME74A robotic fairway mower on a golf course fairway, display image",
    caption: "On the course: display image of the ME74A on a fairway; not an NXTektal customer deployment.",
    label: "On the course",
    fit: "contain",
  },
];

export const GALLERY_HEADING = "Four views: raised angle, front, side, and on the course.";

/** Grouped specification table. Values are from the product literature; notes keep the data boundaries. */
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
      { name: "Rated mowing rate", value: "8,000 m²/h", note: "Rated figure, not measured or guaranteed by NXTektal." },
      { name: "Rated area per charge", value: "60,000 m²", note: "Rated figure." },
      { name: "Rated run time on a full charge", value: "8–9 h", note: "Rated figure." },
    ],
  },
  {
    title: "Battery and charging",
    rows: [
      { name: "Battery type", value: "Lithium iron phosphate (LiFePO₄)" },
      { name: "Battery rating", value: "48 V / 450 Ah" },
      { name: "Rated charging time", value: "4.5 h", note: "The charging configuration is to be confirmed." },
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
      { name: "Maximum travel gradient", value: "60% (about 31°)", note: "Rated for travel only, not for mowing." },
      { name: "Maximum mowing gradient", value: "44% (about 24°)", note: "Rated for mowing." },
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
      { name: "Ingress protection", value: "IP65", note: "As marked in the product literature." },
      { name: "Warranty period", value: "2 years", note: "Per the product literature; scope and conditions are set by the delivery contract." },
    ],
  },
];

export const SPEC_NOTE =
  "Specifications are from the ME74A product literature. Actual performance depends on turf conditions, slope, route, weather and the delivered configuration.";

/** Contact entry: the site's existing address, with a product-specific subject. */
export const CONTACT: ProductContact = {
  email: "founders@nxtektal.com",
  subject: "ME74A — product and site fit",
  mailto: "mailto:founders@nxtektal.com?subject=ME74A%20%E2%80%94%20product%20and%20site%20fit",
  heading: "Ask about the product and site fit",
  body:
    "Tell us about your course — fairway area, slopes, and how mowing is done today. We reply by email on whether the ME74A could fit your site, on the scope of software integration, and on supply arrangements.",
  cta: "Ask about product and site fit",
  secondaryLabel: "The robots on the homepage",
  secondaryHref: "/#robots",
};

/** Everything the /products/me74a page shows, in the shared product shape. */
export const ME74A_PRODUCT: ProductData = {
  route: ME74A_ROUTE,
  ...ME74A,
  job: "Fairway mowing",
  heroStats: HERO_STATS,
  images: IMAGES,
  heroImageKey: "raised",
  galleryAspect: "3 / 2",
  featuresIntro: FEATURES_INTRO,
  features: FEATURES,
  featuresNote: FEATURES_NOTE,
  galleryHeading: GALLERY_HEADING,
  specGroups: SPEC_GROUPS,
  specNote: SPEC_NOTE,
  contact: CONTACT,
  sections: PRODUCT_SECTIONS,
};

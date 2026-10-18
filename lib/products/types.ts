/**
 * Shared shape of a product detail page.
 *
 * Every product module (lib/products/<model>.ts) exports one `ProductData`
 * object built from this shape, so the template in
 * components/products/ProductPage.tsx renders each model the same way and
 * the truthfulness tests can check each module's copy, figures and captions.
 * Nothing here holds product facts; the facts live in the model modules and
 * come from the manufacturer's literature, with notes that keep the data
 * boundaries the owner set.
 */

export type HeroStat = { value: string; unit?: string; label: string };

export type Feature = { title: string; body: string };

export type ProductImage = {
  /** Stable key, unique within one product (used for thumbnails and the hero pick). */
  key: string;
  /** Public path; the file is supplied by the manufacturer and copied into public/products/<model>/. */
  src: string;
  /** Natural pixel size of the supplied file. Contain-fit images are never shown wider than this. */
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Short label for the thumbnail button. */
  label: string;
  /** "contain" keeps the whole machine visible (product shot); "cover" is for scene photography. */
  fit: "contain" | "cover";
};

export type SpecRow = { name: string; value: string; note?: string };
export type SpecGroup = { title: string; rows: SpecRow[] };

export type ProductContact = {
  email: string;
  subject: string;
  mailto: string;
  heading: string;
  body: string;
  cta: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type ProductSection = { id: string; label: string };

export type ProductData = {
  /** Page route, e.g. "/products/ce82a". */
  route: string;
  brand: string;
  brandNative: string;
  model: string;
  name: string;
  nativeName: string;
  category: string;
  /** The job in a few words, for the products list and the related-product block. */
  job: string;
  summary: string;
  /** How NXTektal relates to the machine — stated once, near the top, in plain terms. */
  relationship: string;
  heroStats: HeroStat[];
  images: ProductImage[];
  /** Which image the first screen shows (a key from `images`). */
  heroImageKey: string;
  featuresIntro: string;
  features: Feature[];
  featuresNote: string;
  galleryHeading: string;
  /** Optional note under the gallery, e.g. about low-resolution sources or markings. */
  galleryNote?: string;
  specGroups: SpecGroup[];
  specNote: string;
  contact: ProductContact;
  sections: readonly ProductSection[];
};

/** Shown in place of a photograph when the file has not been supplied yet. */
export const IMAGE_PENDING_TEXT = "Manufacturer photograph to be added";

/** Section anchors shared by every product page, in page order. */
export const PRODUCT_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "gallery", label: "Images" },
  { id: "specs", label: "Specifications" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * The company positioning sentence and site description — one source for
 * <title>/description metadata, the web-app manifest, the JSON-LD
 * organization record, and any share text. Tests hold this to the approved
 * wording so an older positioning sentence cannot drift back into one surface.
 */

/** The positioning sentence: the promise and the two parts that deliver it. "Insite" is the software's name (formerly "Site Brain"). */
export const POSITIONING_SENTENCE =
  "NXTektal makes Insite, the software that understands an outdoor site, and the robots that execute the work, starting with golf facilities.";

/**
 * Field status, as stated by the founders on 2026-11-02 (the same facts as
 * in the YC application). The site states these and nothing more: no site
 * names, counts beyond "five", results, or integration claims.
 */
export const FIELD_STATUS = {
  insite: "Insite is in use at five golf facilities.",
  firstGeneration: "The first-generation remote-controlled collection robot is used by course staff.",
  secondGeneration: "The second-generation robot is in field testing at a golf course in Shanghai.",
} as const;

/** The first job, stated as scope — handoff into existing equipment, nothing more. */
export const FIRST_JOB_SENTENCE =
  "First job: range-ball collection with handoff into the range’s existing washer.";

/** The homepage <title> and the share-card alt text, kept beside the sentence so they move together. */
export const SITE_TITLE = "NXTektal Systems | Automate Your Outdoor Operations";
export const SHARE_IMAGE_ALT =
  "NXTektal Systems — Insite understands your site; robots execute the work. Starting with golf facilities.";

/** Full site description used for metadata, share text, and JSON-LD. */
export const SITE_DESCRIPTION = `${POSITIONING_SENTENCE} ${FIELD_STATUS.insite} ${FIRST_JOB_SENTENCE}`;

/** The founders, for the Organization structured data (the homepage no longer carries a founders section). */
export const FOUNDERS = [
  { name: "Matthew Huang", role: "Co-Founder & Chief Executive Officer" },
  { name: "Steven Guo", role: "Co-Founder & Chief Technology Officer" },
  { name: "Jason Chen", role: "Co-Founder & Chief Operating Officer" },
] as const;

/** Site identity used by the header, footer, contact links and JSON-LD. */
export const SITE = {
  brand: "NXTektal Systems",
  email: "founders@nxtektal.com",
  domain: "nxtektal.com",
} as const;

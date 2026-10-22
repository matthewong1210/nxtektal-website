/**
 * The company positioning sentence and site description — one source for
 * <title>/description metadata, the web-app manifest, the JSON-LD
 * organization record, and any share text. Tests hold this to the approved
 * wording so an older positioning sentence cannot drift back into one surface.
 */

/** The positioning sentence: the promise and the two parts that deliver it. "Insite" is the software's name (formerly "Site Brain"). */
export const POSITIONING_SENTENCE =
  "NXTektal is building Insite, the software that understands an outdoor site, and the robots that execute the work, starting with golf facilities.";

/** The first job, stated as scope — handoff into existing equipment, nothing more. */
export const FIRST_JOB_SENTENCE =
  "First job: range-ball collection with handoff into the range’s existing washer.";

/** Full site description used for metadata, share text, and JSON-LD. */
export const SITE_DESCRIPTION = `${POSITIONING_SENTENCE} ${FIRST_JOB_SENTENCE}`;

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

/**
 * The company positioning sentence and site description — one source for
 * <title>/description metadata, the web-app manifest, the JSON-LD
 * organization record, and any share text. Tests hold this to the approved
 * wording so an older positioning sentence cannot drift back into one surface.
 */

/** The positioning sentence. Work and value first; "Site Brain" is introduced later on the page. */
export const POSITIONING_SENTENCE =
  "NXTektal is building robots and the operating system behind them to carry out outdoor work, starting with golf facilities.";

/** The first job, stated as scope — handoff into existing equipment, nothing more. */
export const FIRST_JOB_SENTENCE =
  "First job: range-ball collection with handoff into the range’s existing washer.";

/** Full site description used for metadata, share text, and JSON-LD. */
export const SITE_DESCRIPTION = `${POSITIONING_SENTENCE} ${FIRST_JOB_SENTENCE}`;

/** Site identity used by the header, footer, contact links and JSON-LD. */
export const SITE = {
  brand: "NXTektal Systems",
  email: "founders@nxtektal.com",
  domain: "nxtektal.com",
} as const;

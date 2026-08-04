/**
 * Hero master-frame asset registry (PHASE_2B_VISUAL_BRIEF.md §1, §4.1).
 *
 * The hero visual is gated: until the approved Master Product Visual exists,
 * `ready` stays false and the hero renders the current interim photograph
 * unchanged. When the approved assets land in `public/visuals/phase2/hero/`,
 * fill in the paths below and flip `ready` — no markup changes required.
 */

export type HeroSource = {
  /** AVIF first, WebP fallback. Both are required for a ready master frame. */
  avif: string;
  webp: string;
  width: number;
  height: number;
};

export type HeroLoop = {
  webm: string;
  /** All-intra H.264 so the scroll driver can scrub it (Safari-safe). */
  mp4: string;
  /** Poster still — also the reduced-motion and load-failure frame. */
  poster: string;
};

export type HeroMasterFrame = {
  ready: boolean;
  desktop: HeroSource | null;
  mobile: HeroSource | null;
  loop: HeroLoop | null;
  alt: string;
  caption: string;
};

export const heroMasterFrame: HeroMasterFrame = {
  // Flip to true only after NXTektal approves the Master Product Visual.
  ready: false,
  // public/visuals/phase2/hero/master-frame.{avif,webp} — 2880×1620
  desktop: null,
  // public/visuals/phase2/hero/master-frame-mobile.{avif,webp} — 1125×1500
  mobile: null,
  // Motion version is a separate deliverable gated on storyboard approval.
  loop: null,
  alt: "Autonomous collection robot working on a driving range at dusk, with the range's washer and dispenser station nearby",
  caption: "Product development visualization",
};

/** Interim hero used until the master frame is approved. */
export const heroInterim = {
  src: "/robot/robot-front.jpg",
  alt: "NXTektal ball collection robot facing the camera on a driving range at dusk",
};

/**
 * A master frame counts as usable only when both responsive stills are
 * present, so a half-delivered asset set can never ship a broken hero.
 */
export function hasMasterFrame(frame: HeroMasterFrame = heroMasterFrame): boolean {
  return frame.ready && frame.desktop !== null && frame.mobile !== null;
}

/**
 * Central visual-asset registry.
 *
 * Every media slot on the homepage reads its paths and metadata from here:
 * register the files, flip the slot's readiness, and the mounted component
 * renders them — no markup change. Nothing in this file may imply assets
 * exist before they do, and every concept or simulation asset carries the
 * label the page shows next to it.
 *
 * Since the 2026-10-22 homepage, two slots are live: the facility film
 * (the main visual of the golf block) and the Insite system screen (the
 * simulator poster). The retired workflow, handoff, build-evidence and
 * expansion slots are gone with their sections; their files stay under
 * public/visuals/phase2/ for reuse (see README).
 */

// -----------------------------------------------------------------------
// 1 · Facility film (components/manifesto/FacilityFilm.tsx · #golf)
// -----------------------------------------------------------------------
export type HeroSource = {
  /** AVIF first, WebP fallback. Both are required for a ready master frame. */
  avif: string;
  webp: string;
  width: number;
  height: number;
};

export type HeroLoop = {
  webm: string;
  /** 4K HEVC fallback for desktop Safari. */
  mp4: string;
  /** Lightweight 720p H.264 for mobile Safari and other narrow viewports. */
  mobileMp4: string;
  /** Poster still — also the reduced-motion and load-failure frame. */
  poster: string;
};

export type HeroMasterFrame = {
  ready: boolean;
  desktop: HeroSource | null;
  mobile: HeroSource | null;
  loop: HeroLoop | null;
  alt: string;
};

export const heroMasterFrame: HeroMasterFrame = {
  // Film stills (Phase 2G v2): both derived from the 2026-08-11 hero film
  // hand-off (4K/120fps) so poster and film are one continuous visual.
  // The desktop still IS the loop's first frame — the fade from poster to
  // video is invisible. Mobile is a 3:4 recomposition of the same aerial
  // centred on the Insite scan beam; the framed film uses it below 760px.
  // It was cut from the master frame at x = 960 (43.2% of the horizontal
  // slack); app/globals.css aligns the mobile loop with the same
  // object-position below 760px — re-export both or neither.
  ready: true,
  desktop: {
    avif: "/visuals/phase2/hero/master-frame.avif",
    webp: "/visuals/phase2/hero/master-frame.webp",
    width: 3840,
    height: 2160,
  },
  mobile: {
    avif: "/visuals/phase2/hero/master-frame-mobile.avif",
    webp: "/visuals/phase2/hero/master-frame-mobile.webp",
    width: 1620,
    height: 2160,
  },
  // Facility film (Phase 2G v3): trimmed re-encode of the NXTektal hero
  // film supplied 2026-08-11 (concept visualization — dawn facility aerial
  // with the Insite scan, bunker care, the collection robot sweeping balls,
  // a robot-mounted-arm handoff concept — one transfer option, the
  // mechanism is under development — turf robot, coordination routes).
  // Logo intro/outro and closing watermark are cut (source 1.5s–14.8s) and
  // the tail self-crossfades into the head for a seamless ~12.9s ambient
  // loop. Native 3840×2160@30, no audio track; VP9 WebM first, HEVC (hvc1)
  // MP4 for Safari. Narrow viewports select a separate 720p H.264 encode of
  // the same loop. Reduced-motion and failure paths keep the still.
  loop: {
    webm: "/visuals/phase2/hero/hero-loop.webm",
    mp4: "/visuals/phase2/hero/hero-loop.mp4",
    mobileMp4: "/visuals/phase2/hero/hero-loop-mobile.mp4",
    poster: "/visuals/phase2/hero/master-frame.webp",
  },
  alt: "Concept visualization: aerial view of a golf facility at dawn with NXTektal’s Insite scanning the grounds. The film also shows one transfer-mechanism option that is under development, and machines planned for later.",
};

/** Interim photograph — retained as the documented fallback if the film
 * ever needs to be pulled (swap into FacilityFilm). */
export const heroInterim = {
  src: "/robot/robot-front.jpg",
  alt: "NXTektal ball collection robot facing the camera on a driving range at dusk",
};

/**
 * A master frame counts as usable only when both responsive stills are
 * present, so a half-delivered asset set can never ship a broken film.
 */
export function hasMasterFrame(frame: HeroMasterFrame = heroMasterFrame): boolean {
  return frame.ready && frame.desktop !== null && frame.mobile !== null;
}

/** A responsive still: AVIF preferred, WebP fallback, optional mobile recomposition. */
export type StillSource = {
  avif: string;
  webp: string;
  width: number;
  height: number;
  /** Mobile recomposition (used ≤760px). Omit to reuse the desktop crop. */
  mobile?: { avif: string; webp: string; width: number; height: number };
  alt: string;
  /** Optional per-asset caption override (e.g. a simulation qualification). */
  caption?: string;
};

// -----------------------------------------------------------------------
// 2 · Insite system screen (#insite) — the Range Operations Simulator
// ~13.6s chrome-cropped loop (1400×1000, 30fps, muted) + desktop poster
// (00:54 frame: assign collection · R1, Z2) + 1080×1350 mobile
// recomposition (live state + dispatcher decision over final summary).
// The homepage shows the poster as the one system screen; the loop stays
// registered for a page that wants it. Gate: `ready` stays true only while
// derivatives + posters exist and 1440px / 375px / reduced-motion QA holds.
// -----------------------------------------------------------------------
export type AgentSimulatorDemo = {
  ready: boolean;
  loop: { webm: string; mp4: string };
  posterDesktop: { avif: string; webp: string; width: number; height: number };
  posterMobile: { avif: string; webp: string; width: number; height: number };
  alt: string;
  truthLabel: string;
};

export const agentSimulatorDemo: AgentSimulatorDemo = {
  ready: true,
  loop: {
    webm: "/visuals/phase2/simulator/range-ops-simulator-loop.webm",
    mp4: "/visuals/phase2/simulator/range-ops-simulator-loop.mp4",
  },
  posterDesktop: {
    avif: "/visuals/phase2/simulator/range-ops-simulator-poster-desktop.avif",
    webp: "/visuals/phase2/simulator/range-ops-simulator-poster-desktop.webp",
    width: 1400,
    height: 1000,
  },
  posterMobile: {
    avif: "/visuals/phase2/simulator/range-ops-simulator-poster-mobile.avif",
    webp: "/visuals/phase2/simulator/range-ops-simulator-poster-mobile.webp",
    width: 1080,
    height: 1350,
  },
  alt: "Insite in the NXTektal Range Operations Simulator: robot states, a dispatch decision, facility metrics, and operating results for a simulated demand-spike scenario.",
  truthLabel: "Simulation results — not live facility data.",
};

// -----------------------------------------------------------------------
// OG / social image
// Stable public path: replacing the file at public/og-image.jpg (1200×630)
// updates every share card — app/layout.tsx references the path, not the
// file contents. The card uses real prototype photography
// (public/robot/robot-front.jpg) with the homepage headline set over it;
// re-export over this file whenever the headline changes. No code change
// required.
// -----------------------------------------------------------------------
export const OG_IMAGE_PATH = "/og-image.jpg";

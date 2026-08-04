/**
 * Phase 2 central visual-asset registry
 * (PHASE_2B_SPRINT3_ASSET_INTEGRATION_PLAN.md).
 *
 * One file to fill when production assets arrive. Every slot follows the
 * same activation pattern proven by the hero pipeline: register paths +
 * metadata here, flip the slot's readiness, and the already-mounted gated
 * component starts rendering — no component or markup changes.
 *
 * Nothing in this file may imply assets exist before they do: every slot
 * ships `null`/empty and the site renders exactly as today until real
 * deliverables land in public/visuals/phase2/.
 */

// -----------------------------------------------------------------------
// 1 · Hero Master Visual (EarthExperience ground stage · GroundTransition)
// Consolidated here from lib/heroAssets.ts (Phase 2C prep) — this registry
// is the single authoritative metadata source for every visual slot.
// Gate: `ready` stays false until NXTektal approves the Master Product
// Visual; the interim photograph renders unchanged until then.
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


/** A responsive still: AVIF preferred, WebP fallback, optional mobile recomposition. */
export type StillSource = {
  avif: string;
  webp: string;
  width: number;
  height: number;
  /** Mobile recomposition (used ≤760px). Omit to reuse the desktop crop. */
  mobile?: { avif: string; webp: string; width: number; height: number };
  alt: string;
};

/** An ambient loop: WebM preferred, MP4 fallback, poster is mandatory. */
export type LoopSource = {
  webm: string;
  mp4: string;
  poster: string;
  alt: string;
};

// -----------------------------------------------------------------------
// 2 · Closed-Loop Workflow (#first-workflow · WorkflowStory MediaFrame)
// Contract: 1600×900 (16:9) per step, AVIF+WebP.
// Paths: public/visuals/phase2/workflow/step-01-monitor.{avif,webp} … step-08-verify.{avif,webp}
// When present, the workflow visual shows the active step's still and the
// robot-field loop becomes the fallback. Partial sets are allowed: steps
// without a still fall back to the loop.
// -----------------------------------------------------------------------
export const workflowStepStills: (StillSource | null)[] = [
  null, // 01 MONITOR    → step-01-monitor
  null, // 02 PRIORITIZE → step-02-prioritize
  null, // 03 DISPATCH   → step-03-dispatch
  null, // 04 COLLECT    → step-04-collect
  null, // 05 RETURN     → step-05-return
  null, // 06 HANDOFF    → step-06-handoff
  null, // 07 WASH & DISPENSE → step-07-wash-dispense
  null, // 08 VERIFY     → step-08-verify
];

// -----------------------------------------------------------------------
// 3 · Modular Handoff production visuals (.integration-block · HandoffSequence)
// Contract: 4:3 per panel — inline SVG preferred; stills 1200×900 AVIF+WebP.
// Paths: public/visuals/phase2/handoff/seq-01-dock.* seq-02-transfer.* seq-03-verify.*
// When a panel's production visual is registered it replaces that panel's
// coded schematic glyph in place; unregistered panels keep the schematic.
// -----------------------------------------------------------------------
export const handoffPanelStills: (StillSource | null)[] = [
  null, // 01 DOCK
  null, // 02 TRANSFER
  null, // 03 VERIFY & RELEASE
];

// -----------------------------------------------------------------------
// 4 · Build Evidence gallery (adjacent to the Development Status band)
// REAL unretouched photography only — no renders in this slot. The caption
// slot carries an HTML date/location line (not a visualization label).
// Paths: public/visuals/phase2/build-evidence/build-XX.{avif,webp}
// The gallery component is mounted but renders nothing until entries exist
// AND NXTektal approves the strip (`buildEvidenceApproved`).
// -----------------------------------------------------------------------
export type EvidencePhoto = StillSource & {
  /** HTML date/location line, e.g. "Prototype bench test · June 2026". */
  line: string;
};

export const buildEvidenceApproved = false;
export const buildEvidencePhotos: EvidencePhoto[] = [
  // Candidate real photos already in the repo (public/robot/*.jpg, 1536×1024)
  // move here once NXTektal approves the strip and confirms date/location lines.
];

// -----------------------------------------------------------------------
// 5 · Expansion facility map (#expansion, above .roadmap-stages)
// Contract: inline SVG preferred (CSS-var colors, HTML/SVG labels);
// fallback export 1600×1000 AVIF+WebP. Caption: "Platform direction".
// Paths: public/visuals/phase2/expansion/facility-map.{avif,webp}
// The still activates the slot via this registry. The preferred inline-SVG
// map is code by nature and mounts by editing ExpansionMap.tsx directly —
// that edit is the documented exception to the registry-only rule.
// The roadmap cards remain the section's content and permanent fallback.
// -----------------------------------------------------------------------
export const expansionMap: { still: StillSource | null } = {
  still: null,
};

// -----------------------------------------------------------------------
// OG / social image
// Stable public path: replacing the file at public/og-image.jpg (1200×630)
// updates every share card — app/layout.tsx references the path, not the
// file contents. After the hero master frame is approved, export its
// 1200×630 crop over this file; no code change required.
// -----------------------------------------------------------------------
export const OG_IMAGE_PATH = "/og-image.jpg";

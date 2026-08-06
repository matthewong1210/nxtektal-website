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
// 1 · Hero Master Visual (ProductHero full-bleed stage — Phase 2E)
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
  // Master Product Visual supplied by NXTektal 2026-08-05 (tracked-collector
  // concept render, towed gang-roller picker — matches the no-arm
  // architecture). Registered at the render's native resolution; the 2880
  // re-export can replace these files in place when it exists.
  ready: true,
  desktop: {
    avif: "/visuals/phase2/hero/master-frame.avif",
    webp: "/visuals/phase2/hero/master-frame.webp",
    width: 1672,
    height: 940,
  },
  mobile: {
    avif: "/visuals/phase2/hero/master-frame-mobile.avif",
    webp: "/visuals/phase2/hero/master-frame-mobile.webp",
    width: 706,
    height: 940,
  },
  // Motion version is a separate deliverable gated on storyboard approval.
  loop: null,
  alt: "NXTektal tracked collection robot towing a gang-roller ball picker across a sunlit driving range scattered with golf balls",
  caption: "Product development visualization",
};

/** Interim hero photograph — retained as the documented fallback if the
 * master frame ever needs to be pulled (swap into ProductHero). */
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
  /** Optional per-asset caption override (e.g. a simulation qualification). */
  caption?: string;
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
const SIMULATOR_STILL_QUALIFICATION =
  "Range Operations Simulator — simulation results, not live facility data.";

export const workflowStepStills: (StillSource | null)[] = [
  {
    // 01 MONITOR — simulator replay, early operating day
    avif: "/visuals/phase2/workflow/01-monitor-simulator.avif",
    webp: "/visuals/phase2/workflow/01-monitor-simulator.webp",
    width: 1600,
    height: 900,
    alt: "Range Operations Simulator monitoring ball availability and demand across range zones early in the operating day",
    caption: SIMULATOR_STILL_QUALIFICATION,
  },
  {
    // 02 PRIORITIZE — simulator replay, demand rising
    avif: "/visuals/phase2/workflow/02-prioritize-simulator.avif",
    webp: "/visuals/phase2/workflow/02-prioritize-simulator.webp",
    width: 1600,
    height: 900,
    alt: "Range Operations Simulator weighing zone demand and robot availability before dispatching collection",
    caption: SIMULATOR_STILL_QUALIFICATION,
  },
  {
    // 03 DISPATCH — dispatcher decision: assign collection · R1, Z2
    avif: "/visuals/phase2/workflow/03-dispatch-simulator.avif",
    webp: "/visuals/phase2/workflow/03-dispatch-simulator.webp",
    width: 1600,
    height: 900,
    alt: "Range Operations Simulator dispatcher decision assigning collection of zone Z2 to robot R1",
    caption: SIMULATOR_STILL_QUALIFICATION,
  },
  null, // 04 COLLECT — physical workflow imagery only (robot-field loop)
  null, // 05 RETURN — physical workflow imagery only
  null, // 06 HANDOFF — physical workflow imagery only
  null, // 07 WASH & DISPENSE — physical workflow imagery only
  {
    // 08 VERIFY — simulator final summary
    avif: "/visuals/phase2/workflow/08-verify-simulator.avif",
    webp: "/visuals/phase2/workflow/08-verify-simulator.webp",
    width: 1600,
    height: 900,
    alt: "Range Operations Simulator final summary reporting service availability, balls processed, interventions, energy use, utilization, and estimated operating cost",
    caption: SIMULATOR_STILL_QUALIFICATION,
  },
];

/**
 * A per-step workflow loop: ambient WebM/MP4 with a StillSource that serves
 * as desktop poster, mobile/sequential media, and reduced-motion frame.
 */
export type WorkflowStepLoop = {
  still: StillSource;
  webm: string;
  mp4: string;
};

// Physical-loop media (Phase 2D Sprint 2B). Product concept renders from the
// approved tracked-collector + transfer-robot sources — same geometry as the
// hero master frame and the Transfer Robot CAD (STEP v1). COLLECT (index 3)
// stays on the real robot-field footage; RETURN/HANDOFF/WASH each get their
// own identity so the four physical stages are visually distinct.
export const workflowStepLoops: (WorkflowStepLoop | null)[] = [
  null, // 01 MONITOR — simulator still
  null, // 02 PRIORITIZE — simulator still
  null, // 03 DISPATCH — simulator still
  null, // 04 COLLECT — real robot-field footage (RobotVideo, legacy identity)
  {
    // 05 RETURN — loaded rig traversing back across the range.
    // Documented limitation: the handoff destination is not visible in frame.
    still: {
      avif: "/visuals/phase2/workflow/05-return-poster.avif",
      webp: "/visuals/phase2/workflow/05-return-poster.webp",
      width: 1280,
      height: 720,
      alt: "NXTektal tracked collector towing the gang-roller picker with a loaded ball basket back across the range",
    },
    webm: "/visuals/phase2/workflow/05-return-loop.webm",
    mp4: "/visuals/phase2/workflow/05-return-loop.mp4",
  },
  {
    // 06 HANDOFF — transfer robot aligning with and lifting the collector's
    // basket at the processing area (payload ↔ equipment relationship).
    still: {
      avif: "/visuals/phase2/workflow/06-handoff-poster.avif",
      webp: "/visuals/phase2/workflow/06-handoff-poster.webp",
      width: 1280,
      height: 720,
      alt: "NXTektal transfer robot gripping and lifting the loaded ball basket from the collection rig at the handoff point",
    },
    webm: "/visuals/phase2/workflow/06-handoff-loop.webm",
    mp4: "/visuals/phase2/workflow/06-handoff-loop.mp4",
  },
  {
    // 07 WASH & DISPENSE — basket tipping balls into the existing washer
    // intake; facility equipment (trough, buckets, conveyor) visible.
    still: {
      avif: "/visuals/phase2/workflow/07-wash-dispense-poster.avif",
      webp: "/visuals/phase2/workflow/07-wash-dispense-poster.webp",
      width: 1280,
      height: 720,
      alt: "Golf balls pouring from the transfer robot's basket into the facility's existing washer intake trough",
    },
    webm: "/visuals/phase2/workflow/07-wash-dispense-loop.webm",
    mp4: "/visuals/phase2/workflow/07-wash-dispense-loop.mp4",
  },
  null, // 08 VERIFY — simulator still
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
// 6 · Range Operations Simulator demo (#intelligence · SimulatorProof)
// ~13.6s chrome-cropped loop (1400×1000, 30fps, muted) + desktop poster
// (00:54 frame: assign collection · R1, Z2) + 1080×1350 mobile
// recomposition (live state + dispatcher decision over final summary).
// Gate: flip `ready` only after derivatives + posters exist and 1440px /
// 375px / reduced-motion QA passes. With ready=false the intelligence
// chapter renders exactly as before.
// -----------------------------------------------------------------------
export type AgentSimulatorDemo = {
  ready: boolean;
  loop: { webm: string; mp4: string };
  posterDesktop: { avif: string; webp: string; width: number; height: number };
  posterMobile: { avif: string; webp: string; width: number; height: number };
  alt: string;
  caption: string;
  truthLabel: string;
};

export const agentSimulatorDemo: AgentSimulatorDemo = {
  // Flipped after Sprint 1 QA: derivatives + posters shipped, 1440px and
  // 375px QA passed, reduced-motion verified (see PR).
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
  alt: "Replay of the NXTektal Range Operations Simulator showing multiple robot states, dispatch decisions, facility metrics, and final operating results.",
  caption: "Range Operations Simulator — working development environment. Demand-spike scenario shown.",
  truthLabel: "Simulation results — not live facility data.",
};

// Build-evidence candidate (do NOT activate — double gate stays):
// title "Range Operations Simulator" · status "Working development
// environment" · caption "Demand-spike replay used to evaluate dispatch
// behavior, fleet activity, stockouts, interventions, and operating
// outcomes." · image = the simulator desktop poster above. Software
// development evidence — never a customer deployment, live facility
// operation, or validated customer result.

// -----------------------------------------------------------------------
// OG / social image
// Stable public path: replacing the file at public/og-image.jpg (1200×630)
// updates every share card — app/layout.tsx references the path, not the
// file contents. After the hero master frame is approved, export its
// 1200×630 crop over this file; no code change required.
// -----------------------------------------------------------------------
export const OG_IMAGE_PATH = "/og-image.jpg";

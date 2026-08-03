# Phase 2B · Sprint 2 — Implementation Plan & Record

Status date: 2026-08-01 · Branch: `feature/phase2b-sprint2-implementation`
Spec source: `PHASE_2B_VISUAL_BRIEF.md` (approved) · Contracts: `PHASE_2_VISUAL_ASSET_PLAN.md`

Sprint 2 implements the three highest-priority product experiences **without
producing any final imagery or video**. Everything shipped here is coded
HTML/CSS/SVG; production assets drop into the prepared slots later.

## 1 · Operations Intelligence Dashboard v1

**File:** `components/manifesto/IntelligenceSection.tsx` (+ `.dash-*` styles in `app/globals.css`)

Decision-support-first hierarchy (brief §3):

- **Facility status strip** — top-level health line above all modules.
- **Row 1 — decisions**: Recommendation (double-width card with evidence line
  and non-functional Approve/Defer affordances), Pending approvals, Alerts.
  Raw telemetry moved BELOW the decision row.
- **Row 2 — telemetry**: Ball inventory (gauge), Active mission, Robot
  status, Equipment status, Daily operations summary.
- **Left rail** (Overview / Missions / Equipment / Reports) — product-surface
  concept, `aria-hidden`, non-functional by design.
- **Module tags**: every module carries `IN DEVELOPMENT` (lime pill) or
  `CONCEPT` (blue pill) per the brief's 9-module map; legend line under the
  frame: "Modules marked CONCEPT illustrate the platform direction and are
  not current functionality."
- Titlebar label preserved verbatim: **"Illustrative product concept — not
  live facility data."**

All nine brief modules are present; the old standalone "Manual interventions"
card's content lives in Equipment status + Daily summary (it was not one of
the nine required modules).

## 2 · Hero MediaFrame production integration

**Files:** `lib/heroAssets.ts` (new), `components/earth/GroundTransition.tsx`

- `heroAssets.ts` is the single registry for the master frame: desktop
  AVIF/WebP (2880×1620), mobile AVIF/WebP (1125×1500, 3:4), future WebM/MP4
  loop + poster, canonical alt text and caption. `ready` flag defaults to
  **false**.
- `GroundTransition` now branches on `hasMasterFrame()`:
  - **false (current state)** — renders the existing interim robot photo
    exactly as before. The live site is pixel-identical; the hero hard gate
    holds.
  - **true (after approval)** — responsive `<picture>` (AVIF→WebP, 760px
    media switch), or the WebM→MP4 loop with poster once the motion
    deliverable exists; plus the operating-intelligence overlay (two HTML
    chips + caption, density-capped per brief §1) rendered outside the image.
- Guard: a frame is only "ready" when BOTH desktop and mobile stills exist —
  a half-delivered asset set can never ship.

Activation procedure (when the approved master frame lands): drop files into
`public/visuals/phase2/hero/`, fill the paths in `lib/heroAssets.ts`, flip
`ready: true`. No component or markup changes.

## 3 · Modular Ball Handoff — three-panel structure

**File:** `components/manifesto/HandoffSequence.tsx` (new), mounted in the
equipment-integration section ABOVE the before/after flow diagram (its own
`MediaFrame`, per brief §4.2).

- Three panels: **01 DOCK → 02 TRANSFER → 03 VERIFY & RELEASE**, each with a
  coded schematic SVG placeholder (4:3, CSS-var colors): blue linework for
  NXTektal elements, neutral zone labeled EXISTING EQUIPMENT, per-panel
  accents (approach vector + alignment funnel / dashed transfer path with
  balls / sensor + confirmation tick + release vector).
- Every glyph is `role="img"` with the contract alt text; step labels are
  HTML beside each panel; panels carry a `CONCEPT SCHEMATIC` corner tag so
  the placeholders cannot be mistaken for engineering output.
- Caption: **"Engineering concept visualization"** via `MediaFrame`.
- Desktop 3-up row → single column ≤1120px.

Final illustrations replace each `<HandoffGlyph>` inside the same panel
markup — labels, alt text, and caption do not move.

## Explicitly not done (per sprint constraints)

No generated imagery · no video · no production-hardware implication (CONCEPT
SCHEMATIC tags + schematic finish) · no new technical claims (all copy reuses
approved strings).

## Remaining asset requirements (unchanged from Sprint 1 brief)

1. Hero master frame (2880×1620 + 1125×1500 recomposition) — approval gate.
2. Handoff engineering references (hopper CAD, washer intake configs,
   docking notes) → final three-panel illustrations.
3. Optional dashboard design-tool pass (coded v1 is the primary + fallback).
4. Later: hero motion loop (storyboard gate), workflow per-step assets,
   expansion map SVG, build-evidence photos.

## Verification record

- `npm run lint` (tsc) — pass
- `npx tsc --noEmit` — pass
- `npm test` — 17/17 pass
- `npm run build` — pass
- Visual QA: desktop 1440×900 + mobile 375×812 screenshots of all three
  experiences; hero verified pixel-identical to pre-sprint state.

## Sprint 3 recommendation

1. **Hero master frame production** (photo composite session with the real
   robot + range plate, per brief §1 composition) — unblocks the site's
   biggest visual gap and the OG refresh.
2. **Handoff final illustrations** into the shipped three-panel structure.
3. **Workflow per-step stills** (8 frames into the existing WorkflowStory
   MediaFrame).
4. Expansion facility-map SVG.
5. Build-evidence strip once real photos arrive.

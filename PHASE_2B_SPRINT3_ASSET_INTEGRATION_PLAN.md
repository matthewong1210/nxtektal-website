# Phase 2B · Sprint 3 — Asset Integration Preparation

Status date: 2026-08-01 · Branch: `feature/phase2b-sprint3-asset-integration`

Sprint 3 makes every Phase 2 visual slot **registry-activated**: production
assets are integrated by editing one metadata file and dropping files into
`public/visuals/phase2/` — zero component or markup changes. No visuals were
generated; the rendered site is pixel-identical to Sprint 2.

## Central registry

**`lib/visualAssets.ts`** — the single integration point. Typed entries per
slot (paths, dimensions, alt text, mobile recompositions, approval flags).
`components/media/ResponsiveMedia.tsx` renders any registry entry:
`ResponsiveStill` (AVIF→WebP `<picture>`, optional ≤760px mobile source,
lazy + async decode) and `ResponsiveLoop` (WebM→MP4, mandatory poster,
reduced-motion-safe). Upgrading a slot from still to loop is a prop change
from the registry — task 7 (video replacement without component changes) is
structural, not procedural.

## Slot status

| # | Slot | Mount point | Activation | Renders today |
|---|---|---|---|---|
| 1 | Hero Master Visual | `GroundTransition` (hero ground stage) | `heroMasterFrame` in `lib/visualAssets.ts` → paths + `ready: true` (consolidated from `lib/heroAssets.ts` in Phase 2C prep) | Interim robot photo (unchanged, gate holds) |
| 2 | Handoff production panels | `HandoffSequence` per-panel | `handoffPanelStills[i]` | Coded schematic glyphs + CONCEPT SCHEMATIC tags |
| 3 | Workflow per-step stills | `WorkflowStory` visual (active-step driven) | `workflowStepStills[i]` (partial sets OK) | robot-field loop |
| 4 | Build Evidence gallery | `<BuildEvidenceGallery/>` in Development Status band | register photos + `buildEvidenceApproved: true` | **Nothing** (dual gate: photos + approval) |
| 5 | Expansion map | `<ExpansionMap/>` above roadmap stages | `expansionMap.still` (the preferred inline-SVG map mounts by editing `ExpansionMap.tsx` — documented exception) | **Nothing** (roadmap cards remain the content) |
| — | OG image | `public/og-image.jpg` (path referenced by `app/layout.tsx`) | overwrite file with 1200×630 master-frame crop | Current OG image |

Exact asset paths per slot are documented inline in `lib/visualAssets.ts`
(they match `PHASE_2_VISUAL_ASSET_PLAN.md` contracts).

## Accessibility & captions

- Every registry type REQUIRES `alt` — an asset cannot be registered without
  it. Captions come from the approved `CAPTIONS` constants (visualization
  slots) or the photo's HTML date/location `line` (real-photo exception).
- Workflow active-step stills inherit the existing MediaFrame caption;
  the full step list stays in the DOM for no-JS/AT users regardless.

## Desktop/mobile switching

`StillSource.mobile` adds `≤760px` AVIF/WebP sources inside the same
`<picture>` — used by the hero (3:4 recomposition) and available to every
slot. Verified against the existing 760px breakpoint system.

## Integration checklist (per incoming asset)

1. Export to contract dimensions/formats → drop into the slot's
   `public/visuals/phase2/<slot>/` directory.
2. Register in `lib/visualAssets.ts` (paths, w/h, alt; mobile variant if the
   contract defines one; flip the slot's readiness/approval flag).
3. `npm run build` + browser QA at 1440 and 375.
4. Confirm the caption/label rendered next to the media is correct for the
   asset's kind (visualization label vs real-photo date line).
5. For the hero only: after the master frame ships, export its 1200×630 crop
   over `public/og-image.jpg`.

## Required external deliverables (unchanged)

1. Hero master frame — 2880×1620 + 1125×1500 recomposition (approval gate).
2. Handoff panel illustrations — 3 × 4:3 (SVG preferred).
3. Workflow step stills — up to 8 × 1600×900 (partial delivery fine).
4. Real build photos + date/location lines + strip approval.
5. Expansion map SVG (or 1600×1000 still as interim).
6. Later: hero loop (WebM+MP4+poster, storyboard gate).

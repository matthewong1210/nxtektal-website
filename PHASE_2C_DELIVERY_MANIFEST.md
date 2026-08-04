# Phase 2C · Delivery Manifest

Status date: 2026-08-04 · Baseline: tag `phase-2b-visual-slots-ready`
Registry (single metadata source): `lib/visualAssets.ts`

This manifest enumerates every production visual Phase 2C delivers into the
Phase 2B slot infrastructure. Each record is the acceptance contract for one
deliverable. Integration is registry-only: drop files at the expected path,
register metadata, flip the slot's gate. **All readiness/approval gates are
`false` at this baseline and stay false until NXTektal approves each asset.**

Truthfulness labels (rendered as HTML next to the media, never in the image):

- **PDV** — "Product development visualization"
- **ECV** — "Engineering concept visualization"
- **REAL** — real unretouched photograph; caption slot carries an HTML
  date/location line instead of a visualization label

---

## 1 · Hero desktop master

| Field | Value |
|---|---|
| Expected path | `public/visuals/phase2/hero/master-frame.avif` + `.webp` |
| Dimensions | 2880×1620 (16:9) |
| Format | AVIF + WebP (JPG only for the OG/social crop) |
| Alt text | "Autonomous collection robot working on a driving range at dusk, with the range's washer and dispenser station nearby" |
| Caption | PDV |
| Truthfulness label | PDV — approved master composite/render per PHASE_2B_VISUAL_BRIEF.md §1 |
| Approval status | **Not approved** (`heroMasterFrame.ready: false`) |
| Registry field | `heroMasterFrame.desktop` in `lib/visualAssets.ts` |
| Desktop / mobile usage | Desktop: full-bleed hero ground stage. Mobile: not used (mobile master below) |

## 2 · Hero mobile master

| Field | Value |
|---|---|
| Expected path | `public/visuals/phase2/hero/master-frame-mobile.avif` + `.webp` |
| Dimensions | 1125×1500 (3:4 recomposition — not a crop) |
| Format | AVIF + WebP |
| Alt text | Same as desktop master (same scene, recomposed) |
| Caption | PDV |
| Truthfulness label | PDV |
| Approval status | **Not approved** (ships with the desktop master; `hasMasterFrame()` requires BOTH) |
| Registry field | `heroMasterFrame.mobile` in `lib/visualAssets.ts` |
| Desktop / mobile usage | Mobile ≤760px only, full-bleed behind stacked copy |

## 3 · Handoff Approach panel (DOCK)

| Field | Value |
|---|---|
| Expected path | `public/visuals/phase2/handoff/seq-01-dock.svg` (preferred) or `.avif` + `.webp` |
| Dimensions | 4:3 viewBox; raster 1200×900 |
| Format | Inline-style SVG preferred; AVIF + WebP fallback |
| Alt text | "Robot docking at the modular handoff unit (concept)" |
| Caption | ECV (frame-level, already rendered by HandoffSequence) |
| Truthfulness label | ECV — schematic finish, no implied production design |
| Approval status | **Not delivered** (`handoffPanelStills[0]: null`; coded schematic renders meanwhile) |
| Registry field | `handoffPanelStills[0]` in `lib/visualAssets.ts` |
| Desktop / mobile usage | Desktop: left panel of 3-up row. Mobile: first of vertical stack |

## 4 · Handoff Transfer panel

| Field | Value |
|---|---|
| Expected path | `public/visuals/phase2/handoff/seq-02-transfer.svg` or `.avif` + `.webp` |
| Dimensions | 4:3 viewBox; raster 1200×900 |
| Format | SVG preferred; AVIF + WebP fallback |
| Alt text | "Balls transferring from the robot's hopper into the existing washer intake (concept)" |
| Caption | ECV |
| Truthfulness label | ECV — existing equipment drawn as separated neutral zone |
| Approval status | **Not delivered** (`handoffPanelStills[1]: null`) |
| Registry field | `handoffPanelStills[1]` in `lib/visualAssets.ts` |
| Desktop / mobile usage | Desktop: center panel. Mobile: second of stack |

## 5 · Handoff Verify panel (VERIFY & RELEASE)

| Field | Value |
|---|---|
| Expected path | `public/visuals/phase2/handoff/seq-03-verify.svg` or `.avif` + `.webp` |
| Dimensions | 4:3 viewBox; raster 1200×900 |
| Format | SVG preferred; AVIF + WebP fallback |
| Alt text | "Sensor confirming completed transfer (concept)" |
| Caption | ECV |
| Truthfulness label | ECV |
| Approval status | **Not delivered** (`handoffPanelStills[2]: null`) |
| Registry field | `handoffPanelStills[2]` in `lib/visualAssets.ts` |
| Desktop / mobile usage | Desktop: right panel. Mobile: third of stack |

## 6 · Workflow storyboard frames (8)

| Field | Value |
|---|---|
| Expected paths | `public/visuals/phase2/workflow/step-01-monitor.avif`+`.webp` · `step-02-prioritize` · `step-03-dispatch` · `step-04-collect` · `step-05-return` · `step-06-handoff` · `step-07-wash-dispense` · `step-08-verify` (same `.avif`+`.webp` pairs) |
| Dimensions | 1600×900 (16:9) each |
| Format | AVIF + WebP |
| Alt text | Per step, descriptive, e.g. step-04 "Robot collecting range balls in a priority zone (visualization)" — final strings delivered with the frames |
| Caption | PDV (frame-level, already rendered by WorkflowStory) |
| Truthfulness label | PDV |
| Approval status | **Not delivered** (`workflowStepStills[0..7]: null`; partial delivery supported — robot-field loop remains the fallback per step) |
| Registry field | `workflowStepStills[0..7]` in `lib/visualAssets.ts` |
| Desktop / mobile usage | Desktop: sticky visual, active-step driven. Mobile: static visual above the step list (reduced-motion shows a static complete state) |

## 7 · Real build evidence candidates

| Field | Value |
|---|---|
| Expected paths | `public/visuals/phase2/build-evidence/build-01.avif`+`.webp` … `build-NN` (re-exports of real photos; existing candidates: `public/robot/robot-{front,angle,hopper,roller}.jpg`, 1536×1024) |
| Dimensions | 1536×1024 (3:2) |
| Format | AVIF + WebP (JPG sources retained) |
| Alt text | Descriptive per photo, e.g. "Collection robot prototype, front view with sensor mast" |
| Caption | REAL — HTML date/location line per photo (e.g. "Prototype bench test · June 2026"), supplied by NXTektal |
| Truthfulness label | REAL — unretouched photography only; renders prohibited in this slot |
| Approval status | **Not approved** — dual gate: photos registered AND `buildEvidenceApproved: true` |
| Registry field | `buildEvidencePhotos[]` + `buildEvidenceApproved` in `lib/visualAssets.ts` |
| Desktop / mobile usage | Desktop: 4-col grid in the Development Status band. Mobile: 1-col stack (2-col ≤1120px) |

---

## Gate summary at this baseline

| Gate | Value |
|---|---|
| `heroMasterFrame.ready` | `false` |
| `heroMasterFrame.desktop / mobile / loop` | `null / null / null` |
| `workflowStepStills[0..7]` | all `null` |
| `handoffPanelStills[0..2]` | all `null` |
| `buildEvidenceApproved` | `false` |
| `buildEvidencePhotos` | `[]` |
| `expansionMap.still` | `null` (expansion map is a Phase 2C stretch item — see PHASE_2_VISUAL_ASSET_PLAN.md contract 5) |

Out of scope for this manifest: hero motion loop (storyboard gate), expansion
map SVG (code-mounted by design), dashboard (coded HTML is the product form).

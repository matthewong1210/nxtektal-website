# Phase 2B · Sprint 1 — Visual Production Brief

Status date: 2026-08-01 · Branch: `feature/phase2b-sprint1-brief`
Depends on: Phase 2A infrastructure (`components/media/MediaFrame.tsx`,
`public/visuals/phase2/*`, `PHASE_2_VISUAL_ASSET_PLAN.md`)

This brief is the **production-ready specification** for the three
highest-impact visual product experiences. It defines composition, hierarchy,
required source material, and the exact integration contract for each. **No
final images or video are produced in this sprint** — this document is the
input to asset production and the acceptance checklist for reviewing it.

Non-negotiables carried from Phase 2A:

- The approved narrative structure and section order do not change.
- All in-visual text (labels, chips, callouts, captions) is **HTML or SVG
  rendered by the page** — never baked into raster images.
- Rendered/concept media carries one of the approved captions; only real
  unretouched photography may omit it.
- Reduced-motion users always receive a complete static state.
- Color roles: lime `#9af812` = CTA / healthy / complete; blue = eyebrows /
  system connectors / data; navy-charcoal darks; paper-white light chapters.

==================================================

## 1 · HERO SYSTEM VISUAL

### Purpose

Transform the Hero from "a robot image" into **a complete autonomous golf
facility operating system seen in one frame**. The frame must communicate:

> Facility + Robot + Existing equipment + Operating intelligence

It must NOT read as a standalone robot product shot. The robot is one working
part of a coordinated facility — never a centered studio hero object.

### Master frame concept — "the working facility at dusk"

One photographic/rendered master frame of a driving range in early dusk
(matches the brand's dark-navy identity and lets lime/blue overlays read):

- **Foreground, right third** — the collection robot mid-mission on the ball
  field, recognizable but at working scale (roughly 18–24% of frame width),
  motion direction pointing into the frame.
- **Midground, left-to-center** — the range building line with the existing
  washer/dispenser station visible and a handoff point adjacent: the
  "keep the equipment already on site" story in pixels.
- **Background** — tee line with bay lighting, facility depth, dusk sky
  occupying the upper ~35% for headline overlay.
- **No people prominently featured**; silhouette-level staff acceptable.

### Desktop composition (16:9)

```
┌────────────────────────────────────────────────────────┐
│ (sky / dusk gradient — headline overlay zone)          │
│ ┌ copy column ≤660px ┐                                 │
│ │ eyebrow            │           [status chip cluster] │
│ │ H1 (approved)      │        ↑ SVG connector lines    │
│ │ supporting para    │   [washer/dispenser station]    │
│ │ starting point     │            [robot, mid-mission] │
│ │ [CTA][CTA]         │                                 │
│ └────────────────────┘  caption (HTML, bottom-left)    │
└────────────────────────────────────────────────────────┘
```

- Copy column: existing approved copy, unchanged, max-width 660px, left third.
- **Safe zone A (copy)**: left 46% of frame must tolerate a 0.45–0.6 luminance
  gradient overlay without hiding meaningful content — keep sky/turf texture
  there, no critical subject.
- **Safe zone B (CTA)**: bottom 14% left half stays visually quiet.
- Subject weight lives in the right 54%.

### Mobile composition (3:4 recomposition — not a crop of the 16:9)

- Vertical recomposition: robot lower-middle, station behind it upper-middle,
  sky upper third for copy.
- Copy overlays the top with the existing vertical gradient
  (`.ez-chapter::before` mobile rule); CTAs stack full-width at bottom.
- The robot and the existing-equipment station must BOTH survive the 3:4
  frame — if only one fits, the composition is wrong.

### Visual hierarchy (reading order)

1. H1 — "One operating layer for autonomous golf facilities."
2. The facility scene (robot working within it)
3. Operating-intelligence overlay (chips + connectors — see below)
4. Supporting paragraph + starting-point line
5. CTAs (lime primary, ghost secondary)
6. Caption

### Overlay elements (HTML/SVG — the "operating intelligence" layer)

Rendered by the page on top of the master frame, never baked in:

- **Status chip cluster** (2–3 chips max, top-right of the scene):
  `● Collection · Zone B — active` (lime dot), `Ball inventory — above
  threshold` (blue data text). Uses existing `.dash`-style tokens.
- **SVG connector lines** — thin 1px blue (`var(--blue)` at ~55% alpha)
  linking robot → handoff point → station → chip cluster. Dotted, subtle.
- Overlay density is capped: max 3 chips + 2 connector runs. This is a hero,
  not a HUD.
- Motion: chips fade in staggered 200ms after load; connectors draw once
  (600ms). `prefers-reduced-motion`: everything rendered static, no draw-in.
- All overlay text is real DOM text (selectable, translatable, AT-readable);
  decorative connector SVG is `aria-hidden`.

### Required assets (production inputs)

| Asset | Spec |
|---|---|
| `hero/master-frame` still | 2880×1620 (16:9) — photo composite of the real robot on a real/plate range, or approved render. AVIF + WebP. |
| `hero/master-frame-mobile` | 1125×1500 (3:4) recomposition, AVIF + WebP |
| Depth/lighting plate (optional) | Same frame, no robot — enables parallax later; not required for Sprint 1 |
| OG refresh | 1200×630 crop of master frame after approval |

No new video in Sprint 1. The motion version (approach + handoff pass) is a
separate deliverable gated on the approved storyboard.

### Captions

`Product development visualization` — HTML, bottom-left of the media area,
existing `.media-caption` style.

### Fallback behavior

1. **Until master frame approval**: current earth-zoom → robot-field sequence
   stays exactly as-is (hard gate from Phase 2A, unchanged).
2. **After approval**: master frame still replaces the ground stage;
   overlay renders on top. Scroll sequence length may shorten but chapter
   structure/IDs do not change.
3. Still fails to load → dark `--night` stage + copy + CTAs remain fully
   functional (copy never depends on the image).
4. Reduced motion → static master frame + static overlay, no scrub required.

### Explicitly out of scope for this visual

Standalone robot beauty shots; fictional fleet scenes (multiple robots);
fabricated UI screens embedded in the photo; any claim-bearing text inside
the image.

==================================================

## 2 · MODULAR BALL HANDOFF VISUAL

### Purpose

Show HOW collected balls move from the robot into the facility's existing
wash-and-dispense equipment — the engineering story that makes "keep the
equipment already on site" credible.

**Label requirement:** every frame carries `Engineering concept
visualization` (HTML caption via MediaFrame). The visual must NOT imply a
final production design — schematic finish, not product marketing finish.

### Mechanical concept requirements

The visualization must depict, at concept level:

1. **Docking interface** — how the robot aligns to the handoff unit
   (guide/funnel geometry, approach vector).
2. **Transfer path** — hopper discharge → modular conveyor or gravity chute →
   washer intake adapter. The path must be continuous and legible.
3. **Existing-equipment boundary** — the washer + dispenser drawn as a
   clearly separated "existing equipment" zone (matches the flow-diagram
   language: NXTektal elements blue, existing equipment neutral/white).
4. **Verification point** — where flow/count confirmation happens (sensor
   glyph), feeding the VERIFY step of the workflow.
5. **Site-adapter concept** — one visual cue (interchangeable flange/adapter)
   expressing "site-specific calibration and modular adapters," without
   dimensioned engineering detail.

Style: isometric cutaway, neutral greys + `var(--blue)` linework on light
(`#ffffff` card) background, uniform line weight, **no dimensions, no
tolerances, no fastener detail** — concept, not blueprint. SVG preferred;
static renders acceptable if SVG is impractical.

### Three-step sequence

| Step | Name | Depicts | Overlay label (HTML) |
|---|---|---|---|
| 01 | DOCK | Robot approaches and aligns to the handoff unit | "Robot docks at the handoff point" |
| 02 | TRANSFER | Balls move from hopper through the modular path into the washer intake | "Balls transfer into existing washing equipment" |
| 03 | VERIFY & RELEASE | Flow/count confirmed; robot released to next mission | "Transfer verified — workflow logged" |

Presentation: three equal panels in one `MediaFrame` (desktop: 3-up row;
mobile: vertical stack, same panels). Step numbers/labels are HTML next to
each panel, reusing the `.wf-step-index` typographic style.

### Before/after workflow

The existing before/after flow diagram (`.flow-compare`, already inside a
light MediaFrame) **stays directly below the sequence** as workflow context.
The sequence explains the mechanism; the diagram explains the operational
change. Neither replaces the other.

### Required CAD / reference materials (from NXTektal engineering)

1. Collection robot hopper geometry — CAD export (STEP/GLB) or dimensioned
   photos of the prototype hopper and discharge.
2. Handoff unit concept — any existing CAD, sketches, or bench prototype
   photos; if none exist, a 30-minute engineering session to agree the
   concept geometry before illustration starts.
3. Washer intake references — photos/models of the 2–3 wash-and-dispense
   configurations most common at pilot-candidate facilities.
4. Approach/docking notes — how alignment is expected to work (vision marker,
   mechanical guide, both).
5. Confirmation of what may be shown publicly (anything patent-sensitive is
   abstracted to a glyph).

==================================================

## 3 · OPERATIONS INTELLIGENCE DASHBOARD

### Purpose

A manager-facing software concept that makes the operating layer tangible:
what the facility manager sees, decides, and approves. Presented inside the
existing dark platform chapter (`#intelligence`), right column of
`.intel-duo`.

**Label requirement:** `Illustrative product concept — not live facility
data` stays permanently visible in the dashboard titlebar (HTML, as today).

### Concept frame

Desktop app window, ~1.45:1, dark UI on `--night` family, structure:

- **Header bar** — facility name, date, `● operating` status dot (lime).
- **Left rail (concept-only)** — icon nav: Overview / Missions / Equipment /
  Reports. Non-functional, communicates "this is a real product surface."
- **Main grid** — the nine required modules, hierarchy below.

### Required modules and hierarchy

Row 1 — always-visible health (largest type):

| Module | Content | Status color logic |
|---|---|---|
| 1. Facility status | Single top-level state: "Operating normally · 1 exception" | lime dot healthy / amber exception |
| 2. Ball inventory | Gauge vs operating threshold + trend | lime above threshold |
| 3. Active missions | Current mission card: type, zone, phase | lime live dot |

Row 2 — fleet & equipment:

| Module | Content |
|---|---|
| 4. Robot status | Per-robot: state (active/charging/queued), battery, next window |
| 5. Equipment status | Washer / dispenser / handoff unit states; flagged items amber |
| 6. Alerts | Chronological exceptions: "Washer intake flagged 14:32 — routed for review" |

Row 3 — the intelligence loop (this is what elevates it beyond monitoring):

| Module | Content |
|---|---|
| 7. Recommendations | "Shift afternoon collection window −40 min based on observed demand" + evidence line |
| 8. Approvals | Recommendation cards with Approve / Defer actions (visual only) — the manager-stays-in-control story |
| 9. Daily summary | The existing five-line operations summary |

### Current functionality vs illustrative future interface

Every module carries a small HTML status tag (top-right corner, reusing the
`.status-grid` pill style), so future capability is never presented as
current product. Explicit tag per module:

| # | Module | Tag |
|---|---|---|
| 1 | Facility status | IN DEVELOPMENT |
| 2 | Ball inventory | IN DEVELOPMENT |
| 3 | Active missions | IN DEVELOPMENT |
| 4 | Robot status (single-robot state) | IN DEVELOPMENT — the multi-robot fleet view within it is CONCEPT |
| 5 | Equipment status | IN DEVELOPMENT |
| 6 | Alerts | IN DEVELOPMENT |
| 7 | Recommendations | CONCEPT |
| 8 | Approvals | CONCEPT |
| 9 | Daily summary | IN DEVELOPMENT |

The left-rail navigation is CONCEPT. (IN DEVELOPMENT maps to the Development
Status band: Range Operations Agent — early product development.)

A one-line legend sits under the dashboard (HTML): "Modules marked CONCEPT
illustrate the platform direction and are not current functionality."

### Production form

**Preferred: upgrade the existing coded `.dash` (HTML/CSS)** — it is already
accessible, theme-correct, and cost-free to maintain. Sprint 1 delivers the
redesigned coded dashboard per this spec (visual design pass, module
additions, status tags). A designed still (AVIF/WebP export at 1800×1240) is
produced ONLY if a design tool pass is preferred later; the coded version
remains the fallback either way.

==================================================

## 4 · IMPLEMENTATION CONTRACT

### 4.1 Hero System Visual

| Field | Value |
|---|---|
| File location | `public/visuals/phase2/hero/master-frame.{avif,webp}` · `master-frame-mobile.{avif,webp}` (poster derivatives — 1920×1080 WebP/AVIF, same basename `-poster` — ship with the later motion deliverable, not Sprint 1) |
| Expected dimensions | Desktop 2880×1620 · Mobile 1125×1500 · OG 1200×630 |
| Aspect ratio | 16:9 desktop · 3:4 mobile |
| Desktop/mobile usage | Desktop: ground stage of the hero sequence, full-bleed. Mobile: 3:4 recomposition full-bleed behind stacked copy |
| MediaFrame integration | Hero is the one slot NOT wrapped in MediaFrame (full-bleed stage inside `EarthExperience`); caption renders via the existing hero chapter DOM; overlay chips/connectors are DOM siblings of `.ez-copy` |
| Alt text | "Autonomous collection robot working on a driving range at dusk, with the range's washer and dispenser station nearby" |
| Caption | Product development visualization |
| Fallback | Current earth-zoom sequence until approval → static master frame + copy if motion assets absent → copy + dark stage if image fails. Reduced motion: static frame, static overlay |

### 4.2 Modular Ball Handoff Visual

| Field | Value |
|---|---|
| File location | `public/visuals/phase2/handoff/seq-01-dock`, `seq-02-transfer`, `seq-03-verify` — `.svg` preferred, else `.{avif,webp}` |
| Expected dimensions | 1200×900 per panel (rendered); SVG viewBox 4:3 |
| Aspect ratio | 4:3 per panel (3-up row ≈ 4:1 composite on desktop) |
| Desktop/mobile usage | Desktop: three panels in a row inside one MediaFrame. Mobile: same panels stacked vertically, full column width |
| MediaFrame integration | `<MediaFrame caption={CAPTIONS.engConcept} tone="light">` above the existing `.flow-compare` frame in `.integration-block`; panel labels are HTML beside each panel |
| Alt text | Panel 1: "Robot docking at the modular handoff unit (concept)" · Panel 2: "Balls transferring from the robot's hopper into the existing washer intake (concept)" · Panel 3: "Sensor confirming completed transfer (concept)" |
| Caption | Engineering concept visualization |
| Fallback | Panels absent → section renders exactly as today (flow diagram only; no empty frame is ever mounted). Panel image fails → light stage + caption remain, flow diagram still tells the story |

### 4.3 Operations Intelligence Dashboard

| Field | Value |
|---|---|
| File location | Coded: `components/manifesto/IntelligenceSection.tsx` (`.dash`). Optional still export: `public/visuals/phase2/dashboard/dashboard-concept.{avif,webp}` |
| Expected dimensions | Coded: responsive. Still (if produced): 1800×1240 desktop + 1125×1500 stacked-card mobile crop |
| Aspect ratio | ~1.45:1 app window |
| Desktop/mobile usage | Desktop: right 58–62% of `.intel-duo`. Mobile: full-width, modules stack to 1-col (existing 760px rules), summary list single column |
| MediaFrame integration | Not wrapped — `.dash` is its own app-shell container with titlebar caption (Phase 2A decision, unchanged). If a still replaces it, THAT goes into `<MediaFrame caption={CAPTIONS.illustrative} bare>` |
| Alt text | Coded version: real text, none needed. Still version: "Illustrative NXTektal range-operations dashboard concept showing facility status, missions, inventory, and approvals" |
| Caption | Illustrative product concept — not live facility data (titlebar) + CONCEPT/IN DEVELOPMENT module tags |
| Fallback | Coded dashboard IS the fallback and the primary. No image dependency |

==================================================

## Sprint 1 exit criteria

1. This brief approved by NXTektal.
2. Hero master-frame source material confirmed (shoot plan or render route).
3. Handoff engineering references delivered (or the 30-min concept session
   held) — illustration can start.
4. Dashboard coded redesign implemented per §3 and reviewed in the browser.
5. No narrative, section-ID, or structure changes anywhere.

Deliberately NOT in Sprint 1: final hero imagery, any video, workflow
per-step assets, expansion map, build-evidence strip.

# Phase 2 Visual Asset Plan — NXTektal Homepage

Status date: 2026-08-01 · Branch: `feature/phase2a-visual-asset-prep`

This document is the **visual asset contract** for Phase 2. It defines every
homepage visual slot, the exact deliverable that fills it, and the container
that accepts it. Page structure, section IDs, and the approved narrative order
are frozen; final assets drop into the containers below without markup changes.

## Ground rules

- The approved narrative and section order do not change.
- No fake product imagery. Every rendered, concept, or illustrative asset is
  labeled with one of the four approved captions, rendered as **HTML/SVG next
  to the media — never baked into the image**. The single exception: real
  unretouched photography (Build Evidence) needs no visualization caption —
  an optional HTML date/location line instead:
  - `Product development visualization`
  - `Engineering concept visualization`
  - `Illustrative product concept — not live facility data`
  - `Platform direction`
- The current Hero footage stays until the **Master Product Visual** is
  approved. The final hero video is not produced until the static hero master
  frame and storyboard are approved.
- All text that appears over or beside generated imagery is HTML or SVG.

## Container component

`components/media/MediaFrame.tsx` — stable responsive `<figure>` wrapper:

- `caption` (required): one of `CAPTIONS.*` or explicit string, rendered as an
  HTML `<figcaption class="media-caption">`.
- `aspect`: CSS aspect-ratio (`"16 / 9"`) for fixed-ratio media; omitted for
  auto-height diagrams.
- `tone`: `dark | light` to match the chapter theme.
- `bare`: removes frame chrome when the child brings its own shell
  (diagrams, app mocks).

Media inside the stage fills it with `object-fit: cover`. Swapping a child
(`<video>` → `<picture>` → inline SVG) never changes layout.

## Format policy

| Format | Use |
|---|---|
| **AVIF + WebP** | All static imagery via `<picture>` (AVIF first, WebP fallback, JPG only for OG/social). Stills ≤ 300 KB desktop. |
| **Poster (WebP/AVIF)** | Every video gets a `poster` still — also the reduced-motion and `<noscript>` fallback. |
| **WebM (VP9/AV1) + MP4 (H.264)** | Ambient loops: `<video muted loop playsinline>` with WebM first, MP4 fallback. Scroll-scrubbed video stays all-intra H.264 MP4 (Safari-safe). Loops ≤ 6 MB desktop, ≤ 2.5 MB mobile. |
| **SVG** | Diagrams, connectors, capability-map linework, and all in-visual text/labels. Inline (not `<img>`) when styled by CSS vars. |

Fallback ladder everywhere: video → poster still → HTML/SVG diagram already in
the DOM. Reduced-motion users always get the poster/static state; content is
never gated behind an animation.

## Asset directories

```
public/visuals/phase2/hero
public/visuals/phase2/workflow
public/visuals/phase2/handoff
public/visuals/phase2/dashboard
public/visuals/phase2/expansion
public/visuals/phase2/build-evidence
```

---

## Asset contracts

### 1 · Hero System Visual (Master Product Visual)

| Field | Value |
|---|---|
| Homepage section | Hero (`EarthExperience`, chapter `top`) |
| Asset name | `hero/master-frame` (still) → `hero/hero-loop` (video, later) |
| Purpose | Establish the robot + operating layer in a real range environment; first-impression product credibility |
| Source material required | Approved Master Product Visual: robot photography or approved render + range environment plate; storyboard for the motion version |
| Desktop dimensions | 2880×1620 (16:9) still; video 1920×1080 |
| Mobile dimensions | 1125×1500 (3:4 recomposition — not a crop; see PHASE_2B_VISUAL_BRIEF.md §1) still; video 1080×1350 |
| File formats | Still: AVIF + WebP (JPG only for the OG/social export). Video: WebM + all-intra MP4 (scroll-scrub compatible) + WebP/AVIF poster |
| Fallback behavior | Video → poster still → current footage stays until approval |
| Caption | Product development visualization |
| Alt text | "Autonomous collection robot working on a driving range at dusk, with the range's washer and dispenser station nearby" |
| Implementation component | `EarthExperience` ground stage — section structure unchanged; on approval, the master frame adds overlay chips/connectors + caption as new DOM inside the hero chapter (spec: PHASE_2B_VISUAL_BRIEF.md §1) |
| Current status | **Blocked on approval** — do not replace current hero until Master Product Visual is approved; current earth-zoom → robot-field footage remains |

### 2 · Closed-Loop Workflow

| Field | Value |
|---|---|
| Homepage section | `#first-workflow` (WorkflowStory) |
| Asset name | `workflow/step-01-monitor … step-08-verify` (8 stills or 1 loop) |
| Purpose | One visual per step (or a single loop that the active step scrubs) making the 8-step loop tangible |
| Source material required | Robot field footage per step, handoff unit footage, dashboard capture for MONITOR/VERIFY frames |
| Desktop dimensions | 1600×900 (16:9) |
| Mobile dimensions | 1125×633 (16:9, same crop) |
| File formats | Stills AVIF+WebP; optional loop WebM+MP4 with poster |
| Fallback behavior | Active-step still → current `robot-field.mp4` loop → poster |
| Caption | Product development visualization |
| Alt text | Per step, e.g. "Robot collecting range balls in a priority zone" |
| Implementation component | `MediaFrame` inside `WorkflowStory` (`wf-visual`) — **wired ✅** |
| Current status | Interim asset live (`/robot/robot-field.mp4`, 1280×720); per-step assets missing |

### 3 · Modular Ball Handoff

| Field | Value |
|---|---|
| Homepage section | Equipment Integration (`.integration-block`) |
| Asset name | `handoff/seq-01-dock`, `seq-02-transfer`, `seq-03-verify` (Sprint 1 — three concept panels; a `handoff/handoff-sequence` video remains a later option) |
| Purpose | Show collection-to-washer transfer end to end around existing equipment |
| Source material required | Engineering CAD/prototype footage or approved concept render of the handoff unit docking + transfer |
| Desktop dimensions | 1200×900 per panel (4:3; SVG viewBox preferred) — superseded per PHASE_2B_VISUAL_BRIEF.md §2; a later video would be 1920×1080 |
| Mobile dimensions | Same 4:3 panels stacked vertically |
| File formats | WebM + MP4 + poster; or AVIF/WebP still sequence; SVG overlay labels |
| Fallback behavior | Video → poster → existing before/after CSS flow diagram (stays in DOM permanently) |
| Caption | Engineering concept visualization |
| Alt text | "Modular handoff unit transferring collected balls into the range's existing washer" |
| Implementation component | New `MediaFrame` (`tone="light"`) mounted ABOVE the existing flow-diagram frame (separate frames — see PHASE_2B_VISUAL_BRIEF.md §4.2); the flow diagram's own frame stays as wired ✅ |
| Current status | Missing — flow diagram (HTML/CSS) is the current content and the permanent fallback. Public "COMING IN A LATER PHASE" placeholder removed in Pass 1.1 ✅ |

### 4 · Manager Dashboard

| Field | Value |
|---|---|
| Homepage section | `#intelligence` (IntelligenceSection) |
| Asset name | `dashboard/dashboard-concept` |
| Purpose | High-fidelity product-concept UI making the operating layer tangible |
| Source material required | Approved dashboard design (Figma or coded mock); if animated, a screen capture |
| Desktop dimensions | 1800×1240 (app-window ratio ~1.45:1) |
| Mobile dimensions | 1125×1500 (stacked-card crop) |
| File formats | Preferred: keep as coded HTML (current `.dash`); else AVIF/WebP still or WebM/MP4 capture |
| Fallback behavior | Coded HTML dash (current) is both the interim asset and the permanent no-JS fallback |
| Caption | Illustrative product concept — not live facility data (rendered in the dash titlebar, HTML) |
| Alt text | n/a while coded HTML (real text); if image: "Illustrative NXTektal range-operations dashboard concept" |
| Implementation component | `.dash` app shell inside `.intel-duo` (already a stable framed container) |
| Current status | **Usable coded asset live** — upgrade path is a design-polish pass, not a structural change |

### 5 · Golf Facility Expansion Map

| Field | Value |
|---|---|
| Homepage section | `#expansion` |
| Asset name | `expansion/facility-map` |
| Purpose | Coordinated facility-layout view: ball ops wedge today, drones/turf/bunkers/mowing/inspection joining the same operating layer |
| Source material required | Stylized top-down facility illustration (SVG linework preferred); capability positions + status per roadmap stage |
| Desktop dimensions | 1600×1000 (8:5) |
| Mobile dimensions | 1125×1400 (vertical recomposition, not a shrink) |
| File formats | **Inline SVG** (CSS-var colors, HTML/SVG labels, status dots reuse lime/blue roles); AVIF/WebP export only as fallback |
| Fallback behavior | SVG → current layer-band + three roadmap stage cards (stay in DOM permanently) |
| Caption | Platform direction |
| Alt text | "Facility map showing NXTektal capabilities connected to one operating layer" |
| Implementation component | New `MediaFrame` (`tone="light"`, `bare`) above `.roadmap-stages` — added only when the SVG exists (no public placeholder before that) |
| Current status | Missing — roadmap cards are the current content and permanent fallback |

### 6 · Real Build Evidence

| Field | Value |
|---|---|
| Homepage section | Development Status band (`.status-block`) or adjacent strip |
| Asset name | `build-evidence/build-01 … build-N` |
| Purpose | Honest credibility: real prototype hardware, bench tests, field sessions |
| Source material required | **Real photos/clips only** — existing robot photo set + new build/bench photos from the team; no renders in this slot |
| Desktop dimensions | 1536×1024 (3:2, matches existing set) |
| Mobile dimensions | 1125×750 (3:2) |
| File formats | AVIF + WebP (JPG source retained); short clips WebM+MP4+poster |
| Fallback behavior | Static grid of stills (no motion dependency) |
| Caption | none required (real photos) — optional date/location line as HTML |
| Alt text | Descriptive per photo, e.g. "Collection robot prototype, front view with sensor mast" |
| Implementation component | `MediaFrame` grid in/beside `.status-block` — added when the strip is approved |
| Current status | **Partially available**: 4 real photos in `public/robot/` (1536×1024) + `robot-field.mp4` (1280×720); currently robot-field.mp4 is used by Workflow; photos unused since IA redesign |

---

## Asset inventory (current)

| Asset | Dimensions | Used at | Kind | Phase 2 fate |
|---|---|---|---|---|
| `earth/space-drift(.sm).mp4` | 1920×1080 / 960×540 | Hero space stage | Rendered (licensed) | Keep until Master Product Visual approved |
| `earth/earth-zoom(.sm).mp4`, `earth-idle*` | 1920×1080 / 960×540 | Hero zoom scrub | Rendered (licensed) | Keep until Master Product Visual approved |
| `earth/milkyway-lg/sm.jpg` | large/small | Hero backdrop | Real photo (licensed) | Keep |
| `earth/earth_clouds_1024.png`, `earth_atmos_1024.jpg` | 1024² | Hero veil | Rendered (NASA-derived) | Keep |
| `robot/robot-field.mp4` | 1280×720 | Workflow visual (MediaFrame) | Real footage | Interim → replaced by per-step assets; needs WebM + poster |
| `robot/robot-{front,angle,hopper,roller}.jpg` | 1536×1024 | **Unused** | Real photos | Build-evidence strip + workflow step frames |
| `founders/*.jpg` | portrait crops | `#company` | Real photos | Keep |
| `brand/nxtektal-lockup.png`, `nx-mark.png` | 760×106, 512×239 | Header/footer/ROI/favicon | Brand | Keep |
| `og-image.jpg` | 1200×630 | Social | Rendered | Refresh after hero master frame exists |
| Flow diagram (HTML/CSS) | responsive | Integration | Illustrative (coded) | Permanent fallback behind handoff video |
| `.dash` dashboard (HTML) | responsive | Intelligence | Illustrative (coded) | Usable; polish pass optional |
| Roadmap cards (HTML) | responsive | Expansion | Illustrative (coded) | Permanent fallback behind facility map SVG |

## Missing source materials (needed from NXTektal)

1. **Master Product Visual** approval — hero master frame (robot + range, dusk) and, after that, the hero motion storyboard.
2. Per-step workflow footage/stills (esp. HANDOFF and WASH & DISPENSE — nothing exists for the handoff unit).
3. Handoff unit engineering source: CAD exports, prototype bench footage, or an approved concept render.
4. Facility-map illustration direction (or approval for us to draft the SVG linework in-house).
5. New build-evidence photos: bench tests, wiring, field sessions with dates.
6. Approved dashboard design polish (optional — coded dash already acceptable).

## Delivery order recommendation

1. Hero master frame (unblocks hero + refreshed OG image) — **approval gate**
2. Handoff sequence (weakest current section; diagram already in place as fallback)
3. Per-step workflow assets
4. Facility-map SVG
5. Build-evidence strip
6. Hero motion video (after storyboard approval)

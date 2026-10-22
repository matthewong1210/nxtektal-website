# Asset Attributions

## Robot photography and footage (`public/robot/`)

Real NXTektal prototype photography and field footage supplied by the
founders. All rights held by NXTektal Systems.

## Hero master visual and hero film (`public/visuals/phase2/hero/`)

The hero background film (`hero-loop.webm` / `hero-loop.mp4`), both hero
master-frame stills, and the RETURN / HANDOFF workflow loops and posters
are all derived from one AI-generated NXTektal hero concept film supplied
by the founders 2026-08-11 (4K 120fps hand-off) — logo intro/outro and the
closing watermark removed, audio track stripped, hero film at the source's
native 3840×2160, workflow segments retimed (half or quarter speed) at
1280×720. This
supersedes the 2026-08-10 film and the earlier tracked-collector render
stills, which are deleted. Concept visualization, not live facility
footage. Usage rights follow the generating tool's terms for user-generated
content; the tool was not recorded at hand-off — record it here and confirm
commercial terms before launch. The raw source recording stays outside the
repository.

The mobile hero film (`hero-loop-mobile.mp4`) is a 1280×720 H.264 re-encode
of that same `hero-loop.mp4`, with the full frame, 12.9-second loop and
30 fps preserved, no audio, and faststart metadata. No new imagery is added.

Since 2026-10-22 the film is framed as the main visual of the homepage's
golf block (`components/manifesto/FacilityFilm.tsx`) rather than the hero
background; the same stills and encodes are used, with the concept label
under the frame.

## Workflow physical-loop media (`public/visuals/phase2/workflow/`)

The WASH & DISPENSE loop and poster are derived from concept footage of
the washer trough and dispensing conveyor supplied by the founders
2026-08-11 (generating tool not recorded at hand-off — record it here and
confirm commercial terms before launch). The COLLECT loop and poster are a
**Dreamina** render of the current collection-robot design (integrated
front roller picker) supplied 2026-08-11, same terms. The RETURN and
HANDOFF loops and posters are derived from the 2026-08-11 hero film (see
above). Simulator-derived stills are screenshots of the NXTektal Range
Operations Simulator (original software, all rights held by NXTektal
Systems). These workflow files, and the prototype footage in
`public/robot/`, are retained in the repository but not referenced by the
site since the 2026-10-22 homepage redesign.

## Simulator media (`public/visuals/phase2/simulator/`)

Screen recordings and stills of the NXTektal Range Operations Simulator —
original NXTektal software; all rights held by NXTektal Systems.

## CE82A product imagery (`public/products/ce82a/`)

`ce82a-raised-angle.webp` (1537×1023), `ce82a-front.webp` (1538×1023),
`ce82a-side-left.webp` (1536×1024), `ce82a-side-right.webp` (1536×1024) and
`ce82a-driving-range.webp` (1538×1022, a driving-range scene) are renders of
the CE82A supplied by the founders on 2026-10-21 for the product page; the
founders hold the record of their origin and rights. The range scene is a
display image, not an NXTektal customer deployment, and the page says so in
its caption.
They replaced the YAWIN (亚云) manufacturer images used until then (the
980×731 product-on-white image and the 1920×1079 course scene extracted from
亚云自动捡球机CE82A.pdf on 2026-10-19); that attribution is preserved in git
history. Specification figures on the page still come from the
manufacturer's product sheet (亚云自动捡球机CE82A.pdf).

## ME74A product imagery (`public/products/me74a/`)

`me74a-raised-angle.webp` (1536×1024), `me74a-front.webp` (1537×1023),
`me74a-side.webp` (1537×1023) and `me74a-golf-course.webp` (1537×1023) are
renders of the ME74A supplied by the founders on 2026-10-21 for the product
page (three studio views and one course scene); the founders hold the record
of their origin and rights. They replaced the YAWIN (亚云) manufacturer images
used until then (the 1322×747 studio, 617×436 front, 690×488 raised-angle and
1920×1440 cover-scene images extracted from ME74A.pdf on 2026-10-19); that
attribution is preserved in git history. The course scene is a display image,
not an NXTektal customer deployment, and the page says so in its caption.
Specification figures on the page still come from the manufacturer's product
sheet (ME74A.pdf) and the owner's spec table of 2026-10-18.

## Removed assets

The tracked-collector Master Product Visual (Dreamina render supplied
2026-08-05, towed gang-roller picker) and its RETURN/HANDOFF companion
loops (Dreamina, 2026-08-04/06) were replaced by the 2026-08-11 hero-film
derivations above; their attributions are preserved in git history. The
public "Product development visualization" label was retired in the
Phase 2E release patch. The previous WASH & DISPENSE footage (dual-arm rig
tipping a basket into the washer intake) was removed in full at the
founders' direction 2026-08-11; its attribution is preserved in git
history.

The earth/space hero sequence (NASA-derived textures via three.js, Dreamina
earth/space footage, Pexels Milky Way photo by Jonathan Borba) was removed
in Phase 2E Sprint 1 along with `public/earth/`; attributions for those
assets are preserved in git history (tag
`phase-2d-signature-interactions-complete` and earlier).

No Google Earth, Mapbox, or watermarked imagery is used. No assets were
copied from getlayers.ai or any other third-party website. The 21st.dev
components referenced during development (fluid-menu, quantum-nebula)
served as interaction references only; all shipped code is original to
this repository.

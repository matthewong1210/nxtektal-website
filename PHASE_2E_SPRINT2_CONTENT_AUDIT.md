# Phase 2E · Sprint 2 — Content Audit

Status date: 2026-08-07 · Branch: `feature/phase2e-sprint2-positioning`
Positioning target: **"One operating layer for autonomous golf facilities."**
Goal: founder-thesis site → industrial autonomy product company site.

## Current section order (audited from app/page.tsx)

| # | Section | Purpose today | Decision | Reason |
|---|---|---|---|---|
| 1 | ProductHero | Positioning + starting point | **KEEP, copy-align** | Visual system approved (2E S1); supporting copy replaced with the final positioning sentence; the separate "Starting with…" line merges into it (§2 — no duplicate starting-point statement) |
| 2 | Validation Strip | Customer-discovery credibility | **KEEP** | Already compact, factual, hedged ("Based on NXTektal customer discovery to date") |
| 3 | Why Driving Ranges | First wedge | **KEEP** | Already customer-problem language, one paragraph + three cards + field observation — matches §11 density |
| 4 | First Workflow (+3 system cards) | Physical workflow story | **KEEP** | Signature interaction; system cards already use approved terms (Range Operations Agent / Autonomous Collection System / Modular Ball Handoff) — the §4 machine-centric replacement was completed in earlier phases; no "The Machine" section exists anywhere |
| 5 | Equipment Integration (Compare + stays/adds + HandoffSequence) | Differentiation | **KEEP** | Matches target IA position 5 |
| 6 | Development Status band | Build credibility (4 status pills) | **MERGE → Build Evidence** | Overlaps §7's purpose; its statuses become the Hardware column's seeds; gated BuildEvidenceGallery moves with it |
| 7 | ROI (QuickCalculator) | Operating economics | **KEEP, retitle** | Formulas untouched; H2 moves from consumer framing ("What is the current workflow costing your range?") to assessment framing ("Understand the operating cost of your current workflow.") per §9 |
| 8 | Pilot CTA | Conversion | **MOVE + EXPAND** | Currently sits mid-page between ROI and Intelligence, interrupting the product story; moves to target position 11 (after Build Evidence) and gains the Assess/Integrate/Validate structure + secondary partnership CTA (§8) |
| 9 | Operating Intelligence (Simulator → hierarchy → dashboard) | Software/decision credibility | **MOVE UP** | Target position 6 — the intelligence story belongs directly after differentiation, before economics; §6 narrative separation already implemented (2C) and untouched |
| 10 | Expansion (Terrain Map) | Platform expansion | **KEEP** | Position matches target IA 8 |
| 11 | Beyond Golf | Long-term markets | **KEEP, trim** | The closing vision line "Outdoor work will not run on fixed schedules forever." is pure philosophy (§3/§11 repeated-vision rule) — removed; the section's body already carries the operational insight ("the operating loop remains…") |
| 12 | Founders | Trust | **KEEP** | Position matches |
| 13 | Final CTA | Conversion | **KEEP** | Copy approved; horizon treatment retained (2E S1 audit) |

## Legacy findings

- **"The Machine" / machine-centric sections**: none remain (removed in Phase 1 IA redesign; §4 verified by grep — zero hits for "The Machine", "one machine", "golf course", legacy "operating system" phrasing in page copy; `manifest.ts` already says "operating layer").
- **Duplicate thesis/vision statements**: one remaining — `beyond-vision` line (see #11). Hero-adjacent thesis was removed in Visual Refinement 1.1.
- **Duplicate starting-point statement**: hero currently states it twice (supporting paragraph + `hero-start` line) — resolved by §2 copy.
- **Old operating-system language**: none found.
- **Outdated section IDs**: none — `#why-driving-ranges / #first-workflow / #intelligence / #expansion / #roi / #pilot / #company / #contact` all remain valid; reorder does not rename IDs, so navigation is unchanged.
- **Unused copy/data**: none found beyond items above.

## Terminology contract (§10) — enforced spellings

Operating layer (company) · Closed-loop ball operations (starting point) ·
Autonomous Collection System (physical) · Range Operations Agent (software) ·
Range Operations Simulator (simulation) · Golf facilities / driving ranges
(customer) · Managed outdoor environments (future).

## Planned target order

Hero → Validation → Why Driving Ranges → First Workflow → Equipment
Integration → Operating Intelligence → ROI → Expansion → Beyond Golf →
**Build Evidence (new structure)** → **Pilot Program (expanded)** → Founders
→ Final CTA.

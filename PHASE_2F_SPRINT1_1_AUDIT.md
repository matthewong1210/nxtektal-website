# Phase 2F · Sprint 1.1 — Pre-Implementation Audit

Status date: 2026-08-07 · Branch: `feature/phase2f-sprint1-intelligence-reframe`
Basis: Phase 2F Sprint 1 state (unreviewed, on this branch).

## Current state

**Hero positioning:** "The intelligence layer for autonomous golf
facilities." + FACILITY INTELLIGENCE eyebrow + understand/decide/coordinate
support + State→Decision→Execution chips. Category-first — correct after
Sprint 1. 10-second investor read: achieved.

**Problem explanation:** MISSING as a dedicated beat. The page jumps from
Hero (what we are) through Validation (credibility) straight into Why
Driving Ranges (vertical wedge). Nothing establishes WHY facilities need
an intelligence layer before the how. The wedge section argues why *golf*,
not why *intelligence*. This is the gap Sprint 1.1 fills.

**Intelligence section:** Six-layer stack with question framing + the
robots-are-hands H2 + learning-loop feedback note. Order correct
(State → Intelligence → Memory → Twin → Execution). Strong.

**Operational Memory explanation:** "State, decision, human action, and
outcome are recorded — each facility accumulates operating knowledge over
time." Good, but the facility-specific angle and the improved-future-
decisions payoff can be sharpened per the §4 preferred framing.

**Spatial Digital Twin explanation:** "A spatial representation of
terrain, zones, infrastructure, equipment, workflows, and operational
constraints." Reads as a static description; the "not only visualization —
it represents operational state" distinction and system relationships are
missing. Question subtitle says "Where does everything exist?" — §6
prefers "Where and how does everything interact?".

## Findings

- **Missing reasoning:** the Problem beat (operational gap) — no section
  says disconnected systems / reactive decisions / no operational memory.
  The 30-second and 60-second investor reads currently rely on the reader
  assembling the argument themselves.
- **Repeated concepts:** none problematic post-Sprint-1; "intelligence
  layer" appears in hero, intelligence H2, and beyond — acceptable
  reinforcement, not definition-repetition.
- **Unclear terminology:** "closed-loop operations" (hero) vs "closed-loop
  ball operations" (elsewhere) — minor, acceptable; twin subtitle question
  under-specified (fix per §5/§6).
- **Unnecessary AI language:** none found (banned-list grep clean).

## Plan (§2–§7)

1. Add a compact Problem section between Validation and Why Driving
   Ranges: approved eyebrow/headline/support + exactly three points
   (Disconnected systems / Reactive decisions / No operational memory),
   closed by the §3 transition sentence. Reuses existing section-light +
   why-card visual primitives; one grid rule of CSS; no new components.
2. Refine the Operational Memory layer description: facility-specific
   knowledge, the State→Decision→Human Action→Outcome→Improved Future
   Decisions chain, no self-learning/human-replacement claims.
3. Refine the Spatial Digital Twin layer: subtitle to "Where and how does
   everything interact?"; description to "a living representation … not
   only visualization — the operational state of the physical
   environment." No metaverse/virtual-world vocabulary.
4. Robot-positioning heading audit: no "NXTektal builds robots" phrasing
   found in headings; workflow/system cards correctly present execution
   proof. No change needed beyond Sprint 1.
5. Build Evidence (Software Intelligence → Field Validation → Hardware
   Execution) and Pilot (Assess → Integrate → Validate) wording verified
   consistent — no changes.

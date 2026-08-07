# Phase 2F · Sprint 1 — Copy Audit (pre-implementation)

Status date: 2026-08-07 · Branch: `feature/phase2f-sprint1-intelligence-reframe`
Basis: PHASE_2F_NARRATIVE_AUDIT.md (three-persona verdict: site reads as
"robotics company"; target: "facility intelligence platform with
autonomous execution").

Per-section migration plan. No code was modified before this audit.

---

## Hero

**Current message:** "AUTONOMOUS OPERATIONS FOR GOLF FACILITIES" / "One
operating layer for autonomous golf facilities." / "NXTektal coordinates
robots, sensors, and workflows to automate repetitive outdoor operations…"
+ two telemetry chips (mission status, inventory level).
**Problem:** Deployment/automation framing; robots listed first; the chips
show hardware telemetry — with the photoreal robot image, the first
impression is "golf robot company" (unanimous persona verdict).
**New positioning:** Eyebrow "FACILITY INTELLIGENCE FOR AUTONOMOUS OUTDOOR
OPERATIONS"; H1 "The intelligence layer for autonomous golf facilities.";
support "NXTektal helps physical facilities understand their environment,
make operational decisions, and coordinate robots, equipment, and people —
starting with closed-loop operations at driving ranges." Chips become a
FACILITY INTELLIGENCE read: State → Decision → Execution (illustrative,
non-numeric, no live-data claim).
**Reason:** Category first, vertical second; the hero must show the system
*deciding*, not the machine reporting. Robot image stays as physical
proof. Visual/layout/CTA destinations unchanged.

## Page metadata (title / description / manifest / structured data)

**Current:** "Autonomous Operations for Golf Facilities" +
operating-layer descriptions.
**Problem:** The browser tab and share cards re-anchor the robot framing
before the page loads.
**New positioning:** Title "NXTektal Systems | Facility Intelligence for
Autonomous Golf Facilities"; descriptions updated to the intelligence-layer
sentence.
**Reason:** First impression starts in the tab and the share card.

## Intelligence section (conceptual center)

**Current message:** Eyebrow "PLATFORM ARCHITECTURE · IN DEVELOPMENT",
H2 "From robot dispatch to operational intelligence.", five-layer
hierarchy (Facility Manager → Facility Operations Agent → Specialized
Workflow Agents → Execution Layer → Verification & Learning) + FEEDBACK
rail + dashboard.
**Problem:** The architecture is org-shaped (who does what), not
stack-shaped (how intelligence works). Operational Memory and Spatial
Digital Twin — the moat layers scored 1 and 0 in the audit — are never
named. H2 defines the company by reference to robot dispatch.
**New positioning:** H2 "Robots are the execution layer. NXTektal is the
intelligence layer." Stack data becomes the six-layer architecture:
Physical World → Facility State → Operational Intelligence → Operational
Memory → Spatial Digital Twin → Autonomous Execution, each with the §5
question framing ("What is happening? / What should happen next? / What
has been learned? / Where does everything exist? / How actions happen").
Feedback note reframed to the State → Decision → Human Action → Outcome
learning loop. Manager-in-control message retained in body copy.
**Reason:** This is the audit's #3 immediate fix — naming the missing
concepts inside the existing component (same intel-stack markup/CSS; data
change only; no new component).

## Simulator section

**Current message:** Correctly positioned ("Test the operation before it
reaches the field") with qualifications.
**Problem:** None structural — but "operating policy" copy can tie into
the named stack ("operational intelligence").
**New positioning:** Keep almost everything; the section is the proof of
operational intelligence. All simulation qualifications unchanged.
**Reason:** Persona-identified strongest intelligence asset; touch
minimally.

## Build Evidence

**Current message:** Columns ordered Hardware → Software → Field
Validation.
**Problem:** Hardware-led ordering re-anchors "robot company" at the
credibility moment.
**New positioning:** 1. Software Intelligence (Range Operations Simulator /
Agent development / Facility state modeling) → 2. Field Validation
(Workflow mapping / Pilot preparation) → 3. Hardware Execution (Collection
system / Mobile platform / Mechanical integration). Statuses unchanged
(IN DEVELOPMENT / EARLY SOFTWARE BUILD / PILOT PREPARATION); gates
unchanged.
**Reason:** Audit immediate fix #2 — same content, inverted lead.

## Beyond Golf

**Current message:** "The specific tasks change, but the operating loop
remains…" + loop strip + five environments.
**Problem:** Asserts transfer without the mechanism; the audit's weakest
venture-case section.
**New positioning:** §8 preferred copy — every managed outdoor environment
shares the same intelligence problem (physical state, operational
constraints, resources, workflows, decisions); NXTektal applies the same
intelligence layer across facilities. No market claims added.
**Reason:** Names WHAT transfers (the intelligence layer), which was the
missing sentence.

## Expansion (Terrain Map)

**Current message:** "One operating layer. More workflows over time."
**Problem:** Minor — consistent with the layer story already.
**New positioning:** Keep H2; TerrainMap untouched (§11). No copy change
needed beyond terminology consistency.
**Reason:** Component and stage data are protected; framing already
supports the story.

## Workflow section

**Current message:** "CURRENT WEDGE · IN DEVELOPMENT / Keeping range balls
moving, end to end." + "Our first system is being developed to monitor…"
**Problem:** Mild robot-first subject ("Our first system…monitor,
dispatch"); acceptable as the first physical application per §11.
**New positioning:** One-line intro adjustment so the intelligence layer
is the decider ("The intelligence layer monitors…dispatches…verifies —
the Autonomous Collection System executes."). Steps, media, architecture
untouched.
**Reason:** §9 robot-positioning rule (state → decision → execution →
outcome) with minimal touch.

## ROI

**Current message:** "Understand the operating cost of your current
workflow." (already assessment-framed in Phase 2E Sprint 2).
**Problem:** None.
**New positioning:** No change.
**Reason:** Already compliant with §10.

## Terminology sweep (site-wide)

**Current:** "robot system"-adjacent phrasing in a few bodies; no
occurrences of "facility state / operational memory / spatial digital
twin" anywhere.
**New:** ADD the three named concepts where the stack introduces them;
keep Facility Operations Agent / Range Operations Simulator names; no
foundation-model/AGI/world-model/copilot vocabulary introduced anywhere.

# NXTektal Systems website

A responsive one-page website for **NXTektal Systems**, which is building robots and the operating system behind them to carry out outdoor work, starting with golf facilities. First job: range-ball collection with handoff into the range's existing washer.

- Company: `NXTektal Systems`
- Domain: `https://nxtektal.com`
- Contact currently used in the site: `founders@nxtektal.com`

> Before launch, create and test the `founders@nxtektal.com` mailbox or replace it in `app/page.tsx`.

## Visual system

The site follows the supplied NXTektal brand direction:

- Lime accent: `#A6E22E`
- Forest green: `#1E2F1E`
- Near black: `#0D1117`
- Steel grey: `#6B7280`
- Off-white: `#F5F7F7`
- Inter-first typography
- Dark technical surfaces, metallic details, restrained glass effects, and lime telemetry accents

The hero still and background loop are derived from the 2026-08-11 AI-generated concept film (see `ATTRIBUTIONS.md`). The hero carries a visible caption ("Background: concept visualization, not footage of a deployed system. It shows a transfer mechanism that is under development, and machines that are later direction, not in development."), its chip list opens with an "Illustrative · not live data" chip, and the list is labelled for assistive technology. The social share card (`public/og-image.jpg`) uses real prototype photography with the approved H1 set over it.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Next content edits

1. Replace status labels as each track moves (see **Terminology** below); add the first pilot's measured results in place of the "NONE YET" field-data row.
2. Replace concept renders with first-generation CAD, prototype photography, or a clearly labeled rendering of the approved machine design.
3. Register and approve real build photos in `lib/visualAssets.ts` (`buildEvidencePhotos` + `buildEvidenceApproved`).
4. Re-export the social-sharing image (`public/og-image.jpg`, 1200×630) whenever the hero headline changes, and ask the social platforms to re-scrape after deploy.

## Narrative structure

The homepage follows one reading order, top to bottom. Work and value first, architecture after.

1. Positioning and customer value (hero + customer-discovery strip) — robots and the operating system behind them for outdoor work, starting with golf; the goal of less staff time on routine jobs, coordination, and checking, stated as a goal.
2. The work — the recurring outdoor jobs a golf facility does, each with NXTektal's honest status (first job in development; next to validate; later direction).
3. First job — range-ball collection and handoff: why picking up the balls is not the whole job (judgment, handoffs, confirmation and exceptions; one field observation), the eight-step designed workflow with simulation/concept labels in the frame, the split between what is in development now and the full-supply vision that is not claimed yet, and the three components; then existing-equipment integration with the mechanism-neutral handoff schematic.
4. How the system does the work — Sense → Decide → Coordinate → Execute → Confirm; who does what; what NXTektal builds versus uses; status note.
5. Software and machines — the Site Brain and the hardware the job needs, the product-improvement loop (record → analyze → improve → test → deliver; a method, not self-learning), the Range Operations Simulator, the architecture stack, the dashboard concept.
6. Why golf facilities first — several recurring jobs on one site, each with an owner and a result a manager can judge, and most of that work recurs at other outdoor facilities; existing spend (GCSAA, with caveats) is supporting context, not the claim; two entry points (golf as customer entry, range-ball collection as first product entry); "one site is not one buyer" stated as an assumption to validate.
7. How it scales — deliver the range job → validate an adjacent job on the same site → take the validated job to similar facilities; what carries over vs. what stays job-specific; the per-job reuse breakdown (a hypothesis to validate); what reuse has to prove (business metrics, all targets); later direction beyond golf.
8. Operating economics (ROI calculator).
9. Current progress and the pilot program — honest status per track, then Assess → Integrate → Validate.
10. Founders and the final call to action.

## Terminology

- Company positioning: **robots and the operating system behind them, for outdoor work, starting with golf facilities**. Do not reintroduce "intelligence layer", "execution layer", "operating layer", or "site brain and robotic workforce" as the company description. "Site Brain" is the name of the software and is introduced only after the work is explained.
- The first job is **range-ball collection and handoff**. Keep the development scope (collect, return, handoff, transfer confirmation, exceptions) separate from the full-supply vision (wash, dispense, tee-line supply), which is not claimed until a pilot measures it.
- Handoff wording is mechanism-neutral: "Collected balls return to a handoff point for transfer into the range's existing washer intake. The workflow requires transfer confirmation before collection resumes." Say "collected balls" or "collected load", never "hopper" or "basket"; never name a station-side arm, removable basket, robot-side lift, chute, or conveyor as the chosen mechanism; never write "handoff unit". Concept footage showing one option carries "Concept visualization. Transfer mechanism under development." next to the frame (`MEDIA_TAGS` in `lib/workflowSteps.ts`, captions in `lib/visualAssets.ts`).
- Two loops, kept apart: the operating loop (Sense → Decide → Coordinate → Execute → Confirm) and the product-improvement loop (record → analyze → improve → test → deliver). The second is a development method; never claim the product learns on its own, gets better with every run, or that NXTektal has a robot foundation model.
- Build or use: NXTektal develops the software and the hardware the job needs, uses suitable third-party equipment where it exists, and never implies every device is its own or every third-party device is compatible.
- Scaling: "higher reuse potential, lower incremental adaptation cost", never "seamless". The collection mechanism does not mow. Golf is chosen because several recurring jobs sit on one site with existing budgets and acceptance criteria, and because part of that work recurs across other outdoor facilities — not because golf is "more commercialized" than another industry. Existing spend is cited with its source and caveat (GCSAA 2024 Maintenance Budget Report).
- Media labels: simulation, concept render, concept visualization, and real photography are always distinguished in the frame or caption; concept renders are never deployment evidence.
- The positioning sentence and site description live once in `lib/positioning.ts` and feed `app/layout.tsx`, `app/manifest.ts`, and the JSON-LD in `app/page.tsx`; edit them there.
- Statuses on the page (`RECURRING_JOBS` and `EXPANSION_STAGES` in `lib/expansionStages.ts` — a job's pill is derived from its stage — and `BUILD_TRACKS`, `SCOPE`, and `SYSTEM_COMPONENTS` in `lib/firstJob.ts`, the handoff panels in `lib/handoffPanels.ts`, status pills in `components/manifesto/IntelligenceSection.tsx`) are the honest state of each track; never present roadmap stages or concept modules as deliverable product.
- Preserve the mobile hero video behaviour from PR #37: lighter mobile encode, muted inline autoplay, poster first, a reachable "Play background video" fallback, and no video under reduced motion.

## Domain and SEO

The project includes canonical metadata for `https://nxtektal.com`, Open Graph and X/Twitter metadata, `robots.txt`, `sitemap.xml`, a web app manifest, and basic Organization structured data.

## Deployment

The project is ready for Vercel or another Node.js host that supports Next.js. On Vercel, import the repository and use the default build command (`npm run build`). Attach `nxtektal.com` after deployment and configure the required DNS records with the domain registrar.

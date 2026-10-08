# NXTektal Systems website

A responsive one-page website for **NXTektal Systems**, which is building the site brain and robotic workforce for outdoor facilities — the software that plans, coordinates, and verifies site work, and the robots designed for specific outdoor jobs — starting with range-ball operations at golf facilities.

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

The hero still and background loop are derived from the 2026-08-11 AI-generated concept film (see `ATTRIBUTIONS.md`). The hero carries no on-page caption; its chip overlay opens with a visible "Illustrative readout · not live data" chip and the list is labelled for assistive technology. The social share card (`public/og-image.jpg`) uses real prototype photography with the approved H1 set over it.

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

The homepage follows one reading order, top to bottom:

1. Positioning and customer value (hero + customer-discovery strip) — site brain and robotic workforce for outdoor facilities, starting with golf facilities.
2. The goal and the problem at the range — judging when to collect, manual handoffs between machines, supply risk and exceptions; one field observation; and why the driving range is the first job.
3. How the system works — Sense → Plan → Coordinate → Execute → Verify, who does what (manager and staff, NXTektal robots, sensors and existing equipment), and the manager's control of goals, rules, and approvals.
4. First workflow — range-ball collection, return, handoff, wash and dispense, verification; existing-equipment integration, assessed site by site.
5. Software and machines developed together — the Site Brain and task-specific machines, the Range Operations Simulator, the Site Brain architecture, and the manager dashboard concept.
6. Operating economics (ROI calculator).
7. Roadmap across golf and the long-term direction beyond golf — only range-ball operations are in development; later stages are direction, not product.
8. Current progress and the pilot program — honest status per track, then Assess → Integrate → Validate.
9. Founders and the final call to action.

## Terminology

- Company positioning: **site brain and robotic workforce for outdoor facilities**. Do not reintroduce "intelligence layer", "execution layer", or "operating layer" as the company description; "full-stack" may be used only in technical explanation.
- Software: **Site Brain**. Simulation: **Range Operations Simulator** (the real development tool). Machines: **collection robot**, **handoff unit** — NXTektal designs and builds these; compatible existing equipment takes part in the same workflow.
- Customers: **golf facilities** (courses and stand-alone ranges); use **driving ranges** when describing the concrete workflow.
- Iteration: field results guide improvements to the software and the machine designs. Do not write "improve with every deployment".
- Use "modular" only where interchangeable hardware is a documented design fact; sharing a task interface does not make parts interchangeable.
- Statuses on the page (`buildTracks` in `app/page.tsx`, `EXPANSION_STAGES` in `lib/expansionStages.ts`, status pills in `components/manifesto/IntelligenceSection.tsx`) are the honest state of each track; never present roadmap stages or concept modules as deliverable product.

## Domain and SEO

The project includes canonical metadata for `https://nxtektal.com`, Open Graph and X/Twitter metadata, `robots.txt`, `sitemap.xml`, a web app manifest, and basic Organization structured data.

## Deployment

The project is ready for Vercel or another Node.js host that supports Next.js. On Vercel, import the repository and use the default build command (`npm run build`). Attach `nxtektal.com` after deployment and configure the required DNS records with the domain registrar.

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

## Products

- `/products` lists the machines by job; each has its own detail page rendered by the shared template in `components/products/ProductPage.tsx` (overview with the full product image, features, gallery with lightbox, grouped specifications, the other product, contact). The nav "Products" entry on the homepage and on product pages links to the list.
- The product pages present **functions and specifications only** (owner's direction, 2026-10-20): no maker attribution ("manufactured by …"), no co-development or brand-relationship copy, no commercial status in the hero. The maker is recorded in `ATTRIBUTIONS.md` and in each data module's `brand` field, which is never rendered. The neutral inquiry line ("software integration scope, site fit and supply arrangements are confirmed with NXTektal") lives in the contact block and the list note, nowhere else.
- `/products/ce82a` — the CE82A robotic ball collector. `/products/me74a` — the ME74A robotic fairway mower (a fairway mower, not a greens mower). Never present either as NXTektal-manufactured, as fully integrated, or as deployed/on order — and never assert the opposite either, since neither has been confirmed.
- All copy, figures and captions live in `lib/products/<model>.ts` in the shared `ProductData` shape (`lib/products/types.ts`); `lib/products/index.ts` is the registry the list and the related-product block read. `lib/__tests__/ce82a.test.ts`, `me74a.test.ts` and `products.test.ts` pin the data boundaries: for the CE82A, 8,000 m²/h is area per hour, 25% is a gradient, 8 km/h is a maximum travel speed, 4.5 h is a rated figure, 48 V / 60 Ah is not expanded into a total, quick battery swap is not automatic recharging; for the ME74A, the 60% travel gradient and 44% mowing gradient stay separate, 9 km/h is a maximum travel speed, 8,000 m²/h and 60,000 m² per charge are rated figures, charging time is 4.5 h with the configuration to be confirmed, no kW/kWh total, no reel length, no round-the-clock claim, no charging-station / wireless-as-standard / warranty-provider decision, IP65 as marked, none of the literature's marketing percentages; for both, no price / stock / lead time / savings / certification / customer figures, no "photograph" (the images are renders), and no maker/brand wording. Add a later model by copying a module and registering it.
- Images go in `public/products/<model>/` (CE82A: `ce82a-product-white.webp` 980×731 and `ce82a-golf-course.webp` 1920×1079; ME74A: `me74a-product-studio.webp` 1322×747, `me74a-front.webp` 617×436, `me74a-top-angle.webp` 690×488, `me74a-golf-course.webp` 1920×1440), with the markings on the machines kept as supplied. `products.test.ts` asserts each file exists and that its WebP header matches the declared size; until a file is present the page renders a neutral "Product image to be added" panel in its place (checked at build time, so rebuild after adding images). Contain-fit images are never shown wider than their source, so the low-resolution ME74A front and raised-angle views sit at their natural size.
- The pages reuse `SiteHeader` (with `homeHref`, `ctaHref` and `currentHref` for secondary pages) and the shared `SiteFooter`.

## Domain and SEO

The project includes canonical metadata for `https://nxtektal.com`, Open Graph and X/Twitter metadata, `robots.txt`, `sitemap.xml`, a web app manifest, and basic Organization structured data.

## Deployment

The project is ready for Vercel or another Node.js host that supports Next.js. On Vercel, import the repository and use the default build command (`npm run build`). Attach `nxtektal.com` after deployment and configure the required DNS records with the domain registrar.

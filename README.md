# NXTektal Systems website

A responsive website for **NXTektal Systems**, which is building Insite, the software that understands an outdoor site, and the robots that execute the work, starting with golf facilities. First job: range-ball collection with handoff into the range's existing washer. The homepage is five short blocks (promise, golf, Insite, robots, contact); the product pages carry the detail.

- Company: `NXTektal Systems`
- Domain: `https://nxtektal.com`
- Contact currently used in the site: `founders@nxtektal.com`

> Before launch, create and test the `founders@nxtektal.com` mailbox or replace it in `lib/positioning.ts`.

## Visual system

The site follows the supplied NXTektal brand direction:

- Lime accent: `#A6E22E`
- Forest green: `#1E2F1E`
- Near black: `#0D1117`
- Steel grey: `#6B7280`
- Off-white: `#F5F7F7`
- Inter-first typography
- Dark technical surfaces, metallic details, restrained glass effects, and lime telemetry accents

The facility film (the main visual of the golf block, `components/manifesto/FacilityFilm.tsx`) and its poster stills are derived from the 2026-08-11 AI-generated concept film (see `ATTRIBUTIONS.md`); the label under the frame reads "Concept visualization, not footage of a deployed system. The transfer mechanism shown is under development." The Insite system screen is the Range Operations Simulator poster with the in-frame tag "Simulation results — not live facility data." The homepage is dark throughout; the product pages are light. The social share card (`public/og-image.jpg`) uses real prototype photography with the homepage headline set over it.

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

1. Move each robot card's development status in `lib/homepage.ts` (`ROBOTS.cards`) as the first job progresses, and the Insite status line (`INSITE.status`) once Insite is connected to a site; the tests pin the vocabulary.
2. Replace the simulator poster in the Insite block with a product screen of Insite when one exists, keeping an honest in-frame label (`agentSimulatorDemo` in `lib/visualAssets.ts`).
3. Replace the concept film with real footage once a machine runs at a facility, and drop the concept label only then.
4. Re-export the social-sharing image (`public/og-image.jpg`, 1200×630) whenever the headline changes, and ask the social platforms to re-scrape after deploy.

## Narrative structure

The homepage (redesigned 2026-10-22 after the minimal, YC-style references the founders chose) is five blocks in one reading order; a visitor understands the promise first, then the application, then the two parts that deliver it. All homepage copy lives in `lib/homepage.ts`, and `lib/__tests__/homepage.test.ts` pins it.

1. The promise — "Automate your outdoor operations." / "Insite understands your site. Robots execute the work." Text only, with whitespace; the header keeps the logo, four nav items (Golf, Insite, Robots, Products) and one Contact button.
2. Golf — "Starting with golf facilities.", one sentence on the first job (range-ball collection, handoff into the range's existing washer), and the facility film as the main visual with its concept label under the frame.
3. Insite — the software's name (formerly "Site Brain"). One system screen (the Range Operations Simulator poster, tagged as simulation) and three things it gives the people running the site: see what is happening; know which work needs attention first; follow progress, exceptions, and results. Understanding first, then judgement, coordination and follow-through; no architecture. One status line: runs in the simulator, not yet connected to a customer site.
4. Robots — "Robots do the work Insite hands over." Two compact cards from the product registry (name, model and job, a short development status, a link to the product page) and the neutral inquiry line.
5. Contact — one heading, one sentence, the mailto button and the address as text. Then the footer.

Block heights follow their content; nothing is a full-screen slide. The sections that left the homepage on 2026-10-22 (customer-discovery strip, the recurring-work list, the workflow story, equipment integration, the operating loop, software-and-machines, why golf, how it scales, the quick ROI calculator, progress tracks, pilot steps, founders) remain in git history before that date; `/roi-calculator` stays live but is no longer linked from the homepage.

## Terminology

- Company positioning: **Automate your outdoor operations. Insite understands your site. Robots execute the work.** The metadata sentence keeps the "is building" framing: "NXTektal is building Insite, the software that understands an outdoor site, and the robots that execute the work, starting with golf facilities." Do not reintroduce "the operating system behind them", "intelligence layer", "execution layer", "operating layer", or "site brain and robotic workforce".
- **Insite** is the software's name since 2026-10-22; "Site Brain" is retired and the tests ban it. Insite is advisory: it understands the site and helps the people running it decide what to do next; it never claims to command robots itself, to be connected to a site, or to learn on its own. Its status line is "runs in the Range Operations Simulator today; not yet connected to a customer site".
- The first job is **range-ball collection and handoff**. Keep the development scope (collect, return, handoff, transfer confirmation, exceptions) separate from the full-supply vision (wash, dispense, tee-line supply), which is not claimed until a pilot measures it.
- Robot statuses on the homepage use one vocabulary: "In development. Not yet running at a customer facility." for the first job and "Next to validate. Not started." for the next; never present either machine as deployed, integrated, or on order (and never assert the opposite).
- Handoff wording is mechanism-neutral: say "transfer into the range's existing washer", "collected balls" or "collected load", never "hopper" or "basket"; never name a station-side arm, removable basket, robot-side lift, chute, or conveyor as the chosen mechanism; never write "handoff unit". The film shows one option, so its label says the transfer mechanism is under development.
- Media labels: simulation, concept render, concept visualization, and real photography are always distinguished in the frame or caption; concept renders are never deployment evidence. The homepage's two media slots are registered in `lib/visualAssets.ts` (`heroMasterFrame`, `agentSimulatorDemo`); the retired workflow, handoff and build-evidence media stay under `public/visuals/phase2/` and `public/robot/`, unreferenced, for reuse.
- The positioning sentence and site description live once in `lib/positioning.ts` and feed `app/layout.tsx`, `app/manifest.ts`, and the JSON-LD in `app/page.tsx` (which also takes the founders' names and roles from there); edit them there.
- If a retired section returns, its earlier rules return with it: no "seamless", no self-learning or foundation-model claim, build-or-use honesty, GCSAA spend cited with its caveat, statuses as the honest state of each track.
- Preserve the mobile film behaviour from PR #37 (`components/manifesto/HeroBackgroundVideo.tsx`): lighter mobile encode, muted inline autoplay, poster first, a reachable "Play background video" fallback, and no video under reduced motion.

## Products

- `/products` lists the machines by job; each has its own detail page rendered by the shared template in `components/products/ProductPage.tsx` (overview with the full product image, features, gallery with lightbox, grouped specifications, the other product, contact). The nav "Products" entry on the homepage and on product pages links to the list.
- The product pages present **functions and specifications only** (owner's direction, 2026-10-20): no maker attribution ("manufactured by …"), no co-development or brand-relationship copy, no commercial status in the hero. The maker is recorded in `ATTRIBUTIONS.md` and in each data module's `brand` field, which is never rendered. The neutral inquiry line ("software integration scope, site fit and supply arrangements are confirmed with NXTektal") lives in the contact block and the list note, nowhere else.
- `/products/ce82a` — the CE82A robotic ball collector. `/products/me74a` — the ME74A robotic fairway mower (a fairway mower, not a greens mower). Never present either as NXTektal-manufactured, as fully integrated, or as deployed/on order — and never assert the opposite either, since neither has been confirmed.
- All copy, figures and captions live in `lib/products/<model>.ts` in the shared `ProductData` shape (`lib/products/types.ts`); `lib/products/index.ts` is the registry the list and the related-product block read. `lib/__tests__/ce82a.test.ts`, `me74a.test.ts` and `products.test.ts` pin the data boundaries: for the CE82A, 8,000 m²/h is area per hour, 25% is a gradient, 8 km/h is a maximum travel speed, 4.5 h is a rated figure, 48 V / 60 Ah is not expanded into a total, quick battery swap is not automatic recharging; for the ME74A, the 60% travel gradient and 44% mowing gradient stay separate, 9 km/h is a maximum travel speed, 8,000 m²/h and 60,000 m² per charge are rated figures, charging time is 4.5 h with the configuration to be confirmed, no kW/kWh total, no reel length, no round-the-clock claim, no charging-station / wireless-as-standard / warranty-provider decision, IP65 as marked, none of the literature's marketing percentages; for both, no price / stock / lead time / savings / certification / customer figures, no "photograph" (the images are renders), and no maker/brand wording. Add a later model by copying a module and registering it.
- Images go in `public/products/<model>/` (CE82A: `ce82a-raised-angle.webp` 1537×1023, `ce82a-front.webp` 1538×1023, `ce82a-side-left.webp` and `ce82a-side-right.webp` 1536×1024, `ce82a-driving-range.webp` 1538×1022; ME74A: `me74a-raised-angle.webp` 1536×1024, `me74a-front.webp`, `me74a-side.webp` and `me74a-golf-course.webp` 1537×1023), all founders-supplied renders at 3:2, so both gallery stages are 3:2 via `galleryAspect`; the raised-angle view is each product's hero and card image, and each scene image is captioned "not an NXTektal customer deployment". `products.test.ts` asserts each file exists and that its WebP header matches the declared size; until a file is present the page renders a neutral "Product image to be added" panel in its place (checked at build time, so rebuild after adding images). Contain-fit images are never shown wider than their source.
- The pages reuse `SiteHeader` (with `homeHref`, `ctaHref`, `ctaLabel` and `currentHref` for secondary pages; the nav items come from `NAV_ITEMS` in `lib/homepage.ts` with absolute anchors) and the shared `SiteFooter`. The homepage's robots block reads the same registry, so a new model appears there only when `ROBOTS.cards` in `lib/homepage.ts` lists it with a status.

## Domain and SEO

The project includes canonical metadata for `https://nxtektal.com`, Open Graph and X/Twitter metadata, `robots.txt`, `sitemap.xml`, a web app manifest, and basic Organization structured data.

## Deployment

The project is ready for Vercel or another Node.js host that supports Next.js. On Vercel, import the repository and use the default build command (`npm run build`). Attach `nxtektal.com` after deployment and configure the required DNS records with the domain registrar.

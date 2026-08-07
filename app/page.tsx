import dynamic from "next/dynamic";
import ProductHero from "../components/manifesto/ProductHero";
import SiteHeader from "../components/manifesto/SiteHeader";
import BuildEvidenceGallery from "../components/manifesto/BuildEvidenceGallery";
import ExpansionMap from "../components/manifesto/ExpansionMap";
import FounderSection, { founders } from "../components/manifesto/FounderSection";
import EquipmentCompare from "../components/manifesto/EquipmentCompare";
import HandoffSequence from "../components/manifesto/HandoffSequence";
import MediaFrame, { CAPTIONS } from "../components/media/MediaFrame";
import IntelligenceSection from "../components/manifesto/IntelligenceSection";
import WorkflowStory from "../components/manifesto/WorkflowStory";
import SpotlightGroup from "../components/manifesto/SpotlightGroup";
import Reveal from "./reveal";

// Below-the-fold interactive module: split out so it never weighs on first paint.
const QuickCalculator = dynamic(() => import("../components/roi/QuickCalculator"));

const site = {
  brand: "NXTektal Systems",
  shortBrand: "NXTektal",
  email: "founders@nxtektal.com",
  domain: "nxtektal.com",
};

const pilotMail = `mailto:${site.email}?subject=Pilot%20Facility%20Interest%20%E2%80%94%20%5BFacility%20Name%5D`;
const partnerMail = `mailto:${site.email}?subject=Partnership%20Discussion`;

const navItems = [
  { label: "Starting Point", href: "#why-driving-ranges" },
  { label: "First Workflow", href: "#first-workflow" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Expansion", href: "#expansion" },
  { label: "ROI", href: "#roi" },
  { label: "Company", href: "#company" },
];

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="icon-arrow">
    <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BrandLockup = () => (
  // Official gradient lockup (public/brand). Raster export from the brand AI file.
  <img
    className="brand-lockup"
    src="/brand/nxtektal-lockup.png"
    alt="NXTektal Systems"
    width={760}
    height={106}
  />
);


const whyCards = [
  { title: "Repetitive workflow", body: "Collection, unloading, and transfer happen throughout the operating day." },
  { title: "Operationally critical", body: "When the ball supply breaks, customers notice immediately." },
  { title: "Measurable economics", body: "Labor hours, run frequency, interventions, downtime, and ball availability can all be tracked." },
];

const systemComponents = [
  {
    title: "Range Operations Agent",
    body: "Monitors demand, equipment state, and mission status, then determines when collection is needed.",
  },
  {
    title: "Autonomous Collection System",
    body: "Collects balls, navigates the range, returns to the handoff point, and recharges between missions.",
  },
  {
    title: "Modular Ball Handoff",
    body: "Connects collection with the facility’s washer and dispenser infrastructure to reduce routine manual transfer.",
  },
];

const buildTracks = [
  {
    name: "Software Intelligence",
    items: [
      { name: "Range Operations Simulator", status: "EARLY SOFTWARE BUILD" },
      { name: "Range Operations Agent", status: "EARLY SOFTWARE BUILD" },
      { name: "Facility state modeling", status: "EARLY SOFTWARE BUILD" },
    ],
  },
  {
    name: "Field Validation",
    items: [
      { name: "Facility workflow mapping", status: "PILOT PREPARATION" },
      { name: "Pilot preparation", status: "PILOT PREPARATION" },
    ],
  },
  {
    name: "Hardware Execution",
    items: [
      { name: "Collection system", status: "IN DEVELOPMENT" },
      { name: "Mobile platform", status: "IN DEVELOPMENT" },
      { name: "Mechanical integration", status: "IN DEVELOPMENT" },
    ],
  },
];

const pilotSteps = [
  { name: "Assess", body: "Understand the current collection, unloading, washing, and dispensing workflow." },
  { name: "Integrate", body: "Configure collection, handoff, equipment interfaces, and operating rules." },
  { name: "Validate", body: "Measure availability, labor requirements, interventions, reliability, and economics." },
];


const beyondEnvironments = ["Campuses", "Parks", "Sports Facilities", "Resorts", "Commercial Landscapes"];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    url: `https://${site.domain}`,
    logo: `https://${site.domain}/brand/nxtektal-lockup.png`,
    email: site.email,
    description:
      "NXTektal builds the intelligence layer that enables physical outdoor facilities to understand their environment, make operational decisions, and coordinate autonomous systems — starting with golf facilities.",
    founder: founders.map((founder) => ({
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 1 · Header */}
      <SiteHeader items={navItems} brand={<BrandLockup />} ctaIcon={<Arrow />} />

      {/* 2 · Hero (product-led) */}
      <ProductHero
        copy={
          <>
            <div className="eyebrow hero-fade"><span className="pulse" /> FACILITY INTELLIGENCE FOR AUTONOMOUS OUTDOOR OPERATIONS</div>
            <h1 className="hero-fade">The intelligence layer for autonomous golf facilities.</h1>
            <p className="ez-body hero-fade">
              NXTektal helps physical facilities understand their environment, make operational decisions, and coordinate robots, equipment, and people — starting with <span className="hero-em">closed-loop operations</span> at driving ranges.
            </p>
            <div className="hero-actions hero-fade">
              <a className="button button-primary" href="#pilot">
                Become a Pilot Facility <Arrow />
              </a>
              <a className="button button-secondary" href="#first-workflow">
                Explore the First Workflow
              </a>
            </div>
          </>
        }
      />

      {/* 3 · Validation strip */}
      <section className="section-light validation-block" aria-label="Customer discovery to date">
        <div className="block-inner">
          <Reveal>
            <dl className="validation-strip">
              <div>
                <dt>30+</dt>
                <dd>Facilities contacted</dd>
              </div>
              <div>
                <dt>Over two-thirds</dt>
                <dd>Reported labor, safety, and reliability challenges</dd>
              </div>
              <div>
                <dt>6</dt>
                <dd>Facilities interested in piloting</dd>
              </div>
            </dl>
            <p className="validation-note">Based on NXTektal customer discovery to date.</p>
          </Reveal>
        </div>
      </section>

      {/* 4 · Why driving ranges */}
      <section className="block section-light why-block" id="why-driving-ranges">
        <div className="block-inner">
          <div className="why-split">
            <div className="why-intro">
              <Reveal>
                <div className="eyebrow">WHY DRIVING RANGES</div>
                <h2>Why start with driving ranges?</h2>
              </Reveal>
              <Reveal>
                <p className="why-lede">
                  Ball operations are repetitive, labor-intensive, and directly tied to customer experience—which makes the driving range a practical place to prove reliable autonomy and measurable operating economics before expanding across the facility.
                </p>
              </Reveal>
              <Reveal>
                <figure className="observation observation--compact">
                  <figcaption className="observation-label"><i aria-hidden="true" /> FIELD OBSERVATION</figcaption>
                  <blockquote>
                    At one driving range, collection runs can occur roughly <em>every two hours</em>, take <em>more than an hour</em>, and still require <em>manual unloading and transfer</em> afterward.
                  </blockquote>
                </figure>
              </Reveal>
            </div>
            <SpotlightGroup className="why-cards">
              {whyCards.map((card, index) => (
                <Reveal key={card.title} delay={index * 60}>
                  <article className="why-card">
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </article>
                </Reveal>
              ))}
            </SpotlightGroup>
          </div>
        </div>
      </section>

      {/* 5 · First closed-loop workflow */}
      <section className="block workflow-block" id="first-workflow">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">CURRENT WEDGE · IN DEVELOPMENT</div>
            <h2>Keeping range balls moving, end to end.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              The intelligence layer monitors ball availability, decides when collection is worth running, and verifies the result — the Autonomous Collection System executes: collecting, returning to the handoff point, and transferring balls into the range’s existing processing equipment.
            </p>
          </Reveal>
          <WorkflowStory />
          <div className="system-cards">
            {systemComponents.map((component, index) => (
              <Reveal key={component.title} delay={index * 60}>
                <article className="system-card">
                  <h3>{component.title}</h3>
                  <p>{component.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · Existing equipment integration */}
      <section className="block section-light integration-block">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">DESIGNED FOR EXISTING INFRASTRUCTURE</div>
            <h2>Keep the equipment already on site.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              NXTektal is being designed around common wash-and-dispense configurations rather than requiring a facility to replace its entire system. Site-specific calibration and modular interfaces connect the workflow where needed.
            </p>
          </Reveal>
          <Reveal>
            <EquipmentCompare />
          </Reveal>
          <Reveal>
            <HandoffSequence />
          </Reveal>
          <Reveal>
            <p className="ez-note">Compatibility and final integration are assessed site by site.</p>
          </Reveal>
        </div>
      </section>

      {/* 10 · Agent intelligence + 11 · Illustrative manager report */}
      <IntelligenceSection />

      {/* 8 · ROI */}
      <QuickCalculator />

      {/* 12 · Expansion across golf */}
      <section className="block section-light expansion-block" id="expansion">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">EXPANDING ACROSS GOLF</div>
            <h2>One operating layer. More workflows over time.</h2>
          </Reveal>
          <Reveal>
            <ExpansionMap />
          </Reveal>
        </div>
      </section>

      {/* 13 · Expansion beyond golf */}
      <section className="block section-light beyond-block">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">BUILT FOR GOLF FIRST</div>
            <h2>Designed for managed outdoor environments.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              Every managed outdoor environment has physical state, operational constraints, resources, workflows, and decisions. The tasks change — the intelligence problem does not. NXTektal applies the same intelligence layer across different facilities.
            </p>
          </Reveal>
          <Reveal>
            <ol className="beyond-loop" aria-label="The transferable operating loop">
              {["SENSE", "PRIORITIZE", "DISPATCH", "EXECUTE", "VERIFY", "IMPROVE"].map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Reveal>
          <Reveal>
            <ul className="beyond-list" aria-label="Adjacent managed outdoor environments">
              {beyondEnvironments.map((env) => (
                <li key={env}>{env}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <p className="beyond-direction">LONG-TERM PLATFORM DIRECTION</p>
          </Reveal>
        </div>
      </section>

      {/* 10 · Build evidence */}
      <section className="status-block" aria-label="Build evidence">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">BUILD EVIDENCE</div>
            <h2 className="evidence-h2">What we are building now.</h2>
          </Reveal>
          <div className="evidence-cols">
            {buildTracks.map((track, index) => (
              <Reveal key={track.name} delay={index * 60}>
                <div className="evidence-col">
                  <h3>{track.name}</h3>
                  <ul>
                    {track.items.map((item) => (
                      <li key={item.name}>
                        <strong>{item.name}</strong>
                        <span>{item.status}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          {/* Renders only when real photos are registered AND approved (lib/visualAssets.ts) */}
          <BuildEvidenceGallery />
        </div>
      </section>

      {/* 11 · Pilot program */}
      <section className="block pilot-block" id="pilot">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">PILOT PROGRAM</div>
            <h2>Test the first workflow at your range.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              We are speaking with facilities that want to evaluate equipment integration, workflow reliability, labor reduction, and ball availability in a real operating environment.
            </p>
          </Reveal>
          <div className="pilot-steps">
            {pilotSteps.map((step, index) => (
              <Reveal key={step.name} delay={index * 60}>
                <article className="pilot-step">
                  <span className="wf-step-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.name}</h3>
                    <p>{step.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="closing-actions">
              <a className="button button-primary" href={pilotMail}>
                Become a Pilot Facility <Arrow />
              </a>
              <a className="text-link" href={partnerMail}>Discuss a Partnership <Arrow /></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 14 · Founders */}
      <FounderSection />

      {/* 15 · Final CTA */}
      <section className="closing-block" id="contact">
        <div className="closing-grid-bg" aria-hidden="true" />
        <div className="block-inner closing-inner">
          <Reveal>
            <h2>Help build the first autonomous golf facilities.</h2>
          </Reveal>
          <Reveal>
            <p className="closing-body">
              We are looking for pilot facilities, equipment partners, and collaborators who want to help validate the first closed-loop workflow.
            </p>
          </Reveal>
          <Reveal>
            <div className="closing-actions">
              <a className="button button-primary" href="#pilot">Become a Pilot Facility <Arrow /></a>
              <a className="text-link" href={partnerMail}>Discuss a Partnership <Arrow /></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 16 · Footer */}
      <footer>
        <a className="brand footer-brand" href="#top" aria-label="Back to top">
          <BrandLockup />
        </a>
        <p>AUTONOMY. INTELLIGENCE. IMPACT.</p>
        <div>
          <a href={`https://${site.domain}`}>{site.domain}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>© 2026 {site.brand}</span>
        </div>
      </footer>
    </main>
  );
}

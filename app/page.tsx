import dynamic from "next/dynamic";
import ProductHero from "../components/manifesto/ProductHero";
import SiteHeader from "../components/manifesto/SiteHeader";
import BuildEvidenceGallery from "../components/manifesto/BuildEvidenceGallery";
import ExpansionMap from "../components/manifesto/ExpansionMap";
import FounderSection, { founders } from "../components/manifesto/FounderSection";
import EquipmentCompare from "../components/manifesto/EquipmentCompare";
import HandoffSequence from "../components/manifesto/HandoffSequence";
import IntelligenceSection from "../components/manifesto/IntelligenceSection";
import WorkflowStory from "../components/manifesto/WorkflowStory";
import SpotlightGroup from "../components/manifesto/SpotlightGroup";
import { BEYOND_ENVIRONMENTS, OPERATING_LOOP } from "../lib/expansionStages";
import { DESIGN_STATUS_NOTE, LOOP_STEPS, PARTICIPANTS } from "../lib/howItWorks";
import Reveal from "./reveal";

// Below-the-fold interactive module: split out so it never weighs on first paint.
const QuickCalculator = dynamic(() => import("../components/roi/QuickCalculator"));

const site = {
  brand: "NXTektal Systems",
  email: "founders@nxtektal.com",
  domain: "nxtektal.com",
};

const pilotMail = `mailto:${site.email}?subject=Pilot%20Facility%20Interest%20%E2%80%94%20%5BFacility%20Name%5D`;
const assessmentMail = `mailto:${site.email}?subject=Site%20Assessment%20Request`;
const partnerMail = `mailto:${site.email}?subject=Partnership%20Discussion`;

const navItems = [
  { label: "Problem", href: "#problem" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "First Workflow", href: "#first-workflow" },
  { label: "ROI", href: "#roi" },
  { label: "Progress", href: "#progress" },
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

/* The problem at the range — concrete, not abstract. */
const problemPoints = [
  {
    title: "Judging when to collect",
    body: "Someone decides from experience whether the outfield is full enough and whether the dispenser will hold, usually while doing another job.",
  },
  {
    title: "Handoffs between machines",
    body: "Picker to cart, cart to washer, washer to dispenser. Each transfer is manual, and each one waits for a person to be free.",
  },
  {
    title: "Supply risk and exceptions",
    body: "A late run or an interrupted washer shows up as an empty dispenser at the tee line. The fix is another manual trip, and the cause is rarely recorded.",
  },
];


/* What NXTektal brings to the first workflow. */
const systemComponents = [
  {
    title: "Site Brain",
    body: "Tracks ball availability, demand, equipment state, and robot status. Plans and dispatches collection runs within the manager’s rules, then verifies and logs each result.",
  },
  {
    title: "Collection Robot",
    body: "An NXTektal machine designed for this job: a wheeled platform with a front roller picker and an onboard hopper that sweeps priority zones, returns to the handoff point, and docks for transfer. Prototype in development.",
  },
  {
    title: "Handoff Unit",
    body: "Transfers the hopper load into the range’s existing washer intake and confirms the transfer, reducing routine manual unloading. Engineering concept, configured to each site’s equipment.",
  },
];

/* Current progress — statuses are the honest state of each track. */
const STATUS_DATE = "October 2026";
const buildTracks = [
  {
    name: "Site Brain · Software",
    items: [
      { name: "Range Operations Simulator", status: "WORKING · SIMULATION ONLY" },
      { name: "Facility state and planning rules", status: "WORKING · SIMULATION INPUTS" },
      { name: "Sensor and equipment interfaces", status: "CONTRACTS · NO LIVE ADAPTER" },
      { name: "Manager dashboard", status: "CONCEPT UI" },
    ],
  },
  {
    name: "Machines · Hardware",
    items: [
      { name: "Collection robot", status: "PROTOTYPE IN DEVELOPMENT" },
      { name: "Handoff unit", status: "ENGINEERING CONCEPT" },
      { name: "Mechanical integration", status: "IN DEVELOPMENT" },
    ],
  },
  {
    name: "Field · Pilots",
    items: [
      { name: "Facility workflow mapping", status: "PILOT PREPARATION" },
      { name: "Pilot site assessments", status: "OPEN" },
      { name: "Field performance data", status: "NONE YET" },
    ],
  },
];

const pilotSteps = [
  { name: "Assess", body: "Walk the current collection, unloading, washing, and dispensing workflow with us and check equipment compatibility." },
  { name: "Integrate", body: "Agree the integration plan for the site: the handoff approach for its washer intake, the equipment interfaces, and the operating rules, scoped to what is ready at pilot time." },
  { name: "Validate", body: "Measure availability, labor requirements, interventions, reliability, and economics against the baseline." },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    url: `https://${site.domain}`,
    logo: `https://${site.domain}/brand/nxtektal-lockup.png`,
    email: site.email,
    description:
      "NXTektal is building the site brain and robotic workforce for outdoor facilities: software that plans, coordinates, and verifies site work, and robots designed for specific outdoor jobs — starting with range-ball operations at golf facilities.",
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

      {/* 2 · Hero — positioning */}
      <ProductHero
        copy={
          <>
            <div className="eyebrow hero-fade"><span className="pulse" /> SITE BRAIN + ROBOTS FOR OUTDOOR FACILITY WORK</div>
            <h1 className="hero-fade">The site brain and robotic workforce for outdoor facilities.</h1>
            <p className="ez-body hero-fade">
              NXTektal is building the software and machines to coordinate and carry out outdoor work, starting with golf facilities. Our first focus is <span className="hero-em">range-ball operations</span>: connecting collection, handoff, and replenishment into a coordinated workflow.
            </p>
            <p className="ez-note hero-fade">
              We are developing a site brain to plan work and verify results, alongside robots designed for specific outdoor jobs. Field results will guide improvements to our software and machine designs.
            </p>
            <div className="hero-actions hero-fade">
              <a className="button button-primary" href="#pilot">
                Become a Pilot Facility <Arrow />
              </a>
              <a className="button button-secondary" href="#how-it-works">
                See How It Works
              </a>
            </div>
          </>
        }
      />

      {/* 3 · Customer discovery strip */}
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
            <p className="validation-note">Based on NXTektal customer discovery to date. No field performance data yet.</p>
          </Reveal>
        </div>
      </section>

      {/* 4 · The goal, the problem on site, and why driving ranges first */}
      <section className="block section-light problem-block" id="problem" aria-label="The goal, the problem at the range, and why driving ranges first">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">THE GOAL — AND WHAT STANDS IN THE WAY</div>
            <h2>Balls collected, processed, and back in the dispenser when players need them.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              That is the outcome we are building toward: collection, handling, and replenishment done when they are needed, with less daily hauling and less manual coordination. It is a product goal, not a measured result. Today the same outcome depends on people making judgment calls across equipment that does not share information.
            </p>
          </Reveal>
          <div className="problem-points">
            {problemPoints.map((point, index) => (
              <Reveal key={point.title} delay={index * 60}>
                <article className="why-card">
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <figure className="observation observation--compact">
              <figcaption className="observation-label"><i aria-hidden="true" /> FIELD OBSERVATION</figcaption>
              <blockquote>
                At one driving range, collection runs can occur roughly <em>every two hours</em>, take <em>more than an hour</em>, and still require <em>manual unloading and transfer</em> afterward.
              </blockquote>
            </figure>
          </Reveal>
          <Reveal>
            <p className="problem-transition">
              Range-ball operations are repetitive, labor-intensive, and tied directly to the player experience, which makes the driving range — at stand-alone ranges and at golf courses with a practice facility — the practical first job for a site brain and a task-specific robot. Keeping the supply steady takes more than a faster picker: it takes a system that knows the state of the range, plans the next run, coordinates the handoffs, and confirms the result, with people in control of the rules.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 6 · How the system works */}
      <section className="block how-block" id="how-it-works">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">HOW THE SYSTEM WORKS</div>
            <h2>Sense. Plan. Coordinate. Execute. Verify.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              Sensors and the facility’s existing systems report what is happening on site. The Site Brain turns that into a plan, coordinates people, NXTektal robots, and compatible equipment, and verifies each result. The loop is the same whether the job is collecting range balls today or other outdoor work later.
            </p>
          </Reveal>
          <Reveal>
            <ol className="loop-steps" aria-label="The operating loop: sense, plan, coordinate, execute, verify">
              {LOOP_STEPS.map((step, index) => (
                <li key={step.name} className="loop-step">
                  <span className="wf-step-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{step.name}</strong>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <div className="participants">
            <Reveal>
              <div className="eyebrow">WHO DOES WHAT</div>
            </Reveal>
            <SpotlightGroup className="participant-cards">
              {PARTICIPANTS.map((participant, index) => (
                <Reveal key={participant.name} delay={index * 60}>
                  <article className="why-card">
                    <h3>{participant.name}</h3>
                    <p>{participant.role}</p>
                    <span className="participant-steps">{participant.steps}</span>
                  </article>
                </Reveal>
              ))}
            </SpotlightGroup>
          </div>
          <Reveal>
            <p className="control-note">{DESIGN_STATUS_NOTE}</p>
          </Reveal>
        </div>
      </section>

      {/* 7 · First workflow — range-ball operations */}
      <section className="block workflow-block" id="first-workflow">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">FIRST WORKFLOW · RANGE-BALL OPERATIONS · IN DEVELOPMENT</div>
            <h2>Keeping range balls moving, end to end.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              At a driving range, the Site Brain watches ball availability and demand and decides when a collection run is worth making. The NXTektal collection robot sweeps priority zones, returns, and transfers its load through the handoff unit into the range’s existing washer and dispenser. The system confirms each handoff and logs the run; anything it cannot confirm goes to a person.
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
          <Reveal>
            <p className="ez-note">
              The simulator frames above are software output and the physical steps are concept renders of the current design direction. None of it is footage of a deployed system.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 8 · Existing equipment integration */}
      <section className="block section-light integration-block">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">DESIGNED AROUND EXISTING INFRASTRUCTURE</div>
            <h2>Keep the equipment already on site.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              The workflow is being designed around common wash-and-dispense configurations rather than asking a facility to replace its system. The handoff unit and the Site Brain’s equipment interfaces are configured to each site’s washer intake, layout, and operating rules.
            </p>
          </Reveal>
          <Reveal>
            <EquipmentCompare />
          </Reveal>
          <Reveal>
            <HandoffSequence />
          </Reveal>
          <Reveal>
            <p className="ez-note">Compatibility and final integration are assessed site by site. No live equipment integration has been completed yet.</p>
          </Reveal>
        </div>
      </section>

      {/* 9 · Software and machines, developed together (+ simulator, architecture, dashboard concept) */}
      <IntelligenceSection />

      {/* 10 · Operating economics */}
      <QuickCalculator />

      {/* 11 · Roadmap across golf */}
      <section className="block section-light expansion-block" id="expansion">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">ROADMAP · GOLF FACILITIES FIRST</div>
            <h2>One Site Brain. More jobs and machines over time.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              Each new job means a new workflow for the Site Brain and, where the job needs one, a machine designed for it. Only range-ball operations are in development today. The later stages are direction, not product.
            </p>
          </Reveal>
          <Reveal>
            <ExpansionMap />
          </Reveal>
        </div>
      </section>

      {/* 12 · Beyond golf — long-term direction */}
      <section className="block section-light beyond-block">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">BEYOND GOLF · LONG-TERM DIRECTION</div>
            <h2>Designed for managed outdoor environments.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              Every managed outdoor facility has physical state, resources, operating rules, and recurring work. The tasks and the machines change; the loop does not. The long-term direction is more kinds of outdoor facilities and more kinds of work. Nothing beyond golf is in development.
            </p>
          </Reveal>
          <Reveal>
            <ol className="beyond-loop" aria-label="The transferable operating loop">
              {OPERATING_LOOP.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Reveal>
          <Reveal>
            <ul className="beyond-list" aria-label="Adjacent managed outdoor environments">
              {BEYOND_ENVIRONMENTS.map((env) => (
                <li key={env}>{env}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <p className="beyond-direction">LONG-TERM DIRECTION · NOT IN DEVELOPMENT</p>
          </Reveal>
        </div>
      </section>

      {/* 13 · Current progress */}
      <section className="status-block" id="progress" aria-label="Current progress">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">CURRENT PROGRESS · {STATUS_DATE.toUpperCase()}</div>
            <h2 className="evidence-h2">Where the first product stands today.</h2>
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
          <Reveal>
            <p className="status-note">
              Simulator output and concept renders on this page are development evidence, not field data. Nothing is deployed at a customer facility yet; the first pilot will produce the first field results.
            </p>
          </Reveal>
          {/* Renders only when real photos are registered AND approved (lib/visualAssets.ts) */}
          <BuildEvidenceGallery />
        </div>
      </section>

      {/* 14 · Pilot program */}
      <section className="block pilot-block" id="pilot">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">PILOT PROGRAM</div>
            <h2>Evaluate the first workflow at your range.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              We are talking with golf facilities that want to assess equipment compatibility, workflow reliability, labor requirements, and ball availability in a real operating environment — and to shape the machine and software designs with field results.
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
              <a className="text-link" href={assessmentMail}>Request a Site Assessment <Arrow /></a>
              <a className="text-link" href={partnerMail}>Discuss a Partnership <Arrow /></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 15 · Founders */}
      <FounderSection />

      {/* 16 · Final CTA */}
      <section className="closing-block" id="contact">
        <div className="closing-grid-bg" aria-hidden="true" />
        <div className="block-inner closing-inner">
          <Reveal>
            <h2>Help put the first site brain and robots to work on a range.</h2>
          </Reveal>
          <Reveal>
            <p className="closing-body">
              We are looking for pilot facilities, equipment partners, and collaborators who want to evaluate the first range-ball workflow in a real operating environment.
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

      {/* 17 · Footer */}
      <footer>
        <a className="brand footer-brand" href="#top" aria-label="Back to top">
          <BrandLockup />
        </a>
        <p>SITE BRAIN + ROBOTIC WORKFORCE FOR OUTDOOR FACILITIES</p>
        <div>
          <a href={`https://${site.domain}`}>{site.domain}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>© 2026 {site.brand}</span>
        </div>
      </footer>
    </main>
  );
}

import dynamic from "next/dynamic";
import EarthExperience from "../components/earth/EarthExperience";
import FluidMenu from "../components/manifesto/FluidMenu";
import FounderSection, { founders } from "../components/manifesto/FounderSection";
import IntelligenceSection from "../components/manifesto/IntelligenceSection";
import WorkflowStory from "../components/manifesto/WorkflowStory";
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

const chapters = [
  {
    id: "top",
    content: (
      <div className="ez-copy ez-copy--hero">
        <div className="eyebrow hero-fade"><span className="pulse" /> AUTONOMOUS OPERATIONS FOR GOLF FACILITIES</div>
        <h1 className="hero-fade">One operating layer for autonomous golf facilities.</h1>
        <p className="ez-body hero-fade">
          NXTektal is building an operating layer designed to connect robots, sensors, people, and the equipment already on site—so repetitive work can be planned, executed, verified, and improved as one system.
        </p>
        <p className="hero-start hero-fade">Starting with <span>closed-loop ball operations</span> at driving ranges.</p>
        <div className="hero-actions hero-fade">
          <a className="button button-primary" href="#pilot">
            Become a Pilot Facility <Arrow />
          </a>
          <a className="button button-secondary" href="#first-workflow">
            Explore the First Workflow
          </a>
        </div>
      </div>
    ),
  },
];

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

const devStatus = [
  { name: "Collection hardware", status: "Prototype development" },
  { name: "Range Operations Agent", status: "Early product development" },
  { name: "Automated handoff", status: "Engineering development" },
  { name: "Closed-loop field operation", status: "Pilot validation target" },
];

const roadmapStages = [
  {
    label: "STARTING POINT",
    title: "Range ball operations",
    status: "In development",
    active: true,
    items: [
      "Ball availability monitoring",
      "Demand-responsive dispatch",
      "Collection",
      "Automated handoff",
      "Wash-and-dispense coordination",
      "Workflow verification",
    ],
  },
  {
    label: "PLANNED EXPANSION",
    title: "Inspection and grounds care",
    status: "Platform direction",
    active: false,
    items: [
      "Drone inspection and mapping",
      "Turf and soil monitoring",
      "Bunker raking",
      "Localized maintenance",
      "Mowing coordination",
      "Equipment inspection",
    ],
  },
  {
    label: "LONG-TERM DIRECTION",
    title: "Facility-wide autonomy",
    status: "Long-term direction",
    active: false,
    items: [
      "Shared facility maps",
      "Multi-robot scheduling",
      "Predictive maintenance",
      "Equipment logistics",
      "Human-and-robot task coordination",
      "Facility-wide operational reporting",
    ],
  },
];

const beyondEnvironments = ["Campuses", "Parks", "Sports facilities", "Resorts", "Commercial landscapes"];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    url: `https://${site.domain}`,
    logo: `https://${site.domain}/brand/nxtektal-lockup.png`,
    email: site.email,
    description:
      "NXTektal is building an operating layer that coordinates robots, sensors, and AI agents for autonomous golf facility operations, starting with closed-loop ball operations at driving ranges.",
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
      <header className="site-header">
        <div className="header-shell">
          <a className="brand" href="#top" aria-label="NXTektal Systems home">
            <BrandLockup />
          </a>
          <nav aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>
          <div className="header-end">
            <a className="header-cta" href="#pilot">
              Become a Pilot <Arrow />
            </a>
            <FluidMenu items={navItems} />
          </div>
        </div>
      </header>

      {/* 2 · Hero (cinematic sequence) */}
      <EarthExperience chapters={chapters} />

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
            <div className="why-cards">
              {whyCards.map((card, index) => (
                <Reveal key={card.title} delay={index * 90}>
                  <article className="why-card">
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
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
              Our first system is being developed to monitor ball availability, dispatch collection when needed, return to a handoff point, transfer balls into the range’s existing processing equipment, and verify that the workflow is complete.
            </p>
          </Reveal>
          <WorkflowStory />
          <div className="system-cards">
            {systemComponents.map((component, index) => (
              <Reveal key={component.title} delay={index * 90}>
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
              NXTektal is being designed around common wash-and-dispense configurations rather than requiring a facility to replace its entire system. Site-specific calibration and modular adapters connect the workflow where needed.
            </p>
          </Reveal>
          <div className="compare-grid">
            <Reveal>
              <article className="compare-card">
                <h3>Traditional closed system</h3>
                <p>Requires multiple proprietary components to be replaced together.</p>
              </article>
            </Reveal>
            <Reveal delay={90}>
              <article className="compare-card compare-card--nxt">
                <h3>NXTektal approach</h3>
                <p>Adds a coordinated collection and handoff layer around compatible equipment already on site.</p>
              </article>
            </Reveal>
          </div>
          <Reveal>
            <div className="flow-compare" role="group" aria-label="Ball workflow before and after NXTektal">
              <div className="flow-row">
                <span className="flow-row-label">CURRENT WORKFLOW — MANUAL COORDINATION</span>
                <div className="flow-chain">
                  <div className="flow-node flow-node--existing"><strong>Collector</strong><span>EXISTING EQUIPMENT</span></div>
                  <span className="flow-arrow" aria-hidden="true">→</span>
                  <div className="flow-node flow-node--manual"><strong>Manual unloading</strong><span>MANUAL</span></div>
                  <span className="flow-arrow" aria-hidden="true">→</span>
                  <div className="flow-node flow-node--existing"><strong>Washer</strong><span>EXISTING EQUIPMENT</span></div>
                  <span className="flow-arrow" aria-hidden="true">→</span>
                  <div className="flow-node flow-node--manual"><strong>Manual transfer</strong><span>MANUAL</span></div>
                  <span className="flow-arrow" aria-hidden="true">→</span>
                  <div className="flow-node flow-node--existing"><strong>Dispenser</strong><span>EXISTING EQUIPMENT</span></div>
                </div>
              </div>
              <div className="flow-row flow-row--nxt">
                <span className="flow-row-label">NXTEKTAL WORKFLOW — IN DEVELOPMENT</span>
                <div className="flow-chain">
                  <div className="flow-node flow-node--auto"><strong>Monitor &amp; Dispatch</strong><span>NXTEKTAL</span></div>
                  <span className="flow-arrow" aria-hidden="true">→</span>
                  <div className="flow-node flow-node--auto"><strong>Autonomous Collection</strong><span>NXTEKTAL</span></div>
                  <span className="flow-arrow" aria-hidden="true">→</span>
                  <div className="flow-node flow-node--auto"><strong>Modular Handoff</strong><span>NXTEKTAL</span></div>
                  <span className="flow-arrow" aria-hidden="true">→</span>
                  <div className="flow-node flow-node--existing"><strong>Existing Washer &amp; Dispenser</strong><span>KEPT ON SITE</span></div>
                  <span className="flow-arrow" aria-hidden="true">→</span>
                  <div className="flow-node flow-node--auto"><strong>Verify</strong><span>NXTEKTAL</span></div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <p className="ez-note">Compatibility is validated site by site during assessment and pilot planning.</p>
          </Reveal>
        </div>
      </section>

      {/* 7 · Development status */}
      <section className="status-block" aria-label="Current development status">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">WHAT WE ARE BUILDING NOW</div>
            <ul className="status-grid">
              {devStatus.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong>
                  <span>{item.status}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 8 · ROI */}
      <QuickCalculator />

      {/* 9 · Pilot CTA */}
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
          <Reveal>
            <div className="closing-actions">
              <a className="button button-primary" href={pilotMail}>
                Become a Pilot Facility <Arrow />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10 · Agent intelligence + 11 · Illustrative manager report */}
      <IntelligenceSection />

      {/* 12 · Expansion across golf */}
      <section className="block section-light expansion-block" id="expansion">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">EXPANDING ACROSS GOLF</div>
            <h2>One operating layer. More workflows over time.</h2>
          </Reveal>
          <Reveal>
            <div className="layer-band" aria-hidden="true">
              <strong>NXTektal Operating Layer</strong>
              <span>Shared facility state · Prioritization · Dispatch · Verification</span>
            </div>
          </Reveal>
          <div className="roadmap-stages">
            {roadmapStages.map((stage, index) => (
              <Reveal key={stage.title} delay={index * 90}>
                <article className={`roadmap-stage${stage.active ? " roadmap-stage--active" : ""}`}>
                  <span className="roadmap-tether" aria-hidden="true" />
                  <span className="roadmap-label">{stage.label}</span>
                  <h3>{stage.title}</h3>
                  <ul>
                    {stage.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <span className="roadmap-status">{stage.status}</span>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="ez-note">
              New workflows join as execution modules on the same operating layer — not as separate, disconnected products.
            </p>
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
              The specific tasks change, but the operating loop remains: sense, prioritize, dispatch, execute, verify, and improve. Over time, the same coordination layer can extend to other managed outdoor environments.
            </p>
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
          <Reveal>
            <p className="beyond-vision">Outdoor work will not run on fixed schedules forever.</p>
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

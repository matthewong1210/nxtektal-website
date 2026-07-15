import EarthExperience from "../components/earth/EarthExperience";
import FounderSection, { founders } from "../components/manifesto/FounderSection";
import MachineSection from "../components/manifesto/MachineSection";
import Reveal from "./reveal";

const site = {
  brand: "NXTektal Systems",
  shortBrand: "NXTektal",
  email: "founders@nxtektal.com",
  domain: "nxtektal.com",
};

const investorMail = `mailto:${site.email}?subject=Investor%20conversation`;
const pilotMail = `mailto:${site.email}?subject=Pilot%20partnership`;

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="icon-arrow">
    <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BrandMark = ({ compact = false }: { compact?: boolean }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 74 50"
    className={compact ? "brand-mark compact" : "brand-mark"}
  >
    <defs>
      <linearGradient id="nx-silver" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.48" stopColor="#cfd4d8" />
        <stop offset="1" stopColor="#707780" />
      </linearGradient>
      <linearGradient id="nx-lime" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#c7ff3d" />
        <stop offset="1" stopColor="#7dbd10" />
      </linearGradient>
    </defs>
    <path d="M4 44 18 9h10L15 44Z" fill="url(#nx-silver)" />
    <path d="M18 9h13l21 35H38Z" fill="url(#nx-lime)" />
    <path d="M50 4h16L50 44H35Z" fill="url(#nx-silver)" />
  </svg>
);

const chapters = [
  {
    id: "top",
    content: (
      <div className="ez-copy ez-copy--hero">
        <div className="eyebrow hero-fade"><span className="pulse" /> AUTONOMOUS OUTDOOR OPERATIONS</div>
        <h1 className="hero-fade">Outdoor work will not run on fixed schedules forever.</h1>
        <p className="ez-body hero-fade">
          NXTektal is building the operating system for autonomous outdoor work—systems that continuously understand the environment, decide what needs attention, and coordinate machines to act.
        </p>
        <p className="hero-start hero-fade">We are starting <span>in golf.</span></p>
        <div className="hero-actions hero-fade">
          <a className="button button-primary" href={investorMail}>
            Talk to the founders <Arrow />
          </a>
          <a className="button button-secondary" href="#starting-point">
            See where we begin
          </a>
        </div>
      </div>
    ),
  },
  {
    id: "thesis",
    content: (
      <div className="ez-copy">
        <div className="eyebrow">THE THESIS</div>
        <h2>The environment changes.<br />The work should respond.</h2>
        <div className="ez-paragraphs">
          <p>
            Outdoor environments never stop changing. Ball inventories fall. Turf degrades. Weather shifts. People, vehicles, and equipment move constantly. Yet the work is still organized through fixed schedules, manual inspection, isolated machines, and repeated handoffs.
          </p>
          <p>
            The next generation of outdoor infrastructure will not be defined by more disconnected robots. It will be defined by a system that understands the environment, decides what needs attention, coordinates machines to act, verifies the outcome, and improves through real operation.
          </p>
        </div>
        <p className="ez-close">Robots execute the work. <span>NXTektal coordinates the system.</span></p>
      </div>
    ),
  },
  {
    id: "observation",
    content: (
      <div className="ez-copy">
        <figure className="observation">
          <figcaption className="observation-label"><i aria-hidden="true" /> FIELD OBSERVATION</figcaption>
          <blockquote>
            At one driving range, staff leave roughly <em>every two hours</em> for collection runs that take <em>more than an hour</em>—then manually lift and transfer the balls, while dispensers can <em>still run empty</em>.
          </blockquote>
          <p className="observation-close">That is where NXTektal begins.</p>
        </figure>
      </div>
    ),
  },
  {
    id: "starting-point",
    content: (
      <div className="ez-copy">
        <div className="eyebrow">WHERE WE BEGIN</div>
        <h2>One complete workflow, before an entire platform.</h2>
        <div className="ez-paragraphs">
          <p>
            NXTektal is developing a demand-responsive ball collection and handoff system for golf ranges. It is designed to monitor ball availability, dispatch a purpose-built robot when collection is needed, unload into a range’s existing processing equipment, and return to charge.
          </p>
          <p>
            The goal is simple: keep ball supply moving while removing the routine manual handoffs between collection runs.
          </p>
        </div>
        <p className="workflow-line" aria-label="Workflow: monitor, dispatch, collect, handoff, recharge">
          {["MONITOR", "DISPATCH", "COLLECT", "HANDOFF", "RECHARGE"].map((step, index) => (
            <span key={step} className="workflow-step">
              {index > 0 && <i aria-hidden="true">→</i>}
              {step}
            </span>
          ))}
        </p>
        <p className="ez-note">
          Designed to work with existing wash-and-dispense infrastructure rather than requiring a facility to replace its entire system.
        </p>
      </div>
    ),
  },
  {
    id: "vision",
    content: (
      <div className="ez-copy">
        <div className="eyebrow">THE DIRECTION</div>
        <h2>One task at a time.<br />One environment at a time.</h2>
        <div className="ez-paragraphs">
          <p>
            Ball collection is the first workflow, not the final definition of the company. The same foundation—mapping, perception, mission planning, autonomous docking, remote operations, and field reliability—can support progressively broader maintenance work across golf facilities and, over time, other managed outdoor environments.
          </p>
          <p>
            NXTektal is not building a collection of disconnected machines. <span className="ez-strong">It is building the system that coordinates them.</span>
          </p>
        </div>
        <div className="direction-sequence" aria-label="Direction: golf ranges, then golf facilities, then managed outdoor environments">
          <span>GOLF RANGES</span>
          <span><i aria-hidden="true">→</i> GOLF FACILITIES</span>
          <span><i aria-hidden="true">→</i> MANAGED OUTDOOR ENVIRONMENTS</span>
        </div>
      </div>
    ),
  },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    url: `https://${site.domain}`,
    email: site.email,
    description:
      "NXTektal Systems is building the operating system for autonomous outdoor work, starting with demand-responsive ball collection and handoff for golf ranges.",
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

      <header className="site-header">
        <div className="header-shell">
          <a className="brand" href="#top" aria-label="NXTektal Systems home">
            <BrandMark />
            <span className="brand-type"><strong>{site.shortBrand}</strong><small>SYSTEMS</small></span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#thesis">Thesis</a>
            <a href="#starting-point">Where we begin</a>
            <a href="#vision">Vision</a>
            <a href="#founders">Founders</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="header-cta" href={investorMail}>
            Talk to the founders <Arrow />
          </a>
        </div>
      </header>

      <EarthExperience chapters={chapters} />

      <MachineSection />

      <FounderSection />

      <section className="closing-block" id="contact">
        <div className="closing-grid-bg" aria-hidden="true" />
        <div className="block-inner closing-inner">
          <Reveal>
            <p className="closing-statement">
              MORE PRECISE CARE.<br />
              LESS DANGEROUS WORK.<br />
              FEWER UNNECESSARY INTERVENTIONS.
            </p>
          </Reveal>
          <Reveal>
            <h2>One workflow today. A new operating layer over time.</h2>
          </Reveal>
          <Reveal>
            <p className="closing-body">
              NXTektal is building toward outdoor environments that can continuously sense what is happening, decide what needs attention, and coordinate machines to act—while people focus on judgment, service, and relationships.
            </p>
          </Reveal>
          <Reveal>
            <div className="closing-actions">
              <a className="button button-primary" href={investorMail}>Talk to the founders <Arrow /></a>
              <a className="text-link" href={pilotMail}>Pilot partnerships <Arrow /></a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <BrandMark />
          <span className="brand-type"><strong>{site.shortBrand}</strong><small>SYSTEMS</small></span>
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

import Reveal from "./reveal";

const site = {
  brand: "NXTektal Systems",
  shortBrand: "NXTektal",
  email: "founders@nxtektal.com",
  domain: "nxtektal.com",
};

const investorMail = `mailto:${site.email}?subject=Investor%20conversation`;
const pilotMail = `mailto:${site.email}?subject=Pilot%20partnership`;

const founders = [
  {
    initials: "MH",
    name: "Matthew Huang",
    role: "Co-Founder & Chief Executive Officer",
    email: "matthew@nxtektal.com",
    bio: "Matthew is a UC Berkeley graduate with experience spanning business development, financial services, sales, and early-stage ventures. At NXTektal, he leads company strategy, customer development, fundraising, and North American partnerships—connecting real-world operational needs with the company’s engineering and manufacturing capabilities.",
  },
  {
    initials: "SG",
    name: "Steven Guo",
    role: "Co-Founder & Chief Technology Officer",
    email: "steven@nxtektal.com",
    bio: "Steven is a UC Berkeley student studying Physics and Economics, with hands-on experience in mechanical engineering, Formula SAE, and competitive robotics. At NXTektal, he leads robotics engineering, system architecture, and product development.",
  },
  {
    initials: "JC",
    name: "Jason Chen",
    role: "Co-Founder & Chief Operating Officer",
    email: "jasonchen@nxtektal.com",
    bio: "Jason is an engineering student at the University of British Columbia with access to a multi-factory manufacturing network, established component and electronics suppliers, and export channels serving Europe and the United States. At NXTektal, he leads manufacturing, supply chain, production, and China operations.",
  },
];

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

const ConceptScene = () => (
  <div className="concept-stage">
    <svg
      viewBox="0 0 1440 560"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label="NXTektal autonomous outdoor robot concept visualization"
    >
      <defs>
        <linearGradient id="scene-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1117" />
          <stop offset="0.55" stopColor="#141c16" />
          <stop offset="1" stopColor="#0e160f" />
        </linearGradient>
        <linearGradient id="scene-ground" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d2e18" />
          <stop offset="0.5" stopColor="#132212" />
          <stop offset="1" stopColor="#0b130c" />
        </linearGradient>
        <linearGradient id="robot-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d6d9d7" />
          <stop offset="0.55" stopColor="#7b817e" />
          <stop offset="1" stopColor="#353b39" />
        </linearGradient>
        <linearGradient id="robot-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#20292b" />
          <stop offset="1" stopColor="#070c0f" />
        </linearGradient>
        <radialGradient id="scene-glow" cx="62%" cy="46%" r="46%">
          <stop offset="0" stopColor="#a6e22e" stopOpacity="0.13" />
          <stop offset="1" stopColor="#a6e22e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="scene-shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0d1117" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="#0d1117" stopOpacity="0" />
          <stop offset="0.78" stopColor="#0d1117" stopOpacity="0" />
          <stop offset="1" stopColor="#0d1117" stopOpacity="0.92" />
        </linearGradient>
        <filter id="lime-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="robot-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="blur" />
          <feOffset dy="12" result="offset" />
          <feColorMatrix in="offset" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .55 0" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="1440" height="560" fill="url(#scene-sky)" />
      <rect width="1440" height="560" fill="url(#scene-glow)" />
      <g opacity="0.08" stroke="#f5f7f7" strokeWidth="1">
        {Array.from({ length: 15 }).map((_, i) => <path key={`v-${i}`} d={`M${i * 104} 0v560`} />)}
        {Array.from({ length: 6 }).map((_, i) => <path key={`h-${i}`} d={`M0 ${100 + i * 92}h1440`} />)}
      </g>
      <g fill="#0b120d" opacity="0.95">
        <path d="M0 258c40-38 74-52 108-34 26-52 80-60 112-10 38-50 108-53 140 4 33-33 80-33 113 5 34-44 92-52 130-7 44-41 102-40 132 8 37-37 88-38 121 5 37-50 105-53 141 0 31-37 86-39 119 2 32-38 92-39 124 4 34-40 78-42 100-2v72H0Z" />
        <circle cx="132" cy="212" r="58" /><circle cx="300" cy="216" r="70" /><circle cx="520" cy="204" r="60" /><circle cx="748" cy="216" r="74" /><circle cx="988" cy="202" r="66" /><circle cx="1180" cy="218" r="58" /><circle cx="1350" cy="208" r="52" />
      </g>
      <path d="M0 322c300-46 560-30 790 8 226 37 400 30 650-14v244H0Z" fill="url(#scene-ground)" />
      <path d="M120 470C400 356 660 372 860 438c156 52 306 52 452-14" fill="none" stroke="#a6e22e" strokeOpacity="0.28" strokeWidth="2" strokeDasharray="8 12" />
      <g fill="#f2f3ee" stroke="#aeb4b0" strokeWidth="1" opacity="0.85">
        <circle cx="255" cy="472" r="7" /><circle cx="360" cy="438" r="6" /><circle cx="470" cy="486" r="7" /><circle cx="586" cy="424" r="5" /><circle cx="1210" cy="480" r="6" />
      </g>
      <g filter="url(#robot-shadow)" transform="translate(760 236) scale(0.98)">
        <ellipse cx="180" cy="213" rx="174" ry="28" fill="#030606" opacity="0.72" />
        <g>
          <circle cx="57" cy="192" r="43" fill="#111616" stroke="#353b3b" strokeWidth="9" />
          <circle cx="57" cy="192" r="19" fill="#090d0e" stroke="#6b7280" strokeWidth="4" />
          <circle cx="291" cy="192" r="43" fill="#111616" stroke="#353b3b" strokeWidth="9" />
          <circle cx="291" cy="192" r="19" fill="#090d0e" stroke="#6b7280" strokeWidth="4" />
        </g>
        <path d="M31 174 56 85c8-27 27-42 56-45l122-9c28-2 50 10 66 36l42 67c8 13 3 31-11 39l-33 19H58c-21 0-33-8-27-18Z" fill="url(#robot-body)" stroke="#d8dcda" strokeOpacity="0.36" />
        <path d="M103 53 224 45c24-2 42 8 56 29l21 34H81l18-48c1-3 2-5 4-7Z" fill="url(#robot-glass)" stroke="#9ea5a4" strokeOpacity="0.55" />
        <path d="M82 119h222" stroke="#a6e22e" strokeWidth="8" strokeLinecap="round" filter="url(#lime-glow)" />
        <path d="M129 33h99l12 15H115Z" fill="#13191a" stroke="#747b7c" />
        <rect x="152" y="19" width="62" height="17" rx="7" fill="#121819" stroke="#7e8585" />
        <circle cx="166" cy="27.5" r="4" fill="#a6e22e" filter="url(#lime-glow)" />
        <circle cx="200" cy="27.5" r="4" fill="#d6dbda" />
        <path d="M193 82h38" stroke="#a6e22e" strokeWidth="3" />
        <text x="190" y="103" fill="#1a201f" fontSize="18" fontWeight="700" letterSpacing="2">NXTektal</text>
        <path d="M27 163h317" stroke="#141a19" strokeWidth="8" />
        <path d="M128 139h84" stroke="#242a29" strokeWidth="3" />
      </g>
      <rect width="1440" height="560" fill="url(#scene-shade)" />
    </svg>
    <div className="concept-scanline" aria-hidden="true" />
    <div className="concept-tag"><i aria-hidden="true" /> CONCEPT VISUAL</div>
  </div>
);

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

      <section className="hero" id="top">
        <div className="hero-inner">
          <div className="eyebrow hero-fade"><span className="pulse" /> AUTONOMOUS OUTDOOR OPERATIONS</div>
          <h1 className="hero-fade">Outdoor work will not run on fixed schedules forever.</h1>
          <p className="hero-subtitle hero-fade">
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
        <ConceptScene />
      </section>

      <section className="block thesis-block" id="thesis" aria-label="Company thesis">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">THE THESIS</div>
            <h2>The environment changes.<br />The work should respond.</h2>
          </Reveal>
          <div className="thesis-body">
            <Reveal>
              <p>
                Outdoor environments never stop changing. Ball inventories fall. Turf degrades. Weather shifts. People, vehicles, and equipment move constantly. Yet the work is still organized through fixed schedules, manual inspection, isolated machines, and repeated handoffs.
              </p>
            </Reveal>
            <Reveal>
              <p>
                The next generation of outdoor infrastructure will not be defined by more disconnected robots. It will be defined by a system that understands the environment, decides what needs attention, coordinates machines to act, verifies the outcome, and improves through real operation.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <p className="thesis-close">Robots execute the work. <span>NXTektal coordinates the system.</span></p>
          </Reveal>
        </div>
      </section>

      <section className="observation-block" aria-label="Field observation">
        <div className="block-inner">
          <Reveal>
            <figure className="observation">
              <figcaption className="observation-label"><i aria-hidden="true" /> FIELD OBSERVATION</figcaption>
              <blockquote>
                At one driving range, staff leave roughly <em>every two hours</em> for collection runs that take <em>more than an hour</em>—then manually lift and transfer the balls, while dispensers can <em>still run empty</em>.
              </blockquote>
              <p className="observation-close">That is where NXTektal begins.</p>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="block begin-block" id="starting-point">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">WHERE WE BEGIN</div>
            <h2>One complete workflow, before an entire platform.</h2>
          </Reveal>
          <div className="begin-body">
            <Reveal>
              <p>
                NXTektal is developing a demand-responsive ball collection and handoff system for golf ranges. It is designed to monitor ball availability, dispatch a purpose-built robot when collection is needed, unload into a range’s existing processing equipment, and return to charge.
              </p>
            </Reveal>
            <Reveal>
              <p>
                The goal is simple: keep ball supply moving while removing the routine manual handoffs between collection runs.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <p className="workflow-line" aria-label="Workflow: monitor, dispatch, collect, handoff, recharge">
              {["MONITOR", "DISPATCH", "COLLECT", "HANDOFF", "RECHARGE"].map((step, index) => (
                <span key={step} className="workflow-step">
                  {index > 0 && <i aria-hidden="true">→</i>}
                  {step}
                </span>
              ))}
            </p>
          </Reveal>
          <Reveal>
            <p className="begin-note">
              Designed to work with existing wash-and-dispense infrastructure rather than requiring a facility to replace its entire system.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="block vision-block" id="vision">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">THE DIRECTION</div>
            <h2>One task at a time.<br />One environment at a time.</h2>
          </Reveal>
          <div className="vision-body">
            <Reveal>
              <p>
                Ball collection is the first workflow, not the final definition of the company. The same foundation—mapping, perception, mission planning, autonomous docking, remote operations, and field reliability—can support progressively broader maintenance work across golf facilities and, over time, other managed outdoor environments.
              </p>
            </Reveal>
            <Reveal>
              <p>
                NXTektal is not building a collection of disconnected machines. <span>It is building the system that coordinates them.</span>
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="direction-sequence" aria-label="Direction: golf ranges, then golf facilities, then managed outdoor environments">
              <span>GOLF RANGES</span>
              <span><i aria-hidden="true">→</i> GOLF FACILITIES</span>
              <span><i aria-hidden="true">→</i> MANAGED OUTDOOR ENVIRONMENTS</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="block founders-block" id="founders">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">THE FOUNDERS</div>
            <h2>Built across markets, machines, and manufacturing.</h2>
            <p className="founders-intro">
              NXTektal brings together customer development and capital, robotics and systems engineering, and global manufacturing execution.
            </p>
          </Reveal>
          <div className="founders-grid">
            {founders.map((founder, index) => (
              <Reveal key={founder.name} delay={index * 90}>
                <article className="founder">
                  <div className="founder-initials" aria-hidden="true">{founder.initials}</div>
                  <h3>{founder.name}</h3>
                  <p className="founder-role">{founder.role}</p>
                  <p className="founder-bio">{founder.bio}</p>
                  <a
                    className="founder-email"
                    href={`mailto:${founder.email}`}
                    aria-label={`Email ${founder.name}`}
                  >
                    {founder.email} <Arrow />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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

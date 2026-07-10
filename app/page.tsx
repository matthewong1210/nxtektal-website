const site = {
  brand: "NXTektal Systems",
  shortBrand: "NXTektal",
  email: "founders@nxtektal.com",
  domain: "nxtektal.com",
};

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="icon-arrow">
    <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Check = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="icon-check">
    <path d="m4 10 3.4 3.4L16 5.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

const WorkflowIcon = ({ type }: { type: "sense" | "dispatch" | "collect" | "handoff" | "dock" }) => {
  const paths = {
    sense: <><circle cx="12" cy="12" r="3" /><path d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8M8.7 8.7a4.7 4.7 0 0 0 0 6.6M15.3 8.7a4.7 4.7 0 0 1 0 6.6" /></>,
    dispatch: <><path d="M4 18V9l8-5 8 5v9" /><path d="M8 18v-5h8v5M12 4v9" /></>,
    collect: <><circle cx="8" cy="17" r="2" /><circle cx="17" cy="17" r="2" /><path d="M3 7h13l3 7H6L3 7Zm2-3v3M10 4v3M15 4v3" /></>,
    handoff: <><path d="M4 6h10v8H4zM14 10h6M17 7l3 3-3 3M7 18h10" /></>,
    dock: <><rect x="4" y="5" width="12" height="14" rx="2" /><path d="M16 9h3v6h-3M8 9h4M10 7v4" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="workflow-icon" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[type]}</svg>;
};

const LayerIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="layer-icon" aria-hidden="true">{children}</div>
);

const FeatureIcon = ({ type }: { type: "autonomous" | "intelligent" | "sustainable" }) => {
  const icons = {
    autonomous: <><path d="M12 4c-3 4-5 7-5 10a5 5 0 0 0 10 0c0-3-2-6-5-10Z" /><path d="M9.5 15.5c1.7-.2 3.2-1 4.5-2.5" /><path d="M4 18c2.2-1.6 3.4-3.8 3.7-6.5M20 18c-2.2-1.6-3.4-3.8-3.7-6.5" /></>,
    intelligent: <><rect x="5" y="6" width="14" height="13" rx="2" /><path d="M9 6V4h6v2M9 11h6M9 15h3" /><circle cx="16" cy="15" r="1.5" /></>,
    sustainable: <><circle cx="12" cy="12" r="8" /><path d="M4 12h16M12 4c2.3 2.3 3.5 5 3.5 8S14.3 17.7 12 20c-2.3-2.3-3.5-5-3.5-8S9.7 6.3 12 4Z" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">{icons[type]}</svg>;
};

const FieldScene = () => (
  <div className="field-stage" aria-hidden="true">
    <div className="field-toolbar">
      <div className="field-brand"><BrandMark compact /><span>NXTektal</span></div>
      <div className="field-status"><i /> CONCEPT VISUAL</div>
    </div>
    <div className="field-scene">
      <svg viewBox="0 0 940 620" role="presentation">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1f2525" />
            <stop offset="0.55" stopColor="#1a211c" />
            <stop offset="1" stopColor="#10170f" />
          </linearGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#263b1f" />
            <stop offset="0.5" stopColor="#182b17" />
            <stop offset="1" stopColor="#0d1710" />
          </linearGradient>
          <linearGradient id="fairway" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#435c29" stopOpacity="0.82" />
            <stop offset="1" stopColor="#1a2b16" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="robotBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d6d9d7" />
            <stop offset="0.55" stopColor="#7b817e" />
            <stop offset="1" stopColor="#353b39" />
          </linearGradient>
          <linearGradient id="robotGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#20292b" />
            <stop offset="1" stopColor="#070c0f" />
          </linearGradient>
          <radialGradient id="sceneGlow" cx="70%" cy="38%" r="55%">
            <stop offset="0" stopColor="#a6e22e" stopOpacity="0.18" />
            <stop offset="1" stopColor="#a6e22e" stopOpacity="0" />
          </radialGradient>
          <filter id="limeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="robotShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="blur" />
            <feOffset dy="12" result="offset" />
            <feColorMatrix in="offset" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .55 0" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect width="940" height="620" fill="url(#sky)" />
        <rect width="940" height="620" fill="url(#sceneGlow)" />
        <g opacity="0.18" stroke="#f5f7f7" strokeWidth="1">
          {Array.from({ length: 13 }).map((_, i) => <path key={`v-${i}`} d={`M${60 + i * 70} 0v620`} />)}
          {Array.from({ length: 8 }).map((_, i) => <path key={`h-${i}`} d={`M0 ${70 + i * 70}h940`} />)}
        </g>
        <g fill="#0d1512" opacity="0.96">
          <path d="M0 283c30-35 54-48 80-32 20-49 60-57 84-9 29-47 82-50 106 4 25-31 60-31 85 5 26-41 70-49 99-6 34-39 78-38 100 8 28-35 67-36 92 5 28-47 80-50 107 0 24-35 65-37 90 2 24-36 59-37 83 4v74H0Z" />
          <circle cx="99" cy="233" r="56" /><circle cx="224" cy="236" r="68" /><circle cx="393" cy="226" r="58" /><circle cx="566" cy="236" r="71" /><circle cx="748" cy="224" r="64" /><circle cx="864" cy="240" r="54" />
        </g>
        <path d="M0 340C210 293 388 311 548 345c157 34 255 28 392-10v285H0Z" fill="url(#ground)" />
        <path d="M-20 443c185-67 350-86 517-51 168 36 284 27 463-40v268H-20Z" fill="url(#fairway)" opacity="0.82" />
        <path d="M36 527c188-74 350-94 500-60 137 30 250 14 401-43" fill="none" stroke="#9ec736" strokeOpacity="0.14" strokeWidth="2" />
        <path d="M118 482C288 386 450 400 574 461c97 48 192 49 283-11" fill="none" stroke="#a6e22e" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="8 10" />
        <g fill="#f2f3ee" stroke="#aeb4b0" strokeWidth="1">
          <circle cx="165" cy="506" r="8" /><circle cx="250" cy="472" r="7" /><circle cx="333" cy="516" r="7" /><circle cx="414" cy="449" r="6" /><circle cx="742" cy="510" r="7" /><circle cx="818" cy="477" r="7" />
        </g>
        <g filter="url(#robotShadow)" transform="translate(465 292)">
          <ellipse cx="180" cy="213" rx="174" ry="28" fill="#030606" opacity="0.72" />
          <g>
            <circle cx="57" cy="192" r="43" fill="#111616" stroke="#353b3b" strokeWidth="9" />
            <circle cx="57" cy="192" r="19" fill="#090d0e" stroke="#6b7280" strokeWidth="4" />
            <circle cx="291" cy="192" r="43" fill="#111616" stroke="#353b3b" strokeWidth="9" />
            <circle cx="291" cy="192" r="19" fill="#090d0e" stroke="#6b7280" strokeWidth="4" />
          </g>
          <path d="M31 174 56 85c8-27 27-42 56-45l122-9c28-2 50 10 66 36l42 67c8 13 3 31-11 39l-33 19H58c-21 0-33-8-27-18Z" fill="url(#robotBody)" stroke="#d8dcda" strokeOpacity="0.36" />
          <path d="M103 53 224 45c24-2 42 8 56 29l21 34H81l18-48c1-3 2-5 4-7Z" fill="url(#robotGlass)" stroke="#9ea5a4" strokeOpacity="0.55" />
          <path d="M82 119h222" stroke="#a6e22e" strokeWidth="8" strokeLinecap="round" filter="url(#limeGlow)" />
          <path d="M129 33h99l12 15H115Z" fill="#13191a" stroke="#747b7c" />
          <rect x="152" y="19" width="62" height="17" rx="7" fill="#121819" stroke="#7e8585" />
          <circle cx="166" cy="27.5" r="4" fill="#a6e22e" filter="url(#limeGlow)" />
          <circle cx="200" cy="27.5" r="4" fill="#d6dbda" />
          <path d="M193 82h38" stroke="#a6e22e" strokeWidth="3" />
          <text x="190" y="103" fill="#1a201f" fontSize="18" fontWeight="700" letterSpacing="2">NXTektal</text>
          <path d="M27 163h317" stroke="#141a19" strokeWidth="8" />
          <path d="M128 139h84" stroke="#242a29" strokeWidth="3" />
        </g>
        <g fontFamily="Inter, Arial, sans-serif" fontSize="13" fontWeight="700" letterSpacing="1.8">
          <g transform="translate(110 377)">
            <circle r="9" fill="#0d1117" stroke="#a6e22e" /><circle r="3" fill="#a6e22e" />
            <text x="18" y="5" fill="#c7cbd0">PICKUP CLUSTER 03</text>
          </g>
          <g transform="translate(818 358)">
            <circle r="9" fill="#0d1117" stroke="#a6e22e" /><circle r="3" fill="#a6e22e" />
            <text x="-158" y="-16" fill="#c7cbd0">ROUTE OPTIMIZED</text>
          </g>
        </g>
      </svg>
      <div className="scene-chip scene-chip-one"><span>68%</span><small>BALL INVENTORY</small></div>
      <div className="scene-chip scene-chip-two"><span>02:14</span><small>MISSION ETA</small></div>
      <div className="scene-coordinate">37.4419° N / 122.1430° W</div>
    </div>
    <div className="field-features">
      <article><FeatureIcon type="autonomous" /><div><strong>Autonomous</strong><span>Robotic operations around the clock.</span></div></article>
      <article><FeatureIcon type="intelligent" /><div><strong>Intelligent</strong><span>AI-driven decisions from live field data.</span></div></article>
      <article><FeatureIcon type="sustainable" /><div><strong>Efficient</strong><span>Precise intervention with less waste.</span></div></article>
    </div>
  </div>
);

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    url: `https://${site.domain}`,
    description:
      "NXTektal Systems is building the autonomy operating system for managed outdoor environments, starting with golf.",
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
            <a href="#system">System</a>
            <a href="#why-golf">Why golf</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#team">Team</a>
          </nav>
          <a className="header-cta" href={`mailto:${site.email}?subject=Investor%20conversation`}>
            Contact us <Arrow />
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse" /> AUTONOMOUS ROBOTICS + AI</div>
            <h1>Autonomy for <span>managed outdoor environments.</span></h1>
            <p className="hero-subtitle">
              Starting with golf, NXTektal is building the intelligence layer that senses outdoor environments, coordinates purpose-built robots, and runs facility workflows as one system.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={`mailto:${site.email}?subject=Investor%20conversation`}>
                Talk to the founders <Arrow />
              </a>
              <a className="button button-secondary" href="#first-workflow">
                Explore the first workflow
              </a>
            </div>
            <div className="hero-proof">
              <div><strong>01</strong><span>Entry point</span><p>Autonomous ball operations</p></div>
              <div><strong>02</strong><span>Platform</span><p>Facility-wide orchestration</p></div>
              <div><strong>03</strong><span>Expansion</span><p>Golf to urban green spaces</p></div>
            </div>
          </div>
          <FieldScene />
        </div>
      </section>

      <section className="statement-band" aria-label="Company thesis">
        <span>AUTONOMY.</span><span>INTELLIGENCE.</span><span>IMPACT.</span>
        <p>Robots are the execution layer. The operating system is the enduring platform.</p>
      </section>

      <section className="section problem-section" id="problem">
        <div className="section-kicker">01 / THE PROBLEM</div>
        <div className="problem-layout">
          <div>
            <h2>Outdoor operations are still manual, fragmented, and reactive.</h2>
          </div>
          <div className="problem-copy">
            <p>
              Facilities rely on people to repeatedly inspect conditions, decide what needs attention, operate isolated machines, and verify the result. The work is often dangerous, physically demanding, and inconsistent.
            </p>
            <div className="field-note">
              <span>FIELD OBSERVATION</span>
              <p>At one driving range, staff leave roughly every two hours for collection runs that take more than an hour—then manually lift and transfer the balls, while dispensers can still run empty.</p>
            </div>
          </div>
        </div>
        <div className="problem-metrics">
          <article><span>01</span><h3>Dangerous work</h3><p>Repetitive outdoor tasks expose teams to moving equipment, weather, lifting, and difficult terrain.</p></article>
          <article><span>02</span><h3>Unstable quality</h3><p>Scheduled maintenance cannot continuously respond to real conditions across the facility.</p></article>
          <article><span>03</span><h3>Fragmented equipment</h3><p>Machines perform individual jobs, but no intelligence coordinates the environment as one system.</p></article>
        </div>
      </section>

      <section className="section workflow-section" id="first-workflow">
        <div className="section-kicker">02 / THE FIRST WORKFLOW</div>
        <div className="workflow-intro">
          <div>
            <div className="mini-label">AUTONOMOUS BALL OPERATIONS</div>
            <h2>Keep every bay supplied—without the manual collection loop.</h2>
          </div>
          <p>
            Our first system is designed to turn ball circulation from a periodic manual task into a demand-responsive autonomous workflow that can integrate with existing wash infrastructure.
          </p>
        </div>
        <div className="workflow-track">
          <article><div className="workflow-number">01</div><WorkflowIcon type="sense" /><h3>Sense demand</h3><p>Monitor ball availability and facility conditions.</p></article>
          <article><div className="workflow-number">02</div><WorkflowIcon type="dispatch" /><h3>Dispatch</h3><p>Launch the right mission at the right time.</p></article>
          <article><div className="workflow-number">03</div><WorkflowIcon type="collect" /><h3>Collect</h3><p>Navigate the range and recover balls autonomously.</p></article>
          <article><div className="workflow-number">04</div><WorkflowIcon type="handoff" /><h3>Handoff</h3><p>Return and unload into the existing ball process.</p></article>
          <article><div className="workflow-number">05</div><WorkflowIcon type="dock" /><h3>Dock & learn</h3><p>Recharge, verify results, and improve the next mission.</p></article>
        </div>
        <div className="workflow-outcomes">
          <div><Check /><span>More consistent ball availability</span></div>
          <div><Check /><span>Less manual lifting and handling</span></div>
          <div><Check /><span>Lower long-term operating cost</span></div>
          <div><Check /><span>A data foundation for future workflows</span></div>
        </div>
      </section>

      <section className="section system-section" id="system">
        <div className="section-kicker">03 / THE OPERATING SYSTEM</div>
        <div className="system-heading">
          <h2>One intelligence layer.<br />Many machines. Every workflow.</h2>
          <p>
            The long-term product is not a collection of isolated robots. It is a closed-loop operating system that understands the environment, prioritizes work, coordinates machines, and learns from every task.
          </p>
        </div>
        <div className="system-loop" aria-label="Sense, decide, dispatch, execute, verify, learn">
          {['Sense', 'Decide', 'Dispatch', 'Execute', 'Verify', 'Learn'].map((item, index) => (
            <div className="loop-step" key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
              {index < 5 && <i aria-hidden="true">→</i>}
            </div>
          ))}
        </div>
        <div className="platform-layers">
          <article>
            <LayerIcon>
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7" /></svg>
            </LayerIcon>
            <div><span>01</span><h3>Environmental intelligence</h3><p>Build a live understanding of terrain, assets, conditions, demand, and maintenance needs.</p></div>
          </article>
          <article>
            <LayerIcon>
              <svg viewBox="0 0 24 24"><path d="M5 5h14v14H5zM8 9h8M8 13h5M8 17h8" /></svg>
            </LayerIcon>
            <div><span>02</span><h3>Mission control</h3><p>Prioritize tasks, select equipment, plan routes, and coordinate multiple workflows from one system.</p></div>
          </article>
          <article>
            <LayerIcon>
              <svg viewBox="0 0 24 24"><path d="M5 15h14l-2-7H7l-2 7ZM7 15v3M17 15v3M9 5h6M12 5v3" /><circle cx="8" cy="19" r="1" /><circle cx="16" cy="19" r="1" /></svg>
            </LayerIcon>
            <div><span>03</span><h3>Robotic execution</h3><p>Purpose-built machines carry out collection, transport, turf care, inspection, and maintenance.</p></div>
          </article>
          <article>
            <LayerIcon>
              <svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6" /><path d="M20 12a8 8 0 1 1-4-7" /></svg>
            </LayerIcon>
            <div><span>04</span><h3>Verification & learning</h3><p>Confirm outcomes, capture field data, recover from exceptions, and improve every future mission.</p></div>
          </article>
        </div>
      </section>

      <section className="section why-section" id="why-golf">
        <div className="section-kicker">04 / WHY GOLF</div>
        <div className="why-grid">
          <div className="why-quote">
            <span>THE WEDGE</span>
            <blockquote>Golf is not the destination. It is the commercial training ground for outdoor autonomy.</blockquote>
            <div className="terrain-lines" aria-hidden="true"><i /><i /><i /></div>
          </div>
          <div className="why-reasons">
            <article><span>01</span><div><h3>Real outdoor complexity</h3><p>Changing terrain, weather, people, vehicles, and live operations—within a more structured environment than forests or cities.</p></div></article>
            <article><span>02</span><div><h3>Measurable, recurring workflows</h3><p>Collection, mowing, bunker care, turf repair, and equipment logistics create clear performance targets.</p></div></article>
            <article><span>03</span><div><h3>Customers with operating budgets</h3><p>Facilities already spend on labor, machines, maintenance, and the consistency of the player experience.</p></div></article>
            <article><span>04</span><div><h3>A progressive technical path</h3><p>Each new task reuses navigation, mapping, safety, scheduling, charging, and field reliability capabilities.</p></div></article>
          </div>
        </div>
      </section>

      <section className="section roadmap-section" id="roadmap">
        <div className="section-kicker">05 / EXPANSION</div>
        <div className="roadmap-heading">
          <h2>Start narrow. Compound the system. Expand the environment.</h2>
          <p>Every deployment grows the autonomy stack, operating data, and ability to coordinate more machines across more complex outdoor settings.</p>
        </div>
        <div className="roadmap">
          <article className="roadmap-card active">
            <div className="roadmap-top"><span>NOW</span><i>01</i></div>
            <h3>Driving range operations</h3>
            <p>Ball monitoring, autonomous collection, return, unloading, charging, and workflow data.</p>
            <div className="roadmap-tags"><span>Ball circulation</span><span>Navigation</span><span>Charging</span></div>
          </article>
          <article className="roadmap-card">
            <div className="roadmap-top"><span>NEXT</span><i>02</i></div>
            <h3>Golf-course maintenance</h3>
            <p>Mowing, bunker raking, tee-box care, turf inspection, localized repair, and equipment logistics.</p>
            <div className="roadmap-tags"><span>Turf care</span><span>Multi-robot</span><span>Facility map</span></div>
          </article>
          <article className="roadmap-card">
            <div className="roadmap-top"><span>EXPAND</span><i>03</i></div>
            <h3>Managed outdoor environments</h3>
            <p>Parks, campuses, sports facilities, commercial landscapes, and urban green spaces.</p>
            <div className="roadmap-tags"><span>Parks</span><span>Campuses</span><span>Urban green</span></div>
          </article>
          <article className="roadmap-card">
            <div className="roadmap-top"><span>ULTIMATELY</span><i>04</i></div>
            <h3>Complex land management</h3>
            <p>Progressively adapt the platform to less structured terrain, vegetation, inspection, and risk-reduction workflows.</p>
            <div className="roadmap-tags"><span>Land care</span><span>Inspection</span><span>Complex terrain</span></div>
          </article>
        </div>
        <div className="platform-strategy">
          <span>PLATFORM STRATEGY</span>
          <p><strong>Vertically integrated first.</strong> We begin with our own robots to control safety, reliability, and the end-to-end experience. As the system matures, it is designed to coordinate compatible third-party equipment.</p>
        </div>
      </section>

      <section className="section advantage-section">
        <div className="section-kicker">06 / HOW THE ADVANTAGE COMPOUNDS</div>
        <div className="advantage-heading">
          <h2>Hardware earns the deployment.<br />The system compounds the advantage.</h2>
        </div>
        <div className="flywheel" aria-label="Company flywheel">
          <div className="flywheel-center"><span>OUTDOOR</span><strong>AUTONOMY</strong><small>COMPOUNDING LOOP</small></div>
          <div className="flywheel-item flywheel-a"><span>01</span><strong>Cost-efficient hardware</strong><small>Supply chain & design</small></div>
          <div className="flywheel-item flywheel-b"><span>02</span><strong>More deployments</strong><small>Real operating environments</small></div>
          <div className="flywheel-item flywheel-c"><span>03</span><strong>More field data</strong><small>Terrain, missions, exceptions</small></div>
          <div className="flywheel-item flywheel-d"><span>04</span><strong>Higher reliability</strong><small>Planning, recovery, uptime</small></div>
          <div className="flywheel-item flywheel-e"><span>05</span><strong>Lower total cost</strong><small>Labor, service, downtime</small></div>
          <svg aria-hidden="true" className="flywheel-lines" viewBox="0 0 800 560" preserveAspectRatio="none"><ellipse cx="400" cy="280" rx="295" ry="200" /><path d="m673 183 25 7-18 18" /><path d="m561 466 7 25-25-7" /><path d="m225 461-22 12-2-25" /><path d="m104 223-15-21 25-5" /><path d="m410 78 12-22 14 22" /></svg>
        </div>
      </section>

      <section className="section team-section" id="team">
        <div className="section-kicker">07 / FOUNDING TEAM</div>
        <div className="team-heading">
          <h2>Built across markets, machines, and manufacturing.</h2>
          <p>The founding structure brings together the three capabilities required to move from prototype to deployment: customer access, autonomy engineering, and cost-efficient manufacturing.</p>
        </div>
        <div className="team-grid">
          <article><div className="team-monogram">CEO</div><span>FOUNDER & CEO</span><h3>Market, capital, partnerships</h3><p>Customer insight, fundraising, recruiting, and the ability to align the right people around a long-term mission.</p></article>
          <article><div className="team-monogram">AI</div><span>ROBOTICS & AI</span><h3>Autonomy, hardware, systems</h3><p>Navigation, perception, embedded systems, safety architecture, and end-to-end robotic execution.</p></article>
          <article><div className="team-monogram">MFG</div><span>MANUFACTURING</span><h3>Supply chain, cost, scale</h3><p>Hardware sourcing, design-for-manufacture, quality control, and a cost structure built for deployment density.</p></article>
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-grid" aria-hidden="true" />
        <div className="closing-mark" aria-hidden="true"><BrandMark /></div>
        <div className="closing-copy">
          <span>BUILDING THE PHYSICAL INFRASTRUCTURE FOR OUTDOOR AUTONOMY</span>
          <h2>Begin with one workflow.<br />Orchestrate the entire environment.</h2>
          <p>We are opening conversations with investors and select golf-facility partners who share the conviction that outdoor operations are ready for an intelligent, autonomous layer.</p>
          <div className="closing-actions">
            <a className="button button-primary" href={`mailto:${site.email}?subject=Investor%20conversation`}>Talk to the founders <Arrow /></a>
            <a className="text-link" href={`mailto:${site.email}?subject=Pilot%20partnership`}>Explore a pilot partnership <Arrow /></a>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <BrandMark />
          <span className="brand-type"><strong>{site.shortBrand}</strong><small>SYSTEMS</small></span>
        </a>
        <p>AUTONOMY. INTELLIGENCE. IMPACT.</p>
        <div><a href={`https://${site.domain}`}>{site.domain}</a><a href={`mailto:${site.email}`}>{site.email}</a><span>© 2026</span></div>
      </footer>
    </main>
  );
}

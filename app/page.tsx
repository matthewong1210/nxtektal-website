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
import {
  BEYOND_ENVIRONMENTS,
  CARRIES_OVER,
  CARRY_NOTE,
  JOB_SPECIFIC,
  OPERATING_LOOP,
  PROOF_METRICS,
  PROOF_NOTE,
  RECURRING_JOBS,
  REUSE_BY_JOB,
} from "../lib/expansionStages";
import { BUILD_OR_USE_NOTE, DESIGN_STATUS_NOTE, LOOP_STEPS, PARTICIPANTS } from "../lib/howItWorks";
import { BUILD_TRACKS, SCOPE, STATUS_DATE, SYSTEM_COMPONENTS } from "../lib/firstJob";
import { SITE, SITE_DESCRIPTION } from "../lib/positioning";
import SiteFooter from "../components/SiteFooter";
import { CE82A_ROUTE } from "../lib/products/ce82a";
import Reveal from "./reveal";

// Below-the-fold interactive module: split out so it never weighs on first paint.
const QuickCalculator = dynamic(() => import("../components/roi/QuickCalculator"));

const site = SITE;

const pilotMail = `mailto:${site.email}?subject=Pilot%20Facility%20Interest%20%E2%80%94%20%5BFacility%20Name%5D`;
const assessmentMail = `mailto:${site.email}?subject=Site%20Assessment%20Request`;
const partnerMail = `mailto:${site.email}?subject=Partnership%20Discussion`;

const navItems = [
  { label: "The Work", href: "#work" },
  { label: "First Job", href: "#first-workflow" },
  { label: "Products", href: CE82A_ROUTE },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Golf", href: "#why-golf" },
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

/* Why picking up the balls is not the whole job — concrete, not abstract. */
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
    title: "Confirmation and exceptions",
    body: "A late run or an interrupted washer shows up as an empty dispenser at the tee line. Nobody is told a transfer failed; the fix is another manual trip.",
  },
];

/* Two entry points, and what the next job has to prove. */
const entryPoints = [
  {
    title: "Customer entry point: golf facilities",
    body: "Access to the grounds, to how the work is run today, and, once a pilot starts, to a site that tests with us continuously.",
  },
  {
    title: "First product entry point: range-ball collection",
    body: "Meant to validate task execution, the handoff to existing equipment, on-site support, and whether the job is worth paying for.",
  },
  {
    title: "Next: adjacent work on the same site",
    body: "Mowing and other grounds work are the capabilities to prove next — see how it scales, below. The second real job decides what carries over.",
  },
];

const pilotSteps = [
  { name: "Assess", body: "Walk the current collection, unloading, washing, and dispensing workflow with us and check what can be connected." },
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
    description: SITE_DESCRIPTION,
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

      {/* 2 · Hero — positioning and customer value */}
      <ProductHero
        copy={
          <>
            <div className="eyebrow hero-fade"><span className="pulse" /> OUTDOOR WORK · FIRST JOB: RANGE-BALL COLLECTION · IN DEVELOPMENT</div>
            <h1 className="hero-fade">Robots, and the operating system behind them, for outdoor work.</h1>
            <p className="ez-body hero-fade">
              NXTektal is building robots and the operating system behind them to carry out outdoor work, starting with golf facilities. The goal is less staff time spent on routine jobs, on coordinating between machines, and on checking that the work got done.
            </p>
            <p className="ez-note hero-fade">
              Our first job is <span className="hero-em">range-ball collection</span> at driving ranges, with handoff into the range’s existing washer. Not yet running at a facility.
            </p>
            <div className="hero-actions hero-fade">
              <a className="button button-primary" href="#pilot">
                Become a Pilot Facility <Arrow />
              </a>
              <a className="button button-secondary" href="#first-workflow">
                See the First Job
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

      {/* 4 · The recurring work, and which job comes first */}
      <section className="block section-light work-block" id="work" aria-label="The recurring outdoor work at a golf facility">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">THE WORK</div>
            <h2>Outdoor work that never stops: collect the range, mow, spray, rake, check.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              A golf facility runs on recurring outdoor jobs. Range balls go out and have to come back. Turf gets mown, bunkers raked, irrigation and course conditions checked. Each job has a crew, a machine or two, a budget, and someone deciding when it needs doing. We are taking them on one at a time, starting with the range.
            </p>
          </Reveal>
          <Reveal>
            <ul className="jobs-list" aria-label="Recurring outdoor jobs at a golf facility and NXTektal's status on each">
              {RECURRING_JOBS.map((job) => (
                <li key={job.name} className={`job-card job-card--${job.tone}`}>
                  <span className={`job-status job-status--${job.tone}`}>{job.status}</span>
                  <strong>{job.name}</strong>
                  <p>{job.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <p className="ez-note">Status reflects NXTektal’s development, not a product line. Only the first job is in development. The jobs marked next to validate are stage 02 of the expansion path below: adjacent work on the same golf facilities, none of it started, with mowing first.</p>
          </Reveal>
        </div>
      </section>

      {/* 5 · First job — range-ball collection and handoff */}
      <section className="block workflow-block" id="first-workflow">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">FIRST JOB · RANGE-BALL COLLECTION AND HANDOFF · IN DEVELOPMENT</div>
            <h2>Picking up the balls is the easy part.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              At a driving range the job is not finished when the outfield is clear. The balls have to come back, get into the washer, and be confirmed, and someone has to notice when a run is late or a transfer fails. Today that is judgment calls, radios, and manual trips.
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
            <figure className="observation observation--compact observation--dark">
              <figcaption className="observation-label"><i aria-hidden="true" /> FIELD OBSERVATION</figcaption>
              <blockquote>
                At one driving range, collection runs can occur roughly <em>every two hours</em>, take <em>more than an hour</em>, and still require <em>manual unloading and transfer</em> afterward.
              </blockquote>
            </figure>
          </Reveal>

          <Reveal>
            <div className="eyebrow wf-eyebrow">THE WORKFLOW WE ARE BUILDING · DESIGN, IN DEVELOPMENT</div>
            <p className="section-body">
              The steps below are the design, from monitoring the range to confirming the transfer. The media beside each step is labelled as simulation or concept.
            </p>
          </Reveal>
          <WorkflowStory />

          <div className="dev-duo">
            {SCOPE.map((card, index) => (
              <Reveal key={card.key} delay={index * 60}>
                <article className={`dev-card dev-card--${card.key === "now" ? "machines" : "brain"}`}>
                  <div className="dev-card-head">
                    <span className="dev-card-label">{card.label}</span>
                    <span className="dev-card-status">{card.status}</span>
                  </div>
                  <h3>{card.title}</h3>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="dev-card-note">{card.note}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="system-cards">
            {SYSTEM_COMPONENTS.map((component, index) => (
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
            <div className="eyebrow">DESIGNED AROUND EXISTING INFRASTRUCTURE</div>
            <h2>Keep the equipment already on site.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              The workflow is being designed around common wash-and-dispense configurations rather than asking a facility to replace its system. Delivering collected balls to the existing washer intake is the design goal; the transfer mechanism is under development, and compatibility with each site’s intake, layout, and operating rules is confirmed on site.
            </p>
          </Reveal>
          <Reveal>
            <EquipmentCompare />
          </Reveal>
          <Reveal>
            <HandoffSequence />
          </Reveal>
          <Reveal>
            <p className="ez-note">No live equipment integration has been completed yet.</p>
          </Reveal>
        </div>
      </section>

      {/* 7 · How the system does the work */}
      <section className="block how-block" id="how-it-works">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">HOW THE SYSTEM DOES THE WORK</div>
            <h2>Sense. Decide. Coordinate. Execute. Confirm.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              The Site Brain — the software behind the robots — runs one loop, the same whether the job is collecting range balls today or other outdoor work later. Exceptions go to a person.
            </p>
          </Reveal>
          <Reveal>
            <ol className="loop-steps" aria-label="The operating loop: sense, decide, coordinate, execute, confirm">
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
            <p className="control-note">{BUILD_OR_USE_NOTE}</p>
          </Reveal>
          <Reveal>
            <p className="status-note">{DESIGN_STATUS_NOTE}</p>
          </Reveal>
        </div>
      </section>

      {/* 8 · Software and machines, developed together (+ improvement loop, simulator, architecture, dashboard concept) */}
      <IntelligenceSection />

      {/* 9 · Why golf facilities first */}
      <section className="block section-light why-block" id="why-golf">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">WHY GOLF FACILITIES FIRST</div>
            <h2>Several recurring jobs on one site, each with a result a manager can judge — and most of that work exists at other outdoor facilities too.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              A golf facility runs range-ball collection, mowing, bunker care, spraying, irrigation checks, and course inspection on one site, day after day, each with an owner, a budget, and acceptance criteria a manager can state: balls back before the tee line runs dry, turf cut to height, no missed areas. The range is where we start. The work we are building toward — mowing, spraying, irrigation, inspection — is the same kind of work other outdoor facilities pay for: work that recurs across facility types, not work built around one industry’s own object, such as the golf ball.
            </p>
          </Reveal>
          <Reveal>
            <p className="section-body">
              This work is already paid for, with crews and machines on site. Surveyed U.S. 18-hole courses reported average maintenance spending of about $1 million in 2023, roughly $568,000 of it labor (GCSAA 2024 Maintenance Budget Report). That is a survey sample, not every course, and not spending we claim to replace — and paying for outdoor work is not unique to golf. What it gives us is a customer who can judge our result against work they already buy.
            </p>
          </Reveal>
          <div className="problem-points">
            {entryPoints.map((point, index) => (
              <Reveal key={point.title} delay={index * 60}>
                <article className="why-card">
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="problem-transition">
              One site is not automatically one buyer. Whether the range work opens the door to the maintenance department — with its own manager, budget, and acceptance criteria — is an assumption we have to validate, job by job.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 10 · How it scales */}
      <section className="block section-light expansion-block" id="expansion">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">HOW IT SCALES · ONE JOB AT A TIME</div>
            <h2>Start from work that recurs across facilities, so that each deployment can lower the cost of the next.</h2>
          </Reveal>
          <Reveal>
            <p className="section-body">
              The path: deliver the range-ball job at a customer site. Deliver a second, adjacent job — mowing or other grounds work — at the same site. Then take the validated second job to other outdoor facilities with similar conditions. The target is reuse with low incremental adaptation, not one universal outdoor robot: reuse the platform, the software, and the work modules as far as they go, so a new site mostly needs configuration and limited adaptation rather than a redeveloped system.
            </p>
          </Reveal>
          <Reveal>
            <ExpansionMap />
          </Reveal>

          <Reveal>
            <div className="eqc-columns carry-columns">
              <div>
                <h3 className="eqc-col-title eqc-col-title--nxt">DESIGNED TO CARRY OVER</h3>
                <ul className="eqc-col-list">
                  {CARRIES_OVER.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="eqc-col-title">STAYS SPECIFIC TO THE JOB AND SITE</h3>
                <ul className="eqc-col-list">
                  {JOB_SPECIFIC.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="ez-note">{CARRY_NOTE}</p>
          </Reveal>

          <div className="reuse-block">
            <Reveal>
              <div className="eyebrow">REUSE, JOB BY JOB · A BREAKDOWN TO VALIDATE</div>
              <p className="section-body">
                The same job name does not mean the same hardware, rules, or acceptance criteria. For each adjacent job, this is what we think is worth reusing — from the first job, and then from site to site — and what still has to be confirmed at every new site. It is an engineering hypothesis, not a statement of current capability.
              </p>
            </Reveal>
            <div className="reuse-grid">
              {REUSE_BY_JOB.map((row, index) => (
                <Reveal key={row.job} delay={index * 60}>
                  <article className="reuse-card">
                    <h3>{row.job}</h3>
                    <div className="reuse-cols">
                      <div>
                        <span className="reuse-label reuse-label--nxt">WORTH REUSING</span>
                        <ul aria-label="Worth reusing">
                          {row.reuse.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="reuse-label">CONFIRM AT EVERY SITE</span>
                        <ul aria-label="Confirm at every site">
                          {row.confirm.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="scale-sub">
            <div className="eyebrow">WHAT REUSE HAS TO PROVE</div>
            <ul className="beyond-loop proof-list" aria-label="Results reuse has to show, all targets today">
              {PROOF_METRICS.map((metric) => (
                <li key={metric}>{metric}</li>
              ))}
            </ul>
            <p className="ez-note">{PROOF_NOTE}</p>
          </Reveal>

          <Reveal className="scale-sub">
            <div className="eyebrow">LATER DIRECTION · BEYOND GOLF</div>
            <p className="section-body">
              The same loop — {OPERATING_LOOP.join(" → ").toLowerCase()} — and the parts that carry over are what we would take to other managed outdoor environments. Nothing beyond golf is in development.
            </p>
            <ul className="beyond-list" aria-label="Adjacent managed outdoor environments">
              {BEYOND_ENVIRONMENTS.map((env) => (
                <li key={env}>{env}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 11 · Operating economics */}
      <QuickCalculator />

      {/* 12 · Current progress */}
      <section className="status-block" id="progress" aria-label="Current progress">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">CURRENT PROGRESS · {STATUS_DATE.toUpperCase()}</div>
            <h2 className="evidence-h2">Where the first job stands today.</h2>
          </Reveal>
          <div className="evidence-cols">
            {BUILD_TRACKS.map((track, index) => (
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

      {/* 13 · Pilot program */}
      <section className="block pilot-block" id="pilot">
        <div className="block-inner">
          <Reveal>
            <div className="eyebrow">PILOT PROGRAM</div>
            <h2>Evaluate the first job at your range.</h2>
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

      {/* 14 · Founders */}
      <FounderSection />

      {/* 15 · Final CTA */}
      <section className="closing-block" id="contact">
        <div className="closing-grid-bg" aria-hidden="true" />
        <div className="block-inner closing-inner">
          <Reveal>
            <h2>Help put the first robot, and the system behind it, to work on a range.</h2>
          </Reveal>
          <Reveal>
            <p className="closing-body">
              We are looking for pilot facilities, equipment partners, and collaborators who want to evaluate the first range-ball job in a real operating environment.
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
      <SiteFooter />
    </main>
  );
}

import Reveal from "../../app/reveal";
import SimulatorProof from "./SimulatorProof";
import { IMPROVEMENT_LOOP, IMPROVEMENT_NOTE } from "../../lib/howItWorks";

/**
 * Software and machines chapter (#software-and-machines).
 *
 * Order: chapter header (the Site Brain and the hardware the job needs are
 * developed together; third-party equipment used where it fits) → the two
 * development tracks → the product-improvement loop (a method, kept separate
 * from the operating loop) → the Range Operations Simulator proof → the Site
 * Brain architecture stack beside the manager dashboard concept. Every layer
 * in the stack maps to a boundary that exists in the NXTektal systems
 * repository (facility state, advisory planning, append-only memory,
 * projection-only twin, robot execution behind safety interfaces); nothing
 * here claims a live site integration, an equipment command surface, or a
 * settled handoff mechanism.
 */

const tracks = [
  {
    key: "brain",
    label: "SITE BRAIN · SOFTWARE",
    status: "WORKING · SIMULATION ONLY",
    title: "Decides the work and confirms the result.",
    items: [
      "Today: the whole loop runs in the Range Operations Simulator against simulated sites. No facility is connected.",
      "Rules, not learned behaviour: decisions follow fixed rules a person can read, and a person approves proposed work.",
      "Missing data stays visible as missing. The software never fills a gap with a guess.",
    ],
    note: "What a pilot would add: real sensors, real equipment interfaces, and real exceptions.",
  },
  {
    key: "machines",
    label: "MACHINES AND INTERFACES · HARDWARE",
    status: "IN DEVELOPMENT",
    title: "Built or chosen for the physical job.",
    items: [
      "Collection robot — prototype in development, designed around the sweep, return, and handoff cycle the Site Brain schedules.",
      "Handoff and transfer into the existing washer intake — the transfer mechanism is under development; no option has been selected yet.",
      "Shared control architecture: every NXTektal robot is designed to take tasks through the same interface, so the Site Brain schedules each one the same way.",
      "Mechanical modules are reused where a job allows it, such as the mobile base.",
    ],
    note: "Concept renders on this page show design direction, not a final product, and a shared architecture does not make parts interchangeable between robots.",
  },
];

const layers = [
  {
    name: "Site and sensors",
    subtitle: "The physical world",
    description: "Robots, sensors, existing equipment, staff, weather, and player demand — the facility as it actually is.",
  },
  {
    name: "Facility State",
    subtitle: "What is happening?",
    description: "One time-stamped picture of the site, assembled from observations. Missing data stays marked missing.",
  },
  {
    name: "Decisions and advice",
    subtitle: "What should happen next?",
    description: "Fixed, reviewable rules propose work and flag risks. The manager sets the goals and approves.",
  },
  {
    name: "Operational memory",
    subtitle: "What happened before?",
    description: "A record that is only ever added to, never edited. It never drives the live loop on its own.",
  },
  {
    name: "Spatial model",
    subtitle: "Where is everything?",
    description: "The same state projected onto the site layout. A view of the facility, never the source of truth.",
  },
  {
    name: "Execution",
    subtitle: "How work gets done",
    description: "Robots are designed to take tasks the same way and to stop safely if a task runs too long or fails; an emergency stop cannot be cleared by software. Today this runs with a simulated robot only. Existing washers and dispensers would be observed, not commanded; no equipment is connected yet.",
  },
];

const summaryItems = [
  "Ball inventory remained above the operating threshold.",
  "Collection demand peaked later than the current schedule.",
  "One manual intervention was recorded and assigned for review.",
  "A washer-intake interruption was detected and flagged.",
  "Recommended collection windows were updated from observed demand.",
];

/** Module status tags per PHASE_2B_VISUAL_BRIEF.md §3 — CONCEPT is never presented as current product. */
const TAG = {
  dev: { label: "IN DEVELOPMENT", concept: false },
  concept: { label: "CONCEPT", concept: true },
} as const;

function ModuleTag({ tag }: { tag: (typeof TAG)[keyof typeof TAG] }) {
  return <span className={`dash-tag${tag.concept ? " dash-tag--concept" : ""}`}>{tag.label}</span>;
}

export default function IntelligenceSection() {
  return (
    <section className="block intel-block" id="software-and-machines">
      <div className="block-inner">
        {/* 1 · Chapter header — software and the hardware the job needs, developed together */}
        <Reveal>
          <div className="eyebrow">SOFTWARE AND MACHINES · IN DEVELOPMENT</div>
          <h2>The Site Brain, and the machines and interfaces the job needs.</h2>
          <p className="section-body">
            Two tracks, developed together: the Site Brain, which runs in simulation today, and the machines and interfaces the first job needs, which are in development. Field results from pilots will feed the next revision of both.
          </p>
        </Reveal>

        {/* 2 · The two development tracks */}
        <div className="dev-duo">
          {tracks.map((track, index) => (
            <Reveal key={track.key} delay={index * 60}>
              <article className={`dev-card dev-card--${track.key}`}>
                <div className="dev-card-head">
                  <span className="dev-card-label">{track.label}</span>
                  <span className="dev-card-status">{track.status}</span>
                </div>
                <h3>{track.title}</h3>
                <ul>
                  {track.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="dev-card-note">{track.note}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* 3 · The product-improvement loop — deliberately separate from the operating loop */}
        <div className="improve-block">
          <Reveal>
            <div className="eyebrow">HOW DEPLOYMENTS IMPROVE THE PRODUCT</div>
            <h3 className="improve-title">A second loop, run by the team: record, analyze, improve, test, deliver again.</h3>
          </Reveal>
          <Reveal>
            <ol className="loop-steps" aria-label="The product-improvement loop: record, analyze, improve, test, deliver">
              {IMPROVEMENT_LOOP.map((step, index) => (
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
          <Reveal>
            <p className="control-note">{IMPROVEMENT_NOTE}</p>
          </Reveal>
        </div>

        {/* 4 · Simulator proof — where the decision rules are developed today
            (renders only when agentSimulatorDemo.ready) */}
        <Reveal>
          <SimulatorProof />
        </Reveal>

        {/* 5 · Site Brain architecture + manager dashboard concept */}
        <div className="intel-duo">
          <Reveal>
            <div className="intel-left">
              <div className="eyebrow">SITE BRAIN ARCHITECTURE</div>
              <p className="intel-status">Every layer exists as software today and is exercised in simulation. Nothing is connected to a physical site yet.</p>
              <ol className="intel-stack" aria-label="Site Brain architecture, from the physical site to execution">
                {layers.map((layer, index) => (
                  <li key={layer.name} className="intel-layer">
                    {index > 0 && <span className="intel-connector" aria-hidden="true" />}
                    <div className="intel-card">
                      <div className="intel-card-head">
                        <strong>{layer.name}</strong>
                        <span>{layer.subtitle}</span>
                      </div>
                      <p>{layer.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="intel-feedback-note">
                The record is the input to the improvement loop above. The team runs that loop; the software does not change itself.
              </p>
            </div>
          </Reveal>

          {/* Manager dashboard concept v1 — decision support first */}
          <Reveal>
            <div className="dash-shell">
              <div className="dash" role="group" aria-label="Illustrative manager dashboard concept">
                <div className="dash-titlebar">
                  <span className="dash-title"><i aria-hidden="true" /> NXTektal Site Brain · Range Operations</span>
                  <span className="dash-note">Illustrative product concept — not live facility data</span>
                </div>

                <div className="dash-body">
                  {/* Left rail — product-surface concept, non-functional */}
                  <div className="dash-rail" aria-hidden="true">
                    <span className="dash-rail-item dash-rail-item--active">Overview</span>
                    <span className="dash-rail-item">Tasks</span>
                    <span className="dash-rail-item">Equipment</span>
                    <span className="dash-rail-item">Reports</span>
                  </div>

                  <div className="dash-main">
                    {/* Facility status strip — always-visible health */}
                    <div className="dash-status-strip">
                      <span className="dash-facility"><em className="dash-dot dash-dot--live" aria-hidden="true" /> Operating normally · 1 exception</span>
                      <ModuleTag tag={TAG.dev} />
                    </div>

                    {/* Row 1 — decision support first: what needs the manager */}
                    <div className="dash-grid dash-grid--decisions">
                      <div className="dash-card dash-card--recommend">
                        <div className="dash-card-top">
                          <span className="dash-label">Recommendation</span>
                          <ModuleTag tag={TAG.concept} />
                        </div>
                        <strong className="dash-value">Shift afternoon collection window −40 min</strong>
                        <p>Observed demand peaked later than the current schedule on 6 of the last 7 days.</p>
                        <div className="dash-actions" aria-hidden="true">
                          <span className="dash-btn dash-btn--approve">Approve</span>
                          <span className="dash-btn">Defer</span>
                        </div>
                      </div>
                      <div className="dash-card">
                        <div className="dash-card-top">
                          <span className="dash-label">Pending approvals</span>
                          <ModuleTag tag={TAG.concept} />
                        </div>
                        <strong className="dash-value">1 schedule adjustment</strong>
                        <p>Recommended collection windows updated from observed demand.</p>
                      </div>
                      <div className="dash-card">
                        <div className="dash-card-top">
                          <span className="dash-label">Exceptions</span>
                          <ModuleTag tag={TAG.dev} />
                        </div>
                        <strong className="dash-value"><em className="dash-dot dash-dot--warn" aria-hidden="true" /> Washer intake flagged 14:32</strong>
                        <p>Interruption detected and routed to a person for review, with task context attached.</p>
                      </div>
                    </div>

                    {/* Row 2 — telemetry that feeds the decisions */}
                    <div className="dash-grid">
                      <div className="dash-card dash-card--inventory">
                        <div className="dash-card-top">
                          <span className="dash-label">Ball inventory</span>
                          <ModuleTag tag={TAG.dev} />
                        </div>
                        <strong className="dash-value">Above threshold</strong>
                        <div className="dash-bar" aria-hidden="true"><i style={{ width: "72%" }} /></div>
                        <p>Dispenser supply holding through the afternoon peak.</p>
                      </div>
                      <div className="dash-card">
                        <div className="dash-card-top">
                          <span className="dash-label">Active task</span>
                          <ModuleTag tag={TAG.dev} />
                        </div>
                        <strong className="dash-value"><em className="dash-dot dash-dot--live" aria-hidden="true" /> Collection · Zone B</strong>
                        <p>Collection robot returning to the handoff point after a priority sweep.</p>
                      </div>
                      <div className="dash-card">
                        <div className="dash-card-top">
                          <span className="dash-label">Robot status</span>
                          <ModuleTag tag={TAG.dev} />
                        </div>
                        <strong className="dash-value">1 active · charging window scheduled</strong>
                        <p>Next task window aligned with the demand forecast.</p>
                      </div>
                      <div className="dash-card">
                        <div className="dash-card-top">
                          <span className="dash-label">Equipment status</span>
                          <ModuleTag tag={TAG.dev} />
                        </div>
                        <strong className="dash-value"><em className="dash-dot dash-dot--warn" aria-hidden="true" /> Washer intake flagged</strong>
                        <p>Manual intervention recorded and assigned for review.</p>
                      </div>
                      <div className="dash-card dash-card--summary">
                        <div className="dash-card-top">
                          <span className="dash-label">Daily operations summary</span>
                          <ModuleTag tag={TAG.dev} />
                        </div>
                        <ul>
                          {summaryItems.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="dash-legend">
                The dashboard is a product concept and every value shown is illustrative. IN DEVELOPMENT marks a Site Brain capability that exists in simulation today; CONCEPT marks product direction.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

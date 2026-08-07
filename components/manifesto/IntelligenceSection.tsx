import Reveal from "../../app/reveal";
import SimulatorProof from "./SimulatorProof";

const layers = [
  {
    name: "Physical World",
    subtitle: "Robots · Sensors · Equipment · People · Environment",
    description: "The facility as it actually is — machines, terrain, weather, demand, and the people working in it.",
  },
  {
    name: "Facility State",
    subtitle: "What is happening?",
    description: "A current understanding of inventory, equipment, demand, terrain, resources, and constraints.",
  },
  {
    name: "Operational Intelligence",
    subtitle: "What should happen next?",
    description: "Determines priorities, risks, recommended actions, and resource allocation — the facility manager approves.",
  },
  {
    name: "Operational Memory",
    subtitle: "What has been learned?",
    description: "State, decision, human action, and outcome feed improved future decisions — each facility develops its own operational knowledge over time.",
  },
  {
    name: "Spatial Digital Twin",
    subtitle: "Where and how does everything interact?",
    description: "A living representation of terrain, infrastructure, equipment, operational zones, workflows, constraints, and the relationships between systems — not only visualization, but the operational state of the physical environment.",
  },
  {
    name: "Autonomous Execution",
    subtitle: "How actions happen",
    description: "Robots, sensors, connected equipment, and human workflows carry out approved work and report back.",
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
    <section className="block intel-block" id="intelligence">
      <div className="block-inner">
        {/* 1 · Simulator proof — tests and compares operating policies
            (renders only when agentSimulatorDemo.ready) */}
        <Reveal>
          <SimulatorProof />
        </Reveal>

        {/* 2 · Operating layer + 3 · Manager dashboard */}
        <Reveal>
          <div className="eyebrow">THE INTELLIGENCE LAYER · IN DEVELOPMENT</div>
          <h2>Robots are the execution layer. NXTektal is the intelligence layer.</h2>
          <p className="section-body">
            NXTektal is being designed to understand facility state, decide what should happen next, remember what worked, and coordinate autonomous execution. The facility manager remains in control of goals, policies, and approvals.
          </p>
        </Reveal>

        <div className="intel-duo">
          {/* Coordination hierarchy — compact, secondary to the product view */}
          <Reveal>
            <div className="intel-left">
              <ol className="intel-stack" aria-label="NXTektal intelligence layer, from the physical world to autonomous execution">
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
                <span className="intel-feedback-rail" aria-hidden="true">
                  <i>FEEDBACK</i>
                </span>
              </ol>
              <p className="intel-feedback-note">
                Operational Memory closes the loop: state, decision, human action, and outcome feed back into the next recommendation — so each facility gets operationally smarter over time.
              </p>
            </div>
          </Reveal>

          {/* Manager dashboard concept v1 — decision support first */}
          <Reveal>
            <div className="dash-shell">
              <div className="dash" role="group" aria-label="Illustrative manager dashboard concept">
                <div className="dash-titlebar">
                  <span className="dash-title"><i aria-hidden="true" /> NXTektal · Range Operations</span>
                  <span className="dash-note">Illustrative product concept — not live facility data</span>
                </div>

                <div className="dash-body">
                  {/* Left rail — product-surface concept, non-functional */}
                  <div className="dash-rail" aria-hidden="true">
                    <span className="dash-rail-item dash-rail-item--active">Overview</span>
                    <span className="dash-rail-item">Missions</span>
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
                          <span className="dash-label">Alerts</span>
                          <ModuleTag tag={TAG.dev} />
                        </div>
                        <strong className="dash-value"><em className="dash-dot dash-dot--warn" aria-hidden="true" /> Washer intake flagged 14:32</strong>
                        <p>Interruption detected and routed for review with mission context attached.</p>
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
                          <span className="dash-label">Active mission</span>
                          <ModuleTag tag={TAG.dev} />
                        </div>
                        <strong className="dash-value"><em className="dash-dot dash-dot--live" aria-hidden="true" /> Collection · Zone B</strong>
                        <p>Returning to handoff point after priority sweep.</p>
                      </div>
                      <div className="dash-card">
                        <div className="dash-card-top">
                          <span className="dash-label">Robot status</span>
                          <ModuleTag tag={TAG.dev} />
                        </div>
                        <strong className="dash-value">1 active · charging window scheduled</strong>
                        <p>Next mission window aligned with demand forecast.</p>
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
                Modules marked CONCEPT illustrate the platform direction and are not current functionality.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

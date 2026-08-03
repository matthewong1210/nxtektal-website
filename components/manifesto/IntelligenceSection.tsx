import Reveal from "../../app/reveal";

const layers = [
  {
    name: "Facility Manager",
    subtitle: "Goals · Policies · Approvals",
    description: "Sets operating goals, constraints, policies, and approval thresholds.",
  },
  {
    name: "Facility Operations Agent",
    subtitle: "Shared state · Priorities · Scheduling",
    description: "Maintains a shared view of the facility and prioritizes work across workflows.",
  },
  {
    name: "Specialized Workflow Agents",
    subtitle: "Ball operations · Turf · Inspection · Bunkers",
    description: "Translate facility priorities into specific missions and operating plans.",
  },
  {
    name: "Execution Layer",
    subtitle: "Robots · Drones · Sensors · Human support",
    description: "Carries out the physical work and returns execution data.",
  },
  {
    name: "Verification & Learning",
    subtitle: "Outcomes · Exceptions · Time · Cost",
    description: "Compares expected and actual results, records exceptions, and improves future recommendations.",
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
        <Reveal>
          <div className="eyebrow">PLATFORM ARCHITECTURE · IN DEVELOPMENT</div>
          <h2>From robot dispatch to operational intelligence.</h2>
          <p className="section-body">
            NXTektal is being designed to turn facility goals into coordinated work, compare plans with real outcomes, and improve how future tasks are prioritized and executed. The facility manager remains in control.
          </p>
        </Reveal>

        <div className="intel-duo">
          {/* Coordination hierarchy — compact, secondary to the product view */}
          <Reveal>
            <div className="intel-left">
              <ol className="intel-stack" aria-label="NXTektal coordination structure, from facility manager to verification and learning">
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
                Verification &amp; Learning feeds outcomes back to the Facility Operations Agent, so future missions are prioritized from real results.
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

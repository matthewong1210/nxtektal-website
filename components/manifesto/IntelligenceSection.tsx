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

        {/* Manager dashboard concept — the platform made tangible */}
        <Reveal>
          <div className="dash" role="group" aria-label="Illustrative manager dashboard concept">
            <div className="dash-titlebar">
              <span className="dash-title"><i aria-hidden="true" /> NXTektal · Range Operations</span>
              <span className="dash-note">Illustrative product concept — not live facility data</span>
            </div>
            <div className="dash-grid">
              <div className="dash-card dash-card--inventory">
                <span className="dash-label">Ball inventory</span>
                <strong className="dash-value">Above threshold</strong>
                <div className="dash-bar" aria-hidden="true"><i style={{ width: "72%" }} /></div>
                <p>Dispenser supply holding through the afternoon peak.</p>
              </div>
              <div className="dash-card">
                <span className="dash-label">Active mission</span>
                <strong className="dash-value"><em className="dash-dot dash-dot--live" aria-hidden="true" /> Collection · Zone B</strong>
                <p>Returning to handoff point after priority sweep.</p>
              </div>
              <div className="dash-card">
                <span className="dash-label">Robot availability</span>
                <strong className="dash-value">1 active · charging window scheduled</strong>
                <p>Next mission window aligned with demand forecast.</p>
              </div>
              <div className="dash-card">
                <span className="dash-label">Equipment status</span>
                <strong className="dash-value"><em className="dash-dot dash-dot--warn" aria-hidden="true" /> Washer intake flagged</strong>
                <p>Interruption detected and routed for review.</p>
              </div>
              <div className="dash-card">
                <span className="dash-label">Manual interventions</span>
                <strong className="dash-value">1 recorded today</strong>
                <p>Assigned for review with mission context attached.</p>
              </div>
              <div className="dash-card">
                <span className="dash-label">Pending approvals</span>
                <strong className="dash-value">Schedule adjustment</strong>
                <p>Recommended collection windows updated from observed demand.</p>
              </div>
              <div className="dash-card dash-card--summary">
                <span className="dash-label">Daily operations summary</span>
                <ul>
                  {summaryItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Coordination structure */}
        <Reveal>
          <div className="intel-diagram">
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
            <div className="intel-side">
              <div className="intel-dashboard">
                <div className="intel-card-head">
                  <strong>Manager Dashboard</strong>
                  <span>Status · Alerts · Recommendations</span>
                </div>
                <p>Receives live status, exceptions, and recommendations from the operating layer.</p>
              </div>
              <p className="intel-feedback-note">
                Verification &amp; Learning feeds outcomes back to the Facility Operations Agent, so future missions are prioritized from real results.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

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

const reportItems = [
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
          <div className="ez-paragraphs intel-intro">
            <p>
              NXTektal is being designed to turn facility goals into coordinated work, compare plans with real outcomes, and improve how future tasks are prioritized and executed.
            </p>
            <p>
              The facility manager remains in control. The operating layer converts goals and policies into prioritized missions, coordinates the execution layer, verifies outcomes, and returns status, exceptions, and recommendations.
            </p>
          </div>
        </Reveal>

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

        <Reveal>
          <figure className="report-panel">
            <figcaption className="report-head">
              <span className="eyebrow report-eyebrow">ILLUSTRATIVE OUTPUT</span>
              <h3>What the facility manager sees</h3>
            </figcaption>
            <div className="report-mock" role="group" aria-label="Illustrative daily operations summary">
              <div className="report-mock-title">
                <i aria-hidden="true" /> Daily Operations Summary
              </div>
              <ul>
                {reportItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="report-caption">Illustrative product concept — not live facility data.</p>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

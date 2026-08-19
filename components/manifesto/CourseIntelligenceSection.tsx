import Reveal from "../../app/reveal";
import {
  COURSE_INTEL_BRIEFING,
  COURSE_INTEL_BRIEFING_ACTIONS,
  COURSE_INTEL_CONDITION_COVERAGE,
  COURSE_INTEL_COVERAGE_CALLOUT,
  COURSE_INTEL_FACILITY_VALUE,
  COURSE_INTEL_FLOW,
  COURSE_INTEL_FUTURE_BRANCH_LABEL,
  COURSE_INTEL_FUTURE_FLOW,
  COURSE_INTEL_LOOP,
  COURSE_INTEL_PLAYER_BRANCH_LABEL,
  COURSE_INTEL_PLAYER_FLOW,
  COURSE_INTEL_PLAYER_VALUE,
  COURSE_INTEL_QUALIFICATION,
  COURSE_INTEL_STAGES,
} from "../../lib/courseIntelligence";

/**
 * Course Intelligence chapter (platform direction).
 *
 * Grounds operations first: map the course into a versioned 3D Course
 * World Model, let the human-driven carts already on site inspect it
 * continuously, keep course condition distinct from inspection coverage,
 * and turn deduplicated evidence into a supervisor-confirmed maintenance
 * briefing with verification on a later pass. Player-facing shot
 * intelligence is an optional branch on the same mapped infrastructure;
 * mechanical course care is a future, safety-gated branch.
 *
 * Server component, no client state. The system flow is a semantic
 * HTML/CSS diagram (no WebGL, no generated imagery) that reads correctly
 * without motion, without JavaScript (see the global no-script Reveal
 * fallback in app/layout.tsx), and at 320px. Copy lives in
 * lib/courseIntelligence.ts under truthfulness tests.
 */
export default function CourseIntelligenceSection() {
  return (
    <section className="block ci-block" id="course-intelligence">
      <div className="block-inner">
        <Reveal>
          <div className="eyebrow">COURSE INTELLIGENCE · PLATFORM DIRECTION</div>
          <h2>Map the course once. Let every cart inspect it continuously.</h2>
          <p className="ci-tagline">Map deeply. Inspect continuously. Maintain proactively.</p>
        </Reveal>
        <Reveal>
          <p className="section-body">
            At deployment, NXTektal can turn a golf course into a calibrated, versioned 3D Course World Model. Positioning, calibrated cameras, edge processing, and connectivity can then turn existing golf carts into mobile inspection nodes — capturing georeferenced evidence of divots and turf anomalies during normal operation.
          </p>
        </Reveal>
        <Reveal>
          <p className="section-body">
            NXTektal can combine repeat observations, distinguish course condition from inspection coverage, and turn the resulting evidence into prioritized maintenance recommendations for the grounds team.
          </p>
        </Reveal>
        <Reveal>
          <p className="ci-support">
            The carts remain human-driven, and grounds supervisors remain in control of every maintenance decision. Player-facing shot intelligence can operate on the same mapped infrastructure as an optional module.
          </p>
        </Reveal>

        <Reveal>
          <ol className="ci-loop" aria-label="The grounds intelligence operating sequence">
            {COURSE_INTEL_LOOP.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Reveal>

        <div className="ci-duo">
          <Reveal className="ci-flow-cell">
            <figure className="ci-flow">
              <ol className="ci-chain" aria-label="System flow from course scan to the operating layer">
                {COURSE_INTEL_FLOW.map((node) =>
                  node.name === "Condition + coverage" ? (
                    <li key={node.name} className="ci-chain-split">
                      <div className="ci-pair">
                        {COURSE_INTEL_CONDITION_COVERAGE.map((half) => (
                          <div key={half.name} className="ci-pair-cell">
                            <strong>{half.name}</strong>
                            <span>{half.note}</span>
                          </div>
                        ))}
                      </div>
                      <p className="ci-callout">{COURSE_INTEL_COVERAGE_CALLOUT}</p>
                    </li>
                  ) : (
                    <li key={node.name}>
                      <strong>{node.name}</strong>
                      <span>{node.note}</span>
                    </li>
                  )
                )}
              </ol>
              <div className="ci-branch ci-branch--player">
                <p className="ci-branch-head">{COURSE_INTEL_PLAYER_BRANCH_LABEL}</p>
                <ol className="ci-chain ci-chain--player" aria-label="Optional player module — branches from the cart node">
                  {COURSE_INTEL_PLAYER_FLOW.map((node) => (
                    <li key={node.name}>
                      <strong>{node.name}</strong>
                      <span>{node.note}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="ci-branch">
                <p className="ci-branch-head">{COURSE_INTEL_FUTURE_BRANCH_LABEL}</p>
                <ol className="ci-chain ci-chain--future" aria-label="Future course-care branch — from a supervisor-confirmed issue">
                  {COURSE_INTEL_FUTURE_FLOW.map((node) => (
                    <li key={node.name}>
                      <strong>{node.name}</strong>
                      <span>{node.note}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <figcaption className="ci-caption">{COURSE_INTEL_QUALIFICATION}</figcaption>
            </figure>
          </Reveal>

          <div className="ci-stages">
            {COURSE_INTEL_STAGES.map((stage, index) => (
              <Reveal key={stage.number} delay={index * 60}>
                <article className="ci-stage">
                  <div className="ci-stage-head">
                    <span className="ci-stage-num" aria-hidden="true">{String(stage.number).padStart(2, "0")}</span>
                    <span className="ci-stage-label">{stage.label}</span>
                    <span className="ci-status">{stage.status}</span>
                  </div>
                  <h3>{stage.title}</h3>
                  <p>{stage.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="ci-brief" role="group" aria-label="Illustrative grounds maintenance briefing concept">
            <div className="ci-brief-head">
              <span className="ci-brief-title">GROUNDS MAINTENANCE BRIEFING</span>
              <span className="ci-status">ILLUSTRATIVE CONCEPT</span>
            </div>
            <ul className="ci-brief-rows">
              {COURSE_INTEL_BRIEFING.map((row) => (
                <li key={row.place}>
                  <strong>{row.place}</strong>
                  <span>{row.finding}</span>
                  <span className="ci-brief-meta">{row.evidence} · {row.action}</span>
                </li>
              ))}
            </ul>
            <p className="ci-brief-actions" aria-label="Supervisor decision options">
              {COURSE_INTEL_BRIEFING_ACTIONS.map((action) => (
                <span key={action}>{action}</span>
              ))}
            </p>
            <p className="ci-caption">
              Illustrative supervisor briefing — simulated content, not live facility data. Every action remains a human decision.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="ci-value">
            <div className="ci-value-col">
              <h3>For the facility</h3>
              <ul>
                {COURSE_INTEL_FACILITY_VALUE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="ci-value-col">
              <h3>Optional player intelligence</h3>
              <ul>
                {COURSE_INTEL_PLAYER_VALUE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="ci-thesis">
            The unit of autonomy is the facility, not a single robot. A retrofitted cart is not a standalone consumer gadget — it is a mobile inspection node in the NXTektal operating layer.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

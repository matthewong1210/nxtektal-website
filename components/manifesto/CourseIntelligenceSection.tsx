import Reveal from "../../app/reveal";
import {
  COURSE_INTEL_FACILITY_VALUE,
  COURSE_INTEL_FLOW,
  COURSE_INTEL_FUTURE_FLOW,
  COURSE_INTEL_LOOP,
  COURSE_INTEL_PLAYER_VALUE,
  COURSE_INTEL_QUALIFICATION,
  COURSE_INTEL_STAGES,
} from "../../lib/courseIntelligence";

/**
 * Course Intelligence & smart-cart retrofit chapter (platform direction).
 *
 * Sits after the intelligence layer and before ROI/Expansion: the range
 * closed loop stays the current wedge; this explains the next layer —
 * scan the course into a structured 3D world model, retrofit the carts
 * already on site into human-driven sensing nodes, and only after the
 * sensing loop is proven add localized, human-confirmed course care.
 *
 * Server component, no client state. The system flow is a semantic
 * HTML/CSS diagram (no WebGL, no generated imagery) that reads correctly
 * without motion, without JavaScript, and at 320px. Copy lives in
 * lib/courseIntelligence.ts under truthfulness tests.
 */
export default function CourseIntelligenceSection() {
  return (
    <section className="block ci-block" id="course-intelligence">
      <div className="block-inner">
        <Reveal>
          <div className="eyebrow">COURSE INTELLIGENCE · PLATFORM DIRECTION</div>
          <h2>Scan the course once. Turn the carts already on site into intelligent nodes.</h2>
        </Reveal>
        <Reveal>
          <p className="section-body">
            Before more machines can act across a course, the operating layer needs an accurate, shared understanding of the physical environment. At deployment, NXTektal can map a golf course into a calibrated 3D world model. A retrofit kit on existing golf carts can then combine positioning, compatible launch-monitor data, edge compute, and an on-cart interface to place each shot in course context, estimate where the ball is likely to land, and continuously improve the facility&rsquo;s spatial intelligence.
          </p>
        </Reveal>
        <Reveal>
          <p className="ci-support">
            The cart remains human-driven. NXTektal provides the map, sensing, decision support, and data layer around it.
          </p>
        </Reveal>

        <Reveal>
          <ol className="ci-loop" aria-label="The course intelligence platform sequence — REPAIR is a future step">
            {COURSE_INTEL_LOOP.map((step) => (
              <li key={step} className={step === "REPAIR" ? "ci-loop-future" : undefined}>
                {step}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="ci-duo">
          <Reveal className="ci-flow-cell">
            <figure className="ci-flow">
              <ol className="ci-chain" aria-label="System flow from course scan to the operating layer">
                {COURSE_INTEL_FLOW.map((node) => (
                  <li key={node.name}>
                    <strong>{node.name}</strong>
                    <span>{node.note}</span>
                  </li>
                ))}
              </ol>
              <div className="ci-branch">
                <p className="ci-branch-head">FUTURE BRANCH · SAFETY-GATED</p>
                <ol className="ci-chain ci-chain--future" aria-label="Future course-care branch — human-confirmed">
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
                    <span className={`ci-status${stage.status === "FUTURE MODULE" ? " ci-status--future" : ""}`}>
                      {stage.status}
                    </span>
                  </div>
                  <h3>{stage.title}</h3>
                  <p>{stage.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="ci-value">
            <div className="ci-value-col">
              <h3>For the player</h3>
              <ul>
                {COURSE_INTEL_PLAYER_VALUE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="ci-value-col">
              <h3>For the facility</h3>
              <ul>
                {COURSE_INTEL_FACILITY_VALUE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="ci-thesis">
            The unit of autonomy is the facility, not a single robot. A retrofitted cart is not a standalone consumer gadget — it is a connected sensing node in the NXTektal operating layer.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

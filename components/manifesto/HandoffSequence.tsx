import MediaFrame, { CAPTIONS } from "../media/MediaFrame";

/**
 * Three-panel Modular Ball Handoff concept sequence
 * (PHASE_2B_VISUAL_BRIEF.md §2, §4.2).
 *
 * Sprint 2 ships the structure with schematic SVG placeholders drawn in
 * code — no rendered imagery. When the engineering concept illustrations
 * land in public/visuals/phase2/handoff/, each <HandoffGlyph> is replaced
 * by the final SVG/still inside the same panel; labels stay HTML.
 *
 * Style rules from the brief: neutral greys + blue linework, existing
 * equipment drawn as a separated neutral zone, no dimensions or fastener
 * detail — concept, not blueprint.
 */

const panels = [
  {
    step: "01",
    name: "DOCK",
    label: "Robot docks at the handoff point",
    alt: "Robot docking at the modular handoff unit (concept)",
    glyph: "dock",
  },
  {
    step: "02",
    name: "TRANSFER",
    label: "Balls transfer into existing washing equipment",
    alt: "Balls transferring from the robot's hopper into the existing washer intake (concept)",
    glyph: "transfer",
  },
  {
    step: "03",
    name: "VERIFY & RELEASE",
    label: "Transfer verified — workflow logged",
    alt: "Sensor confirming completed transfer (concept)",
    glyph: "verify",
  },
] as const;

/** Schematic placeholder linework — 4:3 viewBox, CSS-var colors. */
function HandoffGlyph({ kind, alt }: { kind: (typeof panels)[number]["glyph"]; alt: string }) {
  return (
    <svg className="handoff-glyph" viewBox="0 0 400 300" role="img" aria-label={alt}>
      {/* ground line */}
      <line x1="16" y1="248" x2="384" y2="248" className="hg-ground" />
      {/* existing-equipment zone (right, neutral) */}
      <g className="hg-existing">
        <rect x="268" y="96" width="100" height="152" rx="6" />
        <text x="318" y="282" textAnchor="middle" className="hg-zone-label">EXISTING EQUIPMENT</text>
      </g>
      {/* handoff unit (center, blue linework) */}
      <g className="hg-nxt">
        <rect x="196" y="148" width="56" height="100" rx="6" />
        <path d="M200 152 L248 176" className="hg-chute" />
      </g>
      {/* robot (left, blue linework) */}
      <g className={`hg-nxt hg-robot hg-robot--${kind}`}>
        <rect x={kind === "dock" ? 76 : 116} y="180" width="84" height="52" rx="8" />
        <circle cx={kind === "dock" ? 96 : 136} cy="240" r="10" />
        <circle cx={kind === "dock" ? 140 : 180} cy="240" r="10" />
      </g>
      {kind === "dock" && (
        <g className="hg-accent" aria-hidden="true">
          {/* approach vector + alignment funnel */}
          <path d="M168 206 h20 m-8 -7 8 7 -8 7" className="hg-arrow" />
          <path d="M196 168 l-14 -10 M196 228 l-14 10" className="hg-funnel" />
        </g>
      )}
      {kind === "transfer" && (
        <g className="hg-accent" aria-hidden="true">
          {/* continuous transfer path: hopper → chute → washer intake */}
          <path d="M158 196 C 190 168, 214 160, 264 132" className="hg-flow" />
          <circle cx="188" cy="178" r="4" className="hg-ball" />
          <circle cx="214" cy="164" r="4" className="hg-ball" />
          <circle cx="240" cy="148" r="4" className="hg-ball" />
        </g>
      )}
      {kind === "verify" && (
        <g className="hg-accent" aria-hidden="true">
          {/* verification sensor + confirmation tick + release vector */}
          <circle cx="224" cy="128" r="14" className="hg-sensor" />
          <path d="M217 128 l5 5 9 -10" className="hg-tick" />
          <path d="M116 206 h-24 m8 -7 -8 7 8 7" className="hg-arrow" />
        </g>
      )}
    </svg>
  );
}

export default function HandoffSequence() {
  return (
    <MediaFrame caption={CAPTIONS.engConcept} tone="light" bare className="handoff-frame">
      <ol className="handoff-seq" aria-label="Modular ball handoff concept sequence: dock, transfer, verify and release">
        {panels.map((panel) => (
          <li key={panel.step} className="handoff-panel">
            <div className="handoff-stage">
              <HandoffGlyph kind={panel.glyph} alt={panel.alt} />
              <span className="handoff-placeholder-tag">CONCEPT SCHEMATIC</span>
            </div>
            <div className="handoff-panel-head">
              <span className="wf-step-index" aria-hidden="true">{panel.step}</span>
              <div>
                <strong>{panel.name}</strong>
                <p>{panel.label}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </MediaFrame>
  );
}

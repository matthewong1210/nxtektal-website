import MediaFrame from "../media/MediaFrame";
import { ResponsiveStill } from "../media/ResponsiveMedia";
import { HANDOFF_PANELS, HANDOFF_SCHEMATIC_CAPTION, type HandoffGlyphKind } from "../../lib/handoffPanels";
import { handoffPanelStills } from "../../lib/visualAssets";

/**
 * Three-panel handoff workflow schematic (first briefed in
 * PHASE_2B_VISUAL_BRIEF.md §2, §4.2, whose handoff wording is superseded by
 * README.md → Terminology; redrawn mechanism-neutral).
 *
 * The panels express the business relationship — RETURN / DOCK → TRANSFER →
 * CONFIRM & RELEASE — not a mechanism. The transfer mechanism is under
 * development and no option (station-side arm, robot-mounted arm, removable container, robot-side
 * lift, chute, conveyor) has been selected, so the TRANSFER panel draws the
 * destination and the requirement, never the machinery. When production
 * stills land in public/visuals/phase2/handoff/, each glyph is replaced in
 * place; labels stay HTML.
 *
 * Style rules from the brief: neutral greys + blue linework, existing
 * equipment drawn as a separated neutral zone, no dimensions or fastener
 * detail — concept, not blueprint.
 */


/** Mechanism-neutral linework — 4:3 viewBox, CSS-var colors. */
function HandoffGlyph({ kind, alt }: { kind: HandoffGlyphKind; alt: string }) {
  const robotX = kind === "dock" ? 60 : 108;
  return (
    <svg className="handoff-glyph" viewBox="0 0 400 300" role="img" aria-label={alt}>
      {/* ground line */}
      <line x1="16" y1="248" x2="384" y2="248" className="hg-ground" />
      {/* existing-equipment zone (right, neutral): the washer intake is the destination */}
      <g className="hg-existing">
        <rect x="276" y="96" width="92" height="152" rx="6" />
        <rect x="276" y="96" width="92" height="26" rx="6" className="hg-intake" />
        <text x="384" y="282" textAnchor="end" className="hg-zone-label">EXISTING WASHER INTAKE</text>
      </g>
      {/* handoff point: a place, not a machine — dashed zone, nothing drawn inside */}
      <g className="hg-point">
        <rect x="168" y="150" width="96" height="98" rx="8" className="hg-point-zone" />
        <text x="216" y="266" textAnchor="middle" className="hg-point-label">HANDOFF POINT</text>
      </g>
      {/* robot (left, blue linework), carrying the collected load */}
      <g className={`hg-nxt hg-robot hg-robot--${kind}`}>
        <rect x={robotX} y="180" width="84" height="52" rx="8" />
        <circle cx={robotX + 20} cy="240" r="10" />
        <circle cx={robotX + 64} cy="240" r="10" />
        <circle cx={robotX + 30} cy="194" r="3.5" className="hg-ball" />
        <circle cx={robotX + 42} cy="190" r="3.5" className="hg-ball" />
        <circle cx={robotX + 54} cy="194" r="3.5" className="hg-ball" />
      </g>
      {kind === "dock" && (
        <g className="hg-accent" aria-hidden="true">
          {/* approach vector into the handoff point */}
          <path d="M150 206 h26 m-8 -7 8 7 -8 7" className="hg-arrow" />
        </g>
      )}
      {kind === "transfer" && (
        <g className="hg-accent" aria-hidden="true">
          {/* the requirement, not the machinery: balls go from the robot to the intake */}
          <path d="M160 190 C 200 150, 236 128, 274 112" className="hg-flow" />
          <circle cx="196" cy="156" r="4" className="hg-ball" />
          <circle cx="226" cy="136" r="4" className="hg-ball" />
          <circle cx="254" cy="120" r="4" className="hg-ball" />
        </g>
      )}
      {kind === "verify" && (
        <g className="hg-accent" aria-hidden="true">
          {/* confirmation recorded for the handoff — a status mark over the handoff point, not a
              sensor on the washer (where confirmation is sensed is undecided) — plus the release vector */}
          <circle cx="216" cy="128" r="14" className="hg-status" />
          <path d="M209 128 l5 5 9 -10" className="hg-tick" />
          <path d="M106 206 h-26 m8 -7 -8 7 8 7" className="hg-arrow" />
        </g>
      )}
    </svg>
  );
}

export default function HandoffSequence() {
  return (
    <MediaFrame
      caption={HANDOFF_SCHEMATIC_CAPTION}
      tone="light"
      bare
      className="handoff-frame"
    >
      <ol className="handoff-seq" aria-label="Handoff workflow: return and dock, transfer, confirm and release">
        {HANDOFF_PANELS.map((panel, index) => (
          <li key={panel.step} className="handoff-panel">
            <div className="handoff-stage">
              {handoffPanelStills[index] ? (
                <ResponsiveStill source={handoffPanelStills[index]} />
              ) : (
                <>
                  <HandoffGlyph kind={panel.glyph} alt={panel.alt} />
                  <span className="handoff-placeholder-tag">{panel.tag}</span>
                </>
              )}
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

"use client";

import { useEffect, useRef, useState } from "react";
import {
  COMPARE_DEFAULT,
  CURRENT_WORKFLOW,
  NXTEKTAL_WORKFLOW,
  WHAT_NXTEKTAL_ADDS,
  WHAT_STAYS,
  clampComparePosition,
  type WorkflowState,
} from "../../lib/equipmentCompare";

/**
 * Existing Equipment Workflow Compare (Phase 2D Sprint 2C).
 *
 * Server-rendered default: two complete comparison cards (semantic HTML,
 * headings + diagram chains + operating conditions) — that is the no-JS,
 * mobile, tablet, and pre-hydration presentation. Nothing is clipped or
 * hidden without JavaScript.
 *
 * Client enhancement (≥1121px, fine pointer): the two states become one
 * overlay comparison stage — two aligned SVG diagrams over a shared
 * coordinate system, the NXTektal layer clipped by a CSS custom property,
 * driven directly by a native <input type="range"> (real keyboard and
 * pointer semantics; no spring, no autoplay sweep). The input writes the
 * CSS variable imperatively, so pointer movement never re-renders React.
 * The semantic cards stay in the DOM (visually hidden) so screen-reader
 * users never need the slider to understand both states.
 */

const STAGE_W = 1200;
const STAGE_H = 470;

/**
 * Shared coordinate system: the existing-equipment zone (washer + dispenser)
 * sits at identical coordinates in BOTH states — the drag reveals that the
 * left side (coordination) changes while the equipment stays.
 */
const ZONE = { x: 812, y: 78, w: 348, h: 268 };
const WASHER = { x: 836, y: 138, w: 300, h: 82 };
const DISPENSER = { x: 836, y: 244, w: 300, h: 82 };

function EquipmentZone() {
  return (
    <g>
      <rect className="eqc-zone" x={ZONE.x} y={ZONE.y} width={ZONE.w} height={ZONE.h} rx={14} />
      <text className="eqc-zone-label" x={ZONE.x + 24} y={ZONE.y + 34}>
        EXISTING EQUIPMENT
      </text>
      <rect className="eqc-node eqc-node--existing" x={WASHER.x} y={WASHER.y} width={WASHER.w} height={WASHER.h} rx={10} />
      <text className="eqc-node-label" x={WASHER.x + 20} y={WASHER.y + 36}>Ball washer</text>
      <text className="eqc-node-tag eqc-node-tag--existing" x={WASHER.x + 20} y={WASHER.y + 60}>KEPT ON SITE</text>
      <rect className="eqc-node eqc-node--existing" x={DISPENSER.x} y={DISPENSER.y} width={DISPENSER.w} height={DISPENSER.h} rx={10} />
      <text className="eqc-node-label" x={DISPENSER.x + 20} y={DISPENSER.y + 36}>Ball dispenser</text>
      <text className="eqc-node-tag eqc-node-tag--existing" x={DISPENSER.x + 20} y={DISPENSER.y + 60}>KEPT ON SITE</text>
    </g>
  );
}

/** Straight connector with a small arrowhead, drawn left-to-right. */
function Arrow({ x1, y1, x2, y2, tone }: { x1: number; y1: number; x2: number; y2: number; tone: string }) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const ax = x2 - 9 * Math.cos(angle);
  const ay = y2 - 9 * Math.sin(angle);
  const left = angle + Math.PI * 0.82;
  const right = angle - Math.PI * 0.82;
  return (
    <g className={`eqc-arrow eqc-arrow--${tone}`}>
      <line x1={x1} y1={y1} x2={ax} y2={ay} />
      <path
        d={`M ${x2} ${y2} L ${x2 + 10 * Math.cos(left)} ${y2 + 10 * Math.sin(left)} L ${x2 + 10 * Math.cos(right)} ${y2 + 10 * Math.sin(right)} Z`}
      />
    </g>
  );
}

/** STATE A — typical current workflow over the shared coordinate system. */
function CurrentDiagram() {
  return (
    <svg className="eqc-svg" viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} aria-hidden="true" focusable="false">
      <EquipmentZone />
      {/* Collection equipment → manual unloading chain, entering the washer */}
      <rect className="eqc-node eqc-node--existing" x={56} y={138} width={252} height={82} rx={10} />
      <text className="eqc-node-label" x={76} y={174}>Collection equipment</text>
      <text className="eqc-node-tag eqc-node-tag--existing" x={76} y={198}>EXISTING</text>

      <Arrow x1={308} y1={179} x2={396} y2={179} tone="muted" />

      <rect className="eqc-node eqc-node--manual" x={400} y={138} width={252} height={82} rx={10} />
      <text className="eqc-node-label" x={420} y={174}>Manual unloading</text>
      <text className="eqc-node-tag eqc-node-tag--manual" x={420} y={198}>MANUAL</text>

      <Arrow x1={652} y1={179} x2={832} y2={179} tone="muted" />

      {/* Manual transfer between washer and dispenser */}
      <rect className="eqc-node eqc-node--manual" x={560} y={330} width={220} height={64} rx={10} />
      <text className="eqc-node-label eqc-node-label--sm" x={578} y={357}>Manual transfer</text>
      <text className="eqc-node-tag eqc-node-tag--manual" x={578} y={378}>MANUAL</text>
      <path className="eqc-path eqc-path--muted" d={`M ${WASHER.x} ${WASHER.y + 41} C 700 179, 690 330, 672 330`} fill="none" />
      <path className="eqc-path eqc-path--muted" d={`M 672 394 C 690 420, 760 300, ${DISPENSER.x} ${DISPENSER.y + 41}`} fill="none" />

      {/* Operating-condition footnote row (visual echo; full text lives in HTML) */}
      <text className="eqc-foot" x={56} y={438}>Fixed or manual dispatch · separate task and equipment states · limited end-to-end verification</text>
    </svg>
  );
}

/** STATE B — the same facility with NXTektal coordination added. */
function NxtektalDiagram() {
  return (
    <svg className="eqc-svg" viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} aria-hidden="true" focusable="false">
      <EquipmentZone />
      {/* Coordination chain */}
      <rect className="eqc-node eqc-node--nxt" x={56} y={60} width={224} height={82} rx={10} />
      <text className="eqc-node-label" x={76} y={96}>Monitor &amp; Prioritize</text>
      <text className="eqc-node-tag eqc-node-tag--nxt" x={76} y={120}>NXTEKTAL</text>

      <Arrow x1={168} y1={142} x2={168} y2={210} tone="blue" />

      <rect className="eqc-node eqc-node--nxt" x={56} y={214} width={224} height={82} rx={10} />
      <text className="eqc-node-label" x={76} y={250}>Autonomous Collection</text>
      <text className="eqc-node-tag eqc-node-tag--nxt" x={76} y={274}>NXTEKTAL</text>

      <Arrow x1={280} y1={255} x2={396} y2={255} tone="blue" />

      <rect className="eqc-node eqc-node--nxt" x={400} y={214} width={224} height={82} rx={10} />
      <text className="eqc-node-label" x={420} y={250}>Modular Handoff</text>
      <text className="eqc-node-tag eqc-node-tag--nxt" x={420} y={274}>NXTEKTAL</text>

      {/* Handoff feeds the same washer the facility already owns */}
      <Arrow x1={624} y1={255} x2={832} y2={182} tone="blue" />
      {/* Coordinated washer → dispenser flow */}
      <Arrow x1={WASHER.x + 150} y1={WASHER.y + 82} x2={DISPENSER.x + 150} y2={DISPENSER.y} tone="lime" />

      {/* Verification closes the loop */}
      <rect className="eqc-node eqc-node--verify" x={400} y={330} width={224} height={64} rx={10} />
      <text className="eqc-node-label eqc-node-label--sm" x={420} y={357}>Verify &amp; Report</text>
      <text className="eqc-node-tag eqc-node-tag--verify" x={420} y={378}>WORKFLOW STATUS</text>
      <path className="eqc-path eqc-path--lime" d={`M ${ZONE.x + 40} ${ZONE.y + ZONE.h} C 740 400, 700 362, 628 362`} fill="none" />
      <path className="eqc-path eqc-path--blue" d={`M 400 362 C 160 362, 168 200, 168 146`} fill="none" />

      <text className="eqc-foot" x={56} y={438}>Demand-aware dispatch · coordinated equipment state · end-to-end workflow status</text>
    </svg>
  );
}

/** Semantic HTML card — the always-present description of one state. */
function StateCard({ state }: { state: WorkflowState }) {
  return (
    <article className={`eqc-card eqc-card--${state.key}`}>
      <h3 className="eqc-card-title">{state.label}</h3>
      <ol className="eqc-chain" aria-label={`${state.label} — workflow order`}>
        {state.nodes.map((node) => (
          <li key={node.label} className={`eqc-chip eqc-chip--${node.kind}`}>
            <strong>{node.label}</strong>
            <span>
              {node.kind === "existing"
                ? "EXISTING EQUIPMENT"
                : node.kind === "manual"
                  ? "MANUAL"
                  : node.kind === "verify"
                    ? "WORKFLOW STATUS"
                    : "NXTEKTAL"}
            </span>
          </li>
        ))}
      </ol>
      <ul className="eqc-conditions">
        {state.conditions.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </article>
  );
}

export default function EquipmentCompare() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1121px)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const sync = () => setEnhanced(desktop.matches && finePointer.matches);
    sync();
    desktop.addEventListener("change", sync);
    finePointer.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      finePointer.removeEventListener("change", sync);
    };
  }, []);

  // The range input writes the position straight into a CSS custom property —
  // no React state, so pointer movement costs zero re-renders.
  const onInput = (event: React.FormEvent<HTMLInputElement>) => {
    const value = clampComparePosition(Number(event.currentTarget.value));
    stageRef.current?.style.setProperty("--eqc-pos", `${value}%`);
  };

  return (
    <div className="eqc">
      {enhanced && (
        <div
          ref={stageRef}
          className="eqc-stage"
          style={{ "--eqc-pos": `${COMPARE_DEFAULT}%` } as React.CSSProperties}
        >
          <span className="eqc-stage-tag eqc-stage-tag--nxt">WITH NXTEKTAL</span>
          <span className="eqc-stage-tag eqc-stage-tag--current">TYPICAL CURRENT WORKFLOW</span>
          <div className="eqc-layer eqc-layer--current" aria-hidden="true">
            <CurrentDiagram />
          </div>
          {/* NXTektal layer occupies the left of the divider: 0% = all current, 100% = all NXTektal */}
          <div className="eqc-layer eqc-layer--nxt" aria-hidden="true">
            <NxtektalDiagram />
          </div>
          <div className="eqc-divider" aria-hidden="true">
            <span className="eqc-handle" />
          </div>
          <input
            className="eqc-range"
            type="range"
            min={0}
            max={100}
            step={1}
            defaultValue={COMPARE_DEFAULT}
            onInput={onInput}
            aria-label="Compare the typical current workflow with the NXTektal workflow"
          />
        </div>
      )}

      {/* Complete semantic states — the mobile/tablet/no-JS presentation, and
          the screen-reader description on enhanced desktop. */}
      <div className={enhanced ? "eqc-cards eqc-cards--sr" : "eqc-cards"}>
        <StateCard state={CURRENT_WORKFLOW} />
        <StateCard state={NXTEKTAL_WORKFLOW} />
      </div>

      {/* What stays / what NXTektal adds */}
      <div className="eqc-columns">
        <div>
          <h3 className="eqc-col-title">WHAT STAYS</h3>
          <ul className="eqc-col-list">
            {WHAT_STAYS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="eqc-col-title eqc-col-title--nxt">WHAT NXTEKTAL ADDS</h3>
          <ul className="eqc-col-list">
            {WHAT_NXTEKTAL_ADDS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

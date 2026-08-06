"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_STAGE,
  EXPANSION_STAGES,
  OPERATING_LAYER,
  clampStage,
} from "../../lib/expansionStages";
import { expansionMap } from "../../lib/visualAssets";
import { ResponsiveStill } from "../media/ResponsiveMedia";

/**
 * Operating Layer Terrain Map (Phase 2D Sprint 3).
 *
 * The authoritative Expansion renderer (single source of truth — the
 * registry's still remains an optional override poster; the inline SVG is
 * the documented exception from PHASE_2_VISUAL_ASSET_PLAN.md).
 *
 * Server-rendered default: a static complete facility map (all stages
 * visible at full strength) followed by three complete stage cards — that
 * is the no-JS, mobile, tablet, and reduced-enhancement presentation.
 *
 * Client enhancement (≥1121px): two-column composition — the same map with
 * stage-scoped emphasis (CSS transitions on data-stage), plus the Operating
 * Layer core panel and three semantic stage buttons (aria-pressed, default
 * Starting Point, never auto-cycled).
 *
 * The map is an illustrative managed golf-facility plan — not a real
 * customer facility, not a globe, not geography.
 */

/** Facility terrain — one stable coordinate system (viewBox 980×620). */
function TerrainMap({ stage }: { stage: 1 | 2 | 3 }) {
  return (
    <svg
      className="tm-svg"
      viewBox="0 0 980 620"
      aria-hidden="true"
      focusable="false"
      data-stage={stage}
    >
      {/* ---- base terrain: facility zones + topographic contours ---- */}
      <g className="tm-base">
        {/* fairway / rough sweep */}
        <path className="tm-area tm-area--turf" d="M 300 40 C 560 20, 840 90, 950 240 C 990 330, 940 470, 810 540 C 700 590, 520 600, 400 560 C 470 470, 520 420, 560 340 C 600 250, 520 130, 300 40 Z" />
        {/* driving range fan */}
        <path className="tm-area tm-area--range" d="M 60 120 C 140 70, 260 60, 330 90 C 420 130, 470 240, 440 350 C 420 430, 350 480, 260 490 L 100 470 C 60 360, 40 220, 60 120 Z" />
        {/* greens */}
        <ellipse className="tm-area tm-area--green" cx="770" cy="200" rx="74" ry="48" />
        <ellipse className="tm-area tm-area--green" cx="860" cy="400" rx="60" ry="42" />
        {/* bunkers */}
        <path className="tm-area tm-area--bunker" d="M 690 260 q 26 -16 50 2 q 12 22 -12 32 q -34 8 -46 -8 q -6 -16 8 -26 Z" />
        <path className="tm-area tm-area--bunker" d="M 790 470 q 22 -14 44 0 q 14 18 -8 30 q -30 10 -44 -6 q -6 -14 8 -24 Z" />
        {/* maintenance area */}
        <rect className="tm-area tm-area--maint" x="560" y="480" width="150" height="92" rx="10" />
        {/* facility core / clubhouse */}
        <rect className="tm-area tm-area--core" x="180" y="500" width="230" height="86" rx="10" />
        {/* topographic contours */}
        <path className="tm-contour" d="M 520 80 C 660 110, 800 180, 880 300" />
        <path className="tm-contour" d="M 480 120 C 620 160, 740 240, 820 380" />
        <path className="tm-contour" d="M 440 620 C 560 560, 660 560, 780 580" />
        <path className="tm-contour" d="M 40 540 C 120 520, 180 530, 240 560" />
        {/* zone labels */}
        <text className="tm-zone-label" x="130" y="150">DRIVING RANGE</text>
        <text className="tm-zone-label" x="600" y="90">FAIRWAY / ROUGH</text>
        <text className="tm-zone-label" x="726" y="160">GREENS</text>
        <text className="tm-zone-label" x="648" y="248">BUNKERS</text>
        <text className="tm-zone-label" x="576" y="472">MAINTENANCE</text>
        <text className="tm-zone-label" x="196" y="492">FACILITY CORE</text>
      </g>

      {/* ---- stage 1: range ball operating loop (lime = current wedge) ---- */}
      <g className="tm-s1">
        {/* collection route loop across the range */}
        <path className="tm-route" d="M 150 200 C 220 150, 320 160, 360 230 C 395 300, 340 380, 250 400 C 190 410, 150 380, 140 320 C 132 270, 135 235, 150 200 Z" />
        {/* handoff point */}
        <circle className="tm-node tm-node--lime" cx="290" cy="452" r="9" />
        <text className="tm-node-label tm-node-label--lime" x="304" y="447">Handoff point</text>
        {/* washer / dispenser inside facility core */}
        <rect className="tm-equip" x="206" y="524" width="86" height="40" rx="6" />
        <text className="tm-equip-label" x="214" y="548">Washer</text>
        <rect className="tm-equip" x="306" y="524" width="86" height="40" rx="6" />
        <text className="tm-equip-label" x="312" y="548">Dispenser</text>
        {/* loop: route → handoff → core → back */}
        <path className="tm-link tm-link--lime" d="M 250 400 C 262 424, 274 438, 286 448" />
        <path className="tm-link tm-link--lime" d="M 292 462 C 296 486, 296 504, 294 522" />
        <path className="tm-link tm-link--lime tm-link--dash" d="M 200 522 C 160 460, 140 420, 146 330" />
      </g>

      {/* ---- stage 2: inspection & grounds care (electric blue) ---- */}
      <g className="tm-s2">
        <g className="tm-marker" transform="translate(620,140)">
          <circle className="tm-node tm-node--blue" r="9" />
          <text className="tm-node-label tm-node-label--blue" x="14" y="-6">Drone inspection</text>
        </g>
        <g className="tm-marker" transform="translate(560,300)">
          <circle className="tm-node tm-node--blue" r="9" />
          <text className="tm-node-label tm-node-label--blue" x="14" y="-6">Turf &amp; soil</text>
        </g>
        <g className="tm-marker" transform="translate(716,286)">
          <circle className="tm-node tm-node--blue" r="9" />
          <text className="tm-node-label tm-node-label--blue" x="16" y="16">Bunker care</text>
        </g>
        <g className="tm-marker" transform="translate(840,300)">
          <circle className="tm-node tm-node--blue" r="9" />
          <text className="tm-node-label tm-node-label--blue" x="-24" y="-14">Mowing</text>
        </g>
        <g className="tm-marker" transform="translate(636,520)">
          <circle className="tm-node tm-node--blue" r="9" />
          <text className="tm-node-label tm-node-label--blue" x="14" y="4">Equipment inspection</text>
        </g>
        {/* system relationships back toward the facility core */}
        <path className="tm-link tm-link--blue" d="M 620 149 C 560 220, 480 320, 400 470" />
        <path className="tm-link tm-link--blue" d="M 560 309 C 500 380, 440 440, 402 486" />
        <path className="tm-link tm-link--blue" d="M 716 295 C 620 380, 500 460, 408 500" />
        <path className="tm-link tm-link--blue" d="M 840 309 C 740 420, 560 500, 414 520" />
        <path className="tm-link tm-link--blue" d="M 626 528 C 540 548, 470 548, 414 540" />
      </g>

      {/* ---- stage 3: facility-wide coordination (muted blue-gray) ---- */}
      <g className="tm-s3">
        {/* charging / maintenance coordination */}
        <g className="tm-marker" transform="translate(600,452)">
          <rect className="tm-node-sq tm-node-sq--slate" x="-9" y="-9" width="18" height="18" rx="4" />
          <text className="tm-node-label tm-node-label--slate" x="14" y="-8">Charging &amp; maintenance</text>
        </g>
        {/* multi-robot routes across zones */}
        <path className="tm-link tm-link--slate tm-link--dash" d="M 360 230 C 500 180, 640 160, 760 190" />
        <path className="tm-link tm-link--slate tm-link--dash" d="M 250 400 C 420 420, 520 440, 592 452" />
        <path className="tm-link tm-link--slate tm-link--dash" d="M 608 462 C 700 470, 780 440, 852 408" />
        <path className="tm-link tm-link--slate tm-link--dash" d="M 770 248 C 760 320, 700 420, 640 500" />
        {/* logistics + reporting into the operating layer anchor */}
        <g className="tm-marker" transform="translate(470,560)">
          <rect className="tm-node-sq tm-node-sq--slate" x="-9" y="-9" width="18" height="18" rx="4" />
          <text className="tm-node-label tm-node-label--slate" x="14" y="4">Equipment logistics</text>
        </g>
        <path className="tm-link tm-link--slate" d="M 461 560 C 430 566, 416 570, 412 570" />
      </g>

      {/* ---- operating-layer anchor: everything reports into the core ---- */}
      <g className="tm-anchor">
        <rect className="tm-anchor-box" x="180" y="576" width="252" height="30" rx="7" />
        <text className="tm-anchor-label" x="198" y="596">NXTEKTAL OPERATING LAYER</text>
      </g>
    </svg>
  );
}

export default function ExpansionMap() {
  const [enhanced, setEnhanced] = useState(false);
  const [stage, setStage] = useState<1 | 2 | 3>(DEFAULT_STAGE);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1121px)");
    const sync = () => setEnhanced(desktop.matches);
    sync();
    desktop.addEventListener("change", sync);
    return () => desktop.removeEventListener("change", sync);
  }, []);

  // Optional registry override: if a produced still is ever registered it
  // replaces the code-native map as the stage visual (fallback contract).
  const still = expansionMap.still;

  const mapVisual = still ? (
    <ResponsiveStill source={still} />
  ) : (
    <TerrainMap stage={enhanced ? stage : 3} />
  );

  return (
    <div className={enhanced ? "tm tm--enhanced" : "tm"}>
      <div className="tm-stage-wrap">
        <div className="tm-map" data-stage={enhanced ? stage : 3}>
          {mapVisual}
          <p className="tm-map-caption">
            Illustrative managed golf-facility plan — not a specific customer facility.
          </p>
        </div>

        {enhanced && (
          <div className="tm-side">
            <div className="tm-core" role="group" aria-label="NXTektal Operating Layer functions">
              <strong className="tm-core-name">{OPERATING_LAYER.name}</strong>
              <ul className="tm-core-fns">
                {OPERATING_LAYER.functions.map((fn) => (
                  <li key={fn}>{fn}</li>
                ))}
              </ul>
            </div>
            <div className="tm-controls" role="group" aria-label="Expansion stages">
              {EXPANSION_STAGES.map((s) => (
                <button
                  key={s.number}
                  type="button"
                  className="tm-control"
                  aria-pressed={stage === s.number}
                  onClick={() => setStage(clampStage(s.number))}
                >
                  <span className="tm-control-head">
                    <span className="tm-control-num" aria-hidden="true">
                      {String(s.number).padStart(2, "0")}
                    </span>
                    <span className="tm-control-label">{s.label}</span>
                    <span className={`tm-status tm-status--${s.number}`}>{s.status}</span>
                  </span>
                  <span className="tm-control-title">{s.title}</span>
                  <span className="tm-control-caps">{s.capabilities.join(" · ")}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Complete stage narratives — the mobile/tablet/no-JS presentation and
          the always-available screen-reader description. */}
      <div className={enhanced ? "tm-cards tm-cards--sr" : "tm-cards"}>
        <div className="tm-core tm-core--card" role="group" aria-label="NXTektal Operating Layer functions">
          <strong className="tm-core-name">{OPERATING_LAYER.name}</strong>
          <ul className="tm-core-fns">
            {OPERATING_LAYER.functions.map((fn) => (
              <li key={fn}>{fn}</li>
            ))}
          </ul>
        </div>
        {EXPANSION_STAGES.map((s) => (
          <article key={s.number} className={`tm-card tm-card--${s.number}`}>
            <span className="tm-card-label">{s.label}</span>
            <h3>{s.title}</h3>
            <ul>
              {s.capabilities.map((cap) => (
                <li key={cap}>{cap}</li>
              ))}
            </ul>
            <span className={`tm-status tm-status--${s.number}`}>{s.status}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

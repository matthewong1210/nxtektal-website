"use client";

import { useEffect, useRef, useState } from "react";
import MediaFrame from "../media/MediaFrame";
import { ResponsiveLoop, ResponsiveStill } from "../media/ResponsiveMedia";
import { agentSimulatorDemo } from "../../lib/visualAssets";

/**
 * Range Operations Simulator proof module — first block of the existing
 * #intelligence chapter (Phase 2C Sprint 1). Presents the working simulator
 * as software-development evidence; never as live facility data.
 *
 * Media policy:
 * - One ResponsiveStill poster renders everywhere first (desktop crop +
 *   1080×1350 mobile recomposition via the same <picture>) — no video is
 *   requested on mobile or for reduced-motion users, and the aspect-reserved
 *   stage prevents layout shift.
 * - On desktop (>760px) with motion allowed, the poster upgrades to the
 *   muted ~13.6s loop (WebM → MP4, poster attached) after the preferences
 *   resolve. The loop never mounts otherwise, so no wasted download.
 */

const processItems = [
  { name: "SIMULATE", body: "Model demand, robot availability, equipment delays, and failure conditions." },
  { name: "COMPARE", body: "Measure availability, throughput, stockouts, interventions, energy, and utilization." },
  { name: "MANAGER REVIEW", body: "Surface policy changes and operating recommendations for human review." },
  { name: "OPERATE", body: "Coordinate approved tasks across robots, equipment, and workflow agents." },
  { name: "IMPROVE", body: "Compare expected and observed outcomes to inform the next recommendation." },
];

export default function SimulatorProof() {
  // null = unresolved; the loop mounts only on a definite desktop+motion yes.
  const [playLoop, setPlayLoop] = useState<boolean | null>(null);
  // The ~500KB loop stays unrequested until the section approaches the
  // viewport (poster renders meanwhile) — below-the-fold media is not
  // preloaded at page load.
  const [near, setNear] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (near) return;
    const check = () => {
      const el = rootRef.current;
      if (!el) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 1.5) {
        setNear(true);
        window.removeEventListener("scroll", check);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [near]);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 761px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPlayLoop(wide.matches && !reduced.matches);
    sync();
    wide.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  if (!agentSimulatorDemo.ready) return null;

  const { loop, posterDesktop, posterMobile, alt, caption, truthLabel } = agentSimulatorDemo;

  return (
    <div className="sim-proof" ref={rootRef}>
      <div className="eyebrow">SIMULATION &amp; OPERATING INTELLIGENCE</div>
      <h2>Test the operation before it reaches the field.</h2>
      <p className="section-body">
        NXTektal&rsquo;s Range Operations Simulator replays demand changes, robot states, dispatch decisions, handoff activity, and equipment constraints before an operating policy reaches a pilot site.
      </p>

      <div className="sim-duo">
        <div className="sim-media">
          <MediaFrame caption={caption} className="sim-frame">
            <span className="sim-truth-tag">{truthLabel}</span>
            {playLoop && near ? (
              <ResponsiveLoop source={{ ...loop, poster: posterDesktop.webp, alt }} />
            ) : (
              <ResponsiveStill
                source={{
                  ...posterDesktop,
                  alt,
                  mobile: posterMobile,
                }}
              />
            )}
          </MediaFrame>
        </div>
        <div className="sim-copy">
          <p>
            Each run records service availability, throughput, stockouts, interventions, energy use, robot utilization, and estimated operating cost, allowing policies and failure responses to be compared under the same scenario.
          </p>
          <ol className="sim-process" aria-label="Simulation-to-operations process">
            {processItems.map((item, index) => (
              <li key={item.name}>
                <span className="wf-step-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="sim-qualification">
            Simulation informs operating decisions. Field performance is validated separately during pilot deployment.
          </p>
        </div>
      </div>
    </div>
  );
}

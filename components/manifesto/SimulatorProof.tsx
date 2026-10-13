"use client";

import { useEffect, useRef, useState } from "react";
import MediaFrame from "../media/MediaFrame";
import { ResponsiveLoop, ResponsiveStill } from "../media/ResponsiveMedia";
import { agentSimulatorDemo } from "../../lib/visualAssets";

/**
 * Range Operations Simulator proof module — the simulation block of the
 * #intelligence (software and machines) chapter (Phase 2C Sprint 1).
 * Presents the working simulator as software-development evidence; never as
 * live facility data.
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
      <div className="eyebrow">SIMULATION · WHERE THE SITE BRAIN IS BUILT TODAY</div>
      <h3>Test the operation before it reaches the field.</h3>
      <p className="section-body">
        The Range Operations Simulator is where the Site Brain&rsquo;s decision rules are developed and compared today. It replays demand changes, robot states, dispatch decisions, handoff activity, and equipment constraints before an operating policy reaches a pilot site. Passing in simulation shows the software logic holds; it does not show the physical job has been done.
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
          <ol className="sim-process" aria-label="What the simulator does today: simulate, compare, and prepare recommendations for manager review">
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
            Simulation results are not field results. Physical values in the simulator are placeholders until they are measured at a site. What a pilot adds is the operating loop above, run on a real site, and the record the improvement loop needs.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import MediaFrame from "../media/MediaFrame";
import { ResponsiveLoop, ResponsiveStill } from "../media/ResponsiveMedia";
import { workflowStepLoops, workflowStepStills } from "../../lib/visualAssets";
import {
  WORKFLOW_STEPS,
  isLoopStep,
  mediaKeyFor,
  resolveActiveStep,
  sequentialMediaFor,
} from "../../lib/workflowSteps";
import RobotVideo from "./RobotVideo";

/** Activation line: a fixed fraction of the viewport height. */
const ACTIVATION_FRACTION = 0.42;

/**
 * First Closed-Loop Workflow (Phase 2D Sprint 2A).
 *
 * Server-rendered default: a sequential story — every step's number, label,
 * description, and (distinct) media in DOM order. That is the no-JS, the
 * mobile, and the reduced-motion presentation, so nothing critical depends
 * on hydration, stickiness, or motion.
 *
 * Client enhancement (≥761px, motion allowed): a two-column sticky visual
 * story. The step list drives one authoritative active-step state from
 * measured geometry (rAF-throttled scroll/resize → resolveActiveStep with
 * hysteresis); the sticky media stage crossfades between per-step media,
 * and a decorative progress rail tracks completion. Geometry measurement
 * (not IntersectionObserver) is deliberate: this repo's scroll systems are
 * geometric (the hero ticker), a fixed activation line + hysteresis has no
 * clean IO equivalent, and refresh/anchor/resize all need explicit
 * measurement anyway.
 */
export default function WorkflowStory() {
  const listRef = useRef<HTMLOListElement>(null);
  const activeRef = useRef(0);
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  // Media stack: at most [previous, current]; current fades in on top of
  // previous so there is never an empty, white, or black frame between.
  const [stack, setStack] = useState<string[]>([mediaKeyFor(0)]);
  const [railFill, setRailFill] = useState(0);

  // Enhancement gate: desktop width AND motion allowed. Reduced-motion
  // users keep the fully stacked sequence (per spec, preferable) — which
  // also removes crossfades, rail travel, and workflow video autoplay.
  // 1121px matches the repo's established breakpoint contract: this
  // section (and the desktop nav) already restructure at ≤1120px.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1121px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnhanced(desktop.matches && !reduced.matches);
    sync();
    desktop.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  // One authoritative active-step measurement (enhanced mode only).
  useEffect(() => {
    if (!enhanced) return;
    const list = listRef.current;
    if (!list) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const items = list.querySelectorAll<HTMLElement>(".wf-step");
      if (items.length === 0) return;
      const tops: number[] = [];
      items.forEach((el) => tops.push(el.getBoundingClientRect().top));
      const line = window.innerHeight * ACTIVATION_FRACTION;
      const next = resolveActiveStep(tops, line, activeRef.current);
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
    };
    const schedule = () => {
      if (raf === 0) raf = requestAnimationFrame(measure);
    };
    // Initial synchronous measure covers mid-section refresh and direct
    // #first-workflow navigation; scroll/resize keep it current.
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf !== 0) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [enhanced]);

  // Media stack follows the active step's media identity. Contiguous
  // loop-backed steps share one identity, so COLLECT→RETURN→HANDOFF→WASH
  // never crossfades (and never restarts) the loop.
  const activeKey = mediaKeyFor(active);
  useEffect(() => {
    setStack((prev) =>
      prev[prev.length - 1] === activeKey
        ? prev
        : [...prev.filter((k) => k !== activeKey), activeKey].slice(-2)
    );
  }, [activeKey]);

  // Rail fill height tracks the active node (updates only on step change).
  useEffect(() => {
    if (!enhanced) return;
    const list = listRef.current;
    if (!list) return;
    const items = list.querySelectorAll<HTMLElement>(".wf-step");
    const el = items[active];
    if (el) setRailFill(el.offsetTop + 26);
  }, [enhanced, active]);

  const dropPrevious = () => setStack((prev) => prev.slice(-1));

  const renderStepMedia = (key: string) => {
    if (key === "loop") return <RobotVideo playing={isLoopStep(active)} />;
    const index = Number(key.split(":")[1]);
    if (key.startsWith("vloop:")) {
      const loop = workflowStepLoops[index]!;
      return (
        <ResponsiveLoop
          source={{ webm: loop.webm, mp4: loop.mp4, poster: loop.still.webp, alt: loop.still.alt }}
          playing={activeKey === key}
        />
      );
    }
    return <ResponsiveStill source={workflowStepStills[index]!} />;
  };

  // Simulator stills carry their qualification; approved physical product
  // media renders as normal product imagery with no public label.
  const captionFor = (index: number) => workflowStepStills[index]?.caption;

  // Warm the immediately adjacent stills (same markup the stage will
  // render, hidden) so a crossfade lands on a cached asset — without ever
  // eagerly downloading the rest of the registry.
  const warmSources = [active - 1, active + 1]
    .filter((i) => i >= 0 && i < WORKFLOW_STEPS.length)
    .map((i) => ({ key: mediaKeyFor(i), still: workflowStepStills[i] ?? workflowStepLoops[i]?.still }))
    .filter(
      (w, idx, arr) =>
        w.still !== undefined &&
        !stack.includes(w.key) &&
        arr.findIndex((o) => o.key === w.key) === idx
    );

  return (
    <div className={enhanced ? "wf-story wf-story--enhanced" : "wf-story"}>
      <div className="wf-narrative">
        {enhanced && (
          <div className="wf-rail" aria-hidden="true">
            <i className="wf-rail-fill" style={{ height: `${railFill}px` }} />
          </div>
        )}
        <ol
          ref={listRef}
          className="wf-steps"
          aria-label="Closed-loop workflow: monitor, prioritize, dispatch, collect, return, handoff, wash and dispense, verify"
        >
          {WORKFLOW_STEPS.map((step, index) => {
            const state = !enhanced
              ? ""
              : index === active
                ? " wf-step--active"
                : index < active
                  ? " wf-step--done"
                  : "";
            const seqMedia = sequentialMediaFor(index);
            return (
              <li
                key={step.name}
                className={`wf-step${state}`}
                aria-current={enhanced && index === active ? "step" : undefined}
                aria-labelledby={`wf-step-label-${index}`}
                aria-describedby={`wf-step-body-${index}`}
              >
                <span className="wf-step-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <strong id={`wf-step-label-${index}`}>{step.name}</strong>
                  <p id={`wf-step-body-${index}`}>{step.body}</p>
                </div>
                {!enhanced && seqMedia && (
                  <div className="wf-step-media">
                    <MediaFrame caption={captionFor(index)} aspect="16 / 9">
                      {seqMedia === "still" ? (
                        <ResponsiveStill source={workflowStepStills[index]!} />
                      ) : seqMedia === "poster" ? (
                        <ResponsiveStill source={workflowStepLoops[index]!.still} />
                      ) : (
                        <RobotVideo />
                      )}
                    </MediaFrame>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      {enhanced && (
        <div className="wf-visual">
          <div className="wf-visual-sticky">
            <MediaFrame caption={captionFor(active)} aspect="16 / 9">
              {warmSources.map(({ key, still }) => (
                <div key={key} className="wf-layer wf-layer--warm" aria-hidden="true">
                  <ResponsiveStill source={{ ...still!, alt: "" }} />
                </div>
              ))}
              {stack.map((key, i) => {
                const top = i === stack.length - 1;
                return (
                  <div
                    key={key}
                    className={top && stack.length > 1 ? "wf-layer wf-layer--in" : "wf-layer"}
                    onAnimationEnd={top && stack.length > 1 ? dropPrevious : undefined}
                  >
                    {renderStepMedia(key)}
                  </div>
                );
              })}
            </MediaFrame>
          </div>
        </div>
      )}
    </div>
  );
}

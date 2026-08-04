"use client";

import { useEffect, useRef } from "react";
import MediaFrame, { CAPTIONS } from "../media/MediaFrame";
import RobotVideo from "./RobotVideo";

const steps = [
  { name: "MONITOR", body: "Ball availability and demand are tracked across the range." },
  { name: "PRIORITIZE", body: "The Range Operations Agent decides when collection is worth running." },
  { name: "DISPATCH", body: "A mission is issued to the collection system." },
  { name: "COLLECT", body: "The robot sweeps priority zones and fills its hopper." },
  { name: "RETURN", body: "It navigates back to the handoff point." },
  { name: "HANDOFF", body: "Balls transfer into the modular handoff unit." },
  { name: "WASH & DISPENSE", body: "The facility’s existing equipment processes and returns balls to players." },
  { name: "VERIFY", body: "The workflow is confirmed complete and logged for review." },
];

/**
 * Scroll-driven workflow storytelling: the step list highlights as the
 * reader moves through the section while the product visual stays sticky.
 * The full list is always in the DOM, so the sequence reads completely
 * without JavaScript, with reduced motion, and for screen readers — the
 * highlight is a progressive enhancement driven by simple geometry
 * (no IntersectionObserver, which some embedded browsers throttle).
 */
export default function WorkflowStory() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const list = listRef.current;
    if (!list) return;
    // Dimming is opt-in via this class so no-JS (and reduced-motion) visitors
    // always read the full list at normal contrast.
    list.classList.add("wf-steps--js");

    let lastActive = -1;
    const tick = () => {
      const items = list.querySelectorAll<HTMLElement>(".wf-step");
      if (!items.length) return;
      const focusY = window.innerHeight * 0.44;
      let active = 0;
      items.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= focusY) active = i;
      });
      if (active !== lastActive) {
        lastActive = active;
        items.forEach((el, i) => el.classList.toggle("wf-step--active", i <= active));
      }
    };

    let raf = 0;
    const loop = () => {
      tick();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const interval = window.setInterval(tick, 300);
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="wf-story">
      <ol
        ref={listRef}
        className="wf-steps"
        aria-label="Closed-loop workflow: monitor, prioritize, dispatch, collect, return, handoff, wash and dispense, verify"
      >
        {steps.map((step, index) => (
          <li key={step.name} className="wf-step">
            <span className="wf-step-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{step.name}</strong>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="wf-visual">
        <div className="wf-visual-sticky">
          <MediaFrame caption={CAPTIONS.devViz} aspect="16 / 9">
            <RobotVideo />
          </MediaFrame>
        </div>
      </div>
    </div>
  );
}

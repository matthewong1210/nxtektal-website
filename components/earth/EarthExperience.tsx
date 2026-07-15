"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import EarthFallback from "./EarthFallback";
import GroundTransition from "./GroundTransition";
import {
  CHAPTERS,
  canvasOpacity,
  chapterOpacity,
  clamp01,
  earthState,
  groundOpacity,
  lerp,
  smoothstep,
  veilOpacity,
} from "./progress";

const EarthScene = dynamic(() => import("./EarthScene"), { ssr: false });

export type ChapterContent = {
  id: string;
  content: ReactNode;
};

/**
 * The scroll-driven cinematic sequence. A tall scroll region maps page
 * scroll to a 0–1 progress value (via GSAP ScrollTrigger); the WebGL earth,
 * the cloud veil, the ground stage and the DOM text chapters are all pure
 * functions of that progress, so scrolling up plays the exact same shot in
 * reverse. Below `prefers-reduced-motion` or without WebGL the sequence
 * degrades to static layouts with all copy and CTAs intact.
 */
export default function EarthExperience({
  chapters,
}: {
  chapters: ChapterContent[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  const [reduced, setReduced] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [active, setActive] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);

  const applyProgress = useCallback((p: number) => {
    earthState.progress = p;

    CHAPTERS.forEach((c, i) => {
      const el = chapterRefs.current[i];
      if (!el) return;
      const o = chapterOpacity(p, c, i === 0, i === CHAPTERS.length - 1);
      el.style.opacity = o.toFixed(3);
      el.style.visibility = o <= 0.01 ? "hidden" : "visible";
      const dir = p < (c.start + c.end) / 2 ? 1 : -1;
      el.style.transform = `translateY(${((1 - o) * 26 * dir).toFixed(2)}px)`;
      el.style.pointerEvents = o > 0.45 ? "auto" : "none";
    });

    if (canvasWrapRef.current) {
      canvasWrapRef.current.style.opacity = canvasOpacity(p).toFixed(3);
    }

    if (veilRef.current) {
      const v = veilOpacity(p);
      veilRef.current.style.opacity = v.toFixed(3);
      veilRef.current.style.visibility = v <= 0.005 ? "hidden" : "visible";
      const drift = smoothstep(0.55, 0.82, p);
      veilRef.current
        .querySelectorAll<HTMLElement>(".ez-veil-layer")
        .forEach((layer, i) => {
          const speed = 1 + i * 0.55;
          layer.style.transform = `translateY(${lerp(28, -34, drift) * speed}%) scale(${
            1.25 + drift * 0.35 * speed
          })`;
        });
    }

    if (groundRef.current) {
      const g = groundOpacity(p);
      groundRef.current.style.opacity = g.toFixed(3);
      groundRef.current.style.visibility = g <= 0.005 ? "hidden" : "visible";
      const settle = clamp01((p - 0.68) / 0.32);
      const scene = groundRef.current.querySelector<HTMLElement>(".concept-ground");
      if (scene) {
        scene.style.transform = `scale(${lerp(1.14, 1, settle)}) translateY(${lerp(-4, 0, settle)}%)`;
      }
      groundRef.current
        .querySelectorAll<SVGGElement>("[data-depth]")
        .forEach((layer) => {
          const far = layer.dataset.depth === "far";
          const shift = lerp(far ? 3.5 : 7, 0, settle);
          layer.style.transform = `translateY(${shift}%)`;
        });
    }
  }, []);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 760px)");
    const syncReduce = () => setReduced(mqReduce.matches);
    const syncMobile = () => {
      setMobile(mqMobile.matches);
      earthState.mobile = mqMobile.matches;
    };
    syncReduce();
    syncMobile();
    mqReduce.addEventListener("change", syncReduce);
    mqMobile.addEventListener("change", syncMobile);

    try {
      const probe = document.createElement("canvas");
      setWebgl(
        !!(probe.getContext("webgl2") || probe.getContext("webgl"))
      );
    } catch {
      setWebgl(false);
    }

    return () => {
      mqReduce.removeEventListener("change", syncReduce);
      mqMobile.removeEventListener("change", syncMobile);
    };
  }, []);

  useEffect(() => {
    if (reduced || !rootRef.current) return;

    if (process.env.NODE_ENV !== "production") {
      const forced = new URLSearchParams(window.location.search).get("ezp");
      if (forced !== null) {
        applyProgress(clamp01(parseFloat(forced) || 0));
        return;
      }
    }

    let trigger: import("gsap/ScrollTrigger").ScrollTrigger | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !rootRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      // The sequence sits at the very top of the page, so keep the WebGL
      // loop alive until the user has fully scrolled past it (progress = 1);
      // ScrollTrigger reports isActive=false at exactly scrollY 0.
      const sync = (self: { progress: number; isActive: boolean }) => {
        applyProgress(self.progress);
        setActive(self.progress < 1 || self.isActive);
      };
      trigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: sync,
        onToggle: sync,
      });
      sync(trigger);
    })();

    return () => {
      cancelled = true;
      trigger?.kill();
    };
  }, [reduced, applyProgress]);

  const showScene = webgl && !reduced;

  return (
    <div
      ref={rootRef}
      id="top"
      className={`ez-sequence${reduced ? " ez-reduced" : ""}`}
    >
      {CHAPTERS.filter((c) => c.id !== "top" && c.id !== "observation").map(
        (c) => (
          <div
            key={c.id}
            id={c.id}
            className="ez-anchor"
            style={{ top: `${(c.start + 0.02) * 100}%` }}
            aria-hidden="true"
          />
        )
      )}
      <div className="ez-viewport">
        <div
          ref={canvasWrapRef}
          className={`ez-canvas${sceneReady ? " ez-canvas--ready" : ""}`}
          aria-hidden="true"
        >
          {showScene && (
            <EarthScene
              mobile={mobile}
              active={active}
              onReady={() => setSceneReady(true)}
            />
          )}
        </div>
        {(!sceneReady || !showScene) && <EarthFallback />}
        <GroundTransition veilRef={veilRef} groundRef={groundRef} />
        {chapters.map((chapter, i) => (
          <section
            key={chapter.id}
            ref={(el) => {
              chapterRefs.current[i] = el;
            }}
            className={`ez-chapter ez-chapter--${chapter.id}`}
          >
            <div className="ez-chapter-inner">{chapter.content}</div>
          </section>
        ))}
      </div>
    </div>
  );
}

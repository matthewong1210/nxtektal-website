"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
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

/** Portion of the sequence covered by the earth-approach footage. */
const DIVE_END = 0.64;

/**
 * Crossfade window from the idle orbit clip to the zoom-in clip: the idle
 * shot fades out over IDLE_LOOP_END–XFADE_END while the zoom clip starts
 * scrubbing beneath it. The two clips share near-identical framing at the
 * hand-off, so the cut reads as one continuous camera move.
 */
const XFADE_END = 0.06;

/**
 * Portion of the sequence the space backdrop footage scrubs across. The
 * layer is fully faded by 0.66 (see the ez-space opacity curve), so the
 * clip spends its full length on the range where it is actually visible.
 */
const SPACE_END = 0.55;

/**
 * While progress rests below this, the footage plays as an ambient loop;
 * past it, playback pauses and scroll scrubs the exact frame.
 */
const IDLE_LOOP_END = 0.01;

export type ChapterContent = {
  id: string;
  content: ReactNode;
};

/**
 * The scroll-driven cinematic sequence. A tall scroll region maps page
 * scroll to a 0–1 progress value (via GSAP ScrollTrigger); the earth
 * footage (scrubbed frame-by-frame — encoded all-intra so seeks are
 * instant in both directions), the cloud veil, the ground stage and the
 * DOM text chapters are all pure functions of that progress, so scrolling
 * up plays the exact same shot in reverse. Under `prefers-reduced-motion`
 * the sequence degrades to static layouts with all copy and CTAs intact.
 */
export default function EarthExperience({
  chapters,
}: {
  chapters: ChapterContent[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);
  const spaceVideoRef = useRef<HTMLVideoElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const idleVideoRef = useRef<HTMLVideoElement>(null);
  const zoomVideoRef = useRef<HTMLVideoElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  const applyProgress = useCallback((p: number) => {
    earthState.progress = p;

    CHAPTERS.forEach((c, i) => {
      const el = chapterRefs.current[i];
      if (!el) return;
      // No chapter persists to the end: the ground reveal closes the
      // sequence as a clean visual beat before normal scrolling resumes.
      const o = chapterOpacity(p, c, i === 0, false);
      el.style.opacity = o.toFixed(3);
      el.style.visibility = o <= 0.01 ? "hidden" : "visible";
      const dir = p < (c.start + c.end) / 2 ? 1 : -1;
      el.style.transform = `translateY(${((1 - o) * 26 * dir).toFixed(2)}px)`;
      el.style.pointerEvents = o > 0.45 ? "auto" : "none";
    });

    if (canvasWrapRef.current) {
      canvasWrapRef.current.style.opacity = canvasOpacity(p).toFixed(3);
    }

    // Idle orbit clip: ambient loop while resting on the hero, fading out
    // over the crossfade window once scrolling starts.
    const idle = idleVideoRef.current;
    if (idle) {
      const o = 1 - smoothstep(IDLE_LOOP_END, XFADE_END, p);
      idle.style.opacity = o.toFixed(3);
      if (o > 0.01) {
        if (idle.paused) idle.play().catch(() => {});
      } else if (!idle.paused) {
        idle.pause();
      }
    }

    // Zoom-in clip: revealed beneath the idle shot and scrubbed
    // frame-exactly — progress IDLE_LOOP_END–DIVE_END maps onto the whole
    // clip. All-intra encoding makes seeks instant in both directions.
    const zoom = zoomVideoRef.current;
    if (zoom && zoom.duration) {
      const t =
        clamp01((p - IDLE_LOOP_END) / (DIVE_END - IDLE_LOOP_END)) *
        Math.max(0, zoom.duration - 1 / 30);
      if (!zoom.paused) zoom.pause();
      if (Math.abs(zoom.currentTime - t) > 0.016) {
        zoom.currentTime = t;
      }
    }

    if (spaceRef.current) {
      // The space backdrop recedes as the camera dives into the clouds.
      const o = 1 - smoothstep(0.5, 0.66, p);
      spaceRef.current.style.opacity = o.toFixed(3);
      const drift = smoothstep(0, 0.55, p);
      spaceRef.current.style.transform = `scale(${lerp(1.12, 1.01, drift)}) translateY(${lerp(-1.5, 1.5, drift)}%)`;
    }

    const spaceVideo = spaceVideoRef.current;
    if (spaceVideo && spaceVideo.duration && p < 0.7) {
      // Same treatment as the earth footage: ambient loop at rest on the
      // hero, exact-frame scrub once scrolling starts. Skipped entirely once
      // the layer has faded out (p ≥ 0.7) to save pointless seeks.
      if (p < IDLE_LOOP_END) {
        spaceVideo.loop = true;
        if (spaceVideo.paused) spaceVideo.play().catch(() => {});
      } else {
        spaceVideo.loop = false;
        if (!spaceVideo.paused) spaceVideo.pause();
        const t =
          clamp01(p / SPACE_END) * Math.max(0, spaceVideo.duration - 1 / 30);
        if (Math.abs(spaceVideo.currentTime - t) > 0.016) {
          spaceVideo.currentTime = t;
        }
      }
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
      const scene = groundRef.current.querySelector<HTMLElement>(".ground-photo");
      if (scene) {
        scene.style.transform = `scale(${lerp(1.16, 1.02, settle)}) translateY(${lerp(-3.5, 0, settle)}%)`;
      }
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

    let cancelled = false;
    let removeTick: (() => void) | undefined;

    (async () => {
      const { default: gsap } = await import("gsap");
      if (cancelled || !rootRef.current) return;
      // Progress is derived from the sequence's geometry on every GSAP
      // ticker frame rather than from scroll events, which some embedded
      // browsers fail to dispatch. Purely positional, so it is exact on
      // mid-page reload and fully reversible.
      let lastP = -1;
      const tick = () => {
        const el = rootRef.current;
        if (!el) return;
        const total = el.offsetHeight - window.innerHeight;
        const p = clamp01(-el.getBoundingClientRect().top / Math.max(1, total));
        if (Math.abs(p - lastP) > 0.0004) {
          lastP = p;
          applyProgress(p);
        }
      };
      gsap.ticker.add(tick);
      tick();
      // Safety net for environments that throttle rAF into silence
      // (embedded webviews): a coarse interval keeps progress tracking,
      // and the lastP check makes it a no-op when the ticker is healthy.
      const interval = window.setInterval(tick, 250);
      removeTick = () => {
        gsap.ticker.remove(tick);
        window.clearInterval(interval);
      };
    })();

    return () => {
      cancelled = true;
      removeTick?.();
    };
  }, [reduced, applyProgress]);

  // The video can finish loading before hydration attaches onLoadedData;
  // catch up from readyState so the poster does not linger over the footage.
  // onLoadedData can be missed when the (cached) video loads before
  // hydration, and some embedded browsers drop media events entirely —
  // poll readiness as a fallback and stop as soon as the poster is gone.
  useEffect(() => {
    if (sceneReady || reduced) return;
    const check = () =>
      !!(idleVideoRef.current && idleVideoRef.current.readyState >= 2) &&
      (setSceneReady(true), true);
    if (check()) return;
    const id = window.setInterval(() => {
      if (check()) window.clearInterval(id);
    }, 300);
    return () => window.clearInterval(id);
  }, [sceneReady, reduced]);

  const showVideo = !reduced;

  return (
    <div
      ref={rootRef}
      id="top"
      className={`ez-sequence${reduced ? " ez-reduced" : ""}`}
    >
      <div className="ez-viewport">
        <div ref={spaceRef} className="ez-space" aria-hidden="true">
          {showVideo && (
            <video
              ref={spaceVideoRef}
              className="ez-space-video"
              src={mobile ? "/earth/space-drift-sm.mp4" : "/earth/space-drift.mp4"}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          )}
          <div className="ez-space-shade" />
          <div className="ez-space-glow ez-space-glow-a" />
          <div className="ez-space-glow ez-space-glow-b" />
        </div>
        <div
          ref={canvasWrapRef}
          className={`ez-canvas${sceneReady ? " ez-canvas--ready" : ""}`}
          aria-hidden="true"
        >
          {showVideo && (
            <>
              <video
                ref={zoomVideoRef}
                className="ez-dive-video"
                src={mobile ? "/earth/earth-zoom-sm.mp4" : "/earth/earth-zoom.mp4"}
                muted
                playsInline
                preload="auto"
              />
              <video
                ref={idleVideoRef}
                className="ez-dive-video ez-idle-video"
                src={mobile ? "/earth/earth-idle-sm.mp4" : "/earth/earth-idle.mp4"}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onLoadedData={() => setSceneReady(true)}
              />
            </>
          )}
        </div>
        {(!sceneReady || !showVideo) && <EarthFallback />}
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

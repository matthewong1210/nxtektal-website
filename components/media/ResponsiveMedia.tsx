"use client";

import { useEffect, useRef, useState } from "react";
import type { LoopSource, StillSource } from "../../lib/visualAssets";

/**
 * Renders a registry StillSource (AVIF→WebP picture with optional ≤760px
 * mobile recomposition) or LoopSource (WebM→MP4 with mandatory poster).
 *
 * This is the swap layer that makes future replacements registry-only:
 * a slot upgrades still → loop by passing a different prop — the component
 * tree around it never changes. Reduced-motion and load-failure states are
 * covered by the poster (video) and by MediaFrame's reserved stage (still).
 */

export function ResponsiveStill({ source }: { source: StillSource }) {
  return (
    <picture>
      {source.mobile && (
        <>
          <source media="(max-width: 760px)" type="image/avif" srcSet={source.mobile.avif} />
          <source media="(max-width: 760px)" type="image/webp" srcSet={source.mobile.webp} />
        </>
      )}
      <source type="image/avif" srcSet={source.avif} />
      <img
        src={source.webp}
        width={source.width}
        height={source.height}
        alt={source.alt}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

export function ResponsiveLoop({ source }: { source: LoopSource }) {
  const ref = useRef<HTMLVideoElement>(null);
  // null = preference unresolved; autoplay waits for a definite answer so
  // reduced-motion users get the poster, never a pre-hydration flash.
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced === null) return;
    if (reduced) {
      video.pause();
      return;
    }
    video.play().catch(() => {});
    // Strict autoplay policies (battery-saver modes) need a user gesture
    // first — retry once after the first interaction, as RobotVideo does.
    const retry = () => {
      if (video.paused) video.play().catch(() => {});
    };
    const options = { once: true, passive: true } as const;
    window.addEventListener("pointerdown", retry, options);
    window.addEventListener("touchstart", retry, options);
    window.addEventListener("keydown", retry, options);
    return () => {
      window.removeEventListener("pointerdown", retry);
      window.removeEventListener("touchstart", retry);
      window.removeEventListener("keydown", retry);
    };
  }, [reduced]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      autoPlay={reduced === false}
      preload="metadata"
      poster={source.poster}
      controls={reduced === true}
      aria-label={source.alt}
    >
      <source src={source.webm} type="video/webm" />
      <source src={source.mp4} type="video/mp4" />
    </video>
  );
}

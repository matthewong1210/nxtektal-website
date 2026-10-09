"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { heroMasterFrame, type HeroLoop } from "../../lib/visualAssets";

type VideoSize = "mobile" | "desktop";

/** Poster-first hero film. Width selects the encode, not playback eligibility.
 * Reduced-motion and no-JS visitors keep the still without loading video.
 */
export default function HeroBackgroundVideo() {
  const [size, setSize] = useState<VideoSize | null>(null);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 760px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSize(reduced.matches ? null : narrow.matches ? "mobile" : "desktop");
    sync();
    narrow.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      narrow.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  const loop = heroMasterFrame.loop;
  if (!loop || !size) return null;
  // A new element resets source selection and the poster fade on rotation.
  return <HeroFilm key={size} size={size} loop={loop} />;
}

function HeroFilm({ size, loop }: { size: VideoSize; loop: HeroLoop }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [live, setLive] = useState(false);
  const [needsPlay, setNeedsPlay] = useState(false);

  const tryPlay = useCallback(() => {
    const video = ref.current;
    if (!video || !video.paused || document.hidden) return;
    // Set the DOM property as well as the JSX flag before Safari's play call.
    video.muted = true;
    void video.play().catch(() => {
      if (ref.current === video) setNeedsPlay(true);
    });
  }, []);

  useEffect(() => {
    const video = ref.current;
    tryPlay();
    const onVisibility = () => {
      if (!document.hidden) tryPlay();
    };
    // Keep retries armed after browser pauses, including iOS low-power mode.
    document.addEventListener("visibilitychange", onVisibility);
    const options = { passive: true } as const;
    window.addEventListener("pointerup", tryPlay, options);
    window.addEventListener("touchend", tryPlay, options);
    window.addEventListener("keydown", tryPlay, options);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointerup", tryPlay);
      window.removeEventListener("touchend", tryPlay);
      window.removeEventListener("keydown", tryPlay);
      video?.pause();
    };
  }, [tryPlay]);

  return (
    <>
      <video
        ref={ref}
        className={`phero-video${live ? " is-live" : ""}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        // The picture below remains visible until actual playback begins.
        onPlaying={() => { setLive(true); setNeedsPlay(false); }}
        onPause={() => {
          setLive(false);
          if (!document.hidden) setNeedsPlay(true);
        }}
        onError={() => setLive(false)}
      >
        {size === "mobile" ? (
          <source src={loop.mobileMp4} type="video/mp4" />
        ) : (
          <>
            <source src={loop.webm} type="video/webm" />
            <source src={loop.mp4} type="video/mp4" />
          </>
        )}
      </video>
      {needsPlay && (
        <button className="phero-play" type="button" onClick={tryPlay}>
          Play background video
        </button>
      )}
    </>
  );
}

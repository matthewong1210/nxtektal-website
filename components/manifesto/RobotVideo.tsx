"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted looping field video. Autoplays (muted loops are autoplay-safe and
 * browsers throttle off-screen video decode on their own); reduced-motion
 * users get a paused video with native controls instead of a moving loop.
 */
export default function RobotVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduced) {
      video.pause();
      return;
    }
    video.play().catch(() => {});
    // Strict autoplay policies (e.g. battery-saver modes) need a user
    // gesture first — retry once after the first interaction.
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
      className="machine-video-el"
      src="/robot/robot-field.mp4"
      autoPlay={!reduced}
      muted
      loop
      playsInline
      preload="metadata"
      controls={reduced}
      aria-label="NXTektal ball collection robot operating on a driving range"
    />
  );
}

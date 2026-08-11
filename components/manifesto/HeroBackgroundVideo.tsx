"use client";

import { useEffect, useRef, useState } from "react";
import { heroMasterFrame } from "../../lib/visualAssets";

/**
 * Hero background motion layer (Phase 2G).
 *
 * Mounts the registry's hero loop as a decorative full-bleed layer between
 * the master-frame poster and the facility contours. Renders nothing on the
 * server and nothing until a definite desktop + motion-allowed answer, so
 * mobile (≤760px), prefers-reduced-motion, no-JS, autoplay-blocked, and
 * load-failure visitors all keep today's still hero — and the video bytes
 * are never requested on paths that will not play them (no hidden duplicate
 * mobile/desktop elements).
 *
 * The element stays at opacity 0 until real playback starts (`playing`,
 * not `canplay`, so a blocked-autoplay first frame is never shown) and then
 * fades in over the poster: no black frame, no layout shift, no controls,
 * no pointer interception.
 */
export default function HeroBackgroundVideo() {
  const loop = heroMasterFrame.loop;
  const ref = useRef<HTMLVideoElement>(null);
  // null = preferences unresolved; the video mounts only on a definite yes
  // for both gates (same resolved-preference pattern as ResponsiveLoop).
  const [eligible, setEligible] = useState<boolean | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    // Negation of the site's mobile breakpoint, so the two are exactly
    // complementary at fractional widths (zoom / non-integer DPR).
    const narrow = window.matchMedia("(max-width: 760px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEligible(!narrow.matches && !reduced.matches);
    sync();
    narrow.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      narrow.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!eligible) {
      setLive(false);
      return;
    }
    const video = ref.current;
    if (!video) return;
    const tryPlay = () => {
      if (video.paused) video.play().catch(() => {});
    };
    tryPlay();
    // Stay armed for the whole eligible session — a paused video must never
    // strand the hero on the poster until reload. Browsers pause background
    // tabs / low-power sessions; `visibilitychange` resumes on return, and
    // the gesture listeners cover strict autoplay policies that need a user
    // activation (granted at pointerup/touchend, not -down/-start). These
    // are cheap no-ops while playing; one-shot listeners proved
    // insufficient because a later browser pause found them consumed.
    const onVisibility = () => {
      if (!document.hidden) tryPlay();
    };
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
    };
  }, [eligible]);

  if (!loop || !eligible) return null;

  return (
    <video
      ref={ref}
      className={`phero-video${live ? " is-live" : ""}`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      // No poster attribute on purpose: the element is transparent until
      // `playing` fires, and the master-frame <picture> underneath is the
      // real poster — an attribute here would only re-download the WebP.
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setLive(true)}
      // A mid-session pause (tab backgrounding, low-power mode, a stall the
      // browser gives up on) must not leave a frozen mid-motion frame over
      // the poster — fade back out; a later `playing` fades back in. The
      // loop wrap-around never fires `pause`, so normal looping is unaffected.
      onPause={() => setLive(false)}
      onError={() => setLive(false)}
    >
      <source src={loop.webm} type="video/webm" />
      <source src={loop.mp4} type="video/mp4" />
    </video>
  );
}

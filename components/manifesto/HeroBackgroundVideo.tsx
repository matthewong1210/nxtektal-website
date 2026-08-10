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
    video.play().catch(() => {});
    // Strict autoplay policies (battery-saver modes) need a user gesture
    // first — retry once after the first interaction. Touch grants user
    // activation at pointerup/touchend (not -down/-start), so listen there
    // or the one-shot retry burns before activation exists.
    const retry = () => {
      if (video.paused) video.play().catch(() => {});
    };
    const options = { once: true, passive: true } as const;
    window.addEventListener("pointerup", retry, options);
    window.addEventListener("touchend", retry, options);
    window.addEventListener("keydown", retry, options);
    return () => {
      window.removeEventListener("pointerup", retry);
      window.removeEventListener("touchend", retry);
      window.removeEventListener("keydown", retry);
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

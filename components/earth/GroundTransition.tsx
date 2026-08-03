"use client";

import Image from "next/image";
import type { RefObject } from "react";
import { hasMasterFrame, heroInterim, heroMasterFrame } from "../../lib/heroAssets";

/**
 * The cloud veil that masks the earth→ground crossfade, plus the golf-range
 * ground stage. Both are plain DOM layers whose opacity/transforms are
 * driven by the scroll driver in EarthExperience, so the hand-off stays
 * perfectly reversible.
 *
 * Ground stage sources (PHASE_2B_VISUAL_BRIEF.md §4.1):
 * - Master frame absent (current state): the interim robot photograph,
 *   unchanged — the hero hard gate from Phase 2A.
 * - Master frame approved: responsive <picture> (AVIF→WebP, 3:4 mobile /
 *   16:9 desktop) plus the operating-intelligence overlay, and — once the
 *   motion deliverable exists — a WebM→MP4 loop with poster fallback.
 * All overlay text stays HTML/SVG outside the images.
 */
export default function GroundTransition({
  veilRef,
  groundRef,
}: {
  veilRef: RefObject<HTMLDivElement | null>;
  groundRef: RefObject<HTMLDivElement | null>;
}) {
  const master = hasMasterFrame() ? heroMasterFrame : null;
  const loop = master?.loop ?? null;

  return (
    <>
      <div ref={groundRef} className="ez-ground">
        <div className="ground-photo">
          {master ? (
            <>
              {loop ? (
                <video
                  className="ground-media"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={loop.poster}
                  aria-label={master.alt}
                >
                  <source src={loop.webm} type="video/webm" />
                  <source src={loop.mp4} type="video/mp4" />
                </video>
              ) : (
                <picture>
                  <source media="(max-width: 760px)" type="image/avif" srcSet={master.mobile!.avif} />
                  <source media="(max-width: 760px)" type="image/webp" srcSet={master.mobile!.webp} />
                  <source type="image/avif" srcSet={master.desktop!.avif} />
                  <img
                    className="ground-media"
                    src={master.desktop!.webp}
                    width={master.desktop!.width}
                    height={master.desktop!.height}
                    alt={master.alt}
                  />
                </picture>
              )}
              {/* Operating-intelligence overlay — HTML/SVG on top of the frame,
                  never baked in. Density capped per the brief: ≤3 chips. */}
              <div className="hero-overlay" aria-label="Operating layer status (illustrative)">
                <span className="hero-chip"><i className="hero-chip-dot hero-chip-dot--live" aria-hidden="true" /> Collection · Zone B — active</span>
                <span className="hero-chip hero-chip--data">Ball inventory — above threshold</span>
              </div>
              <p className="media-caption hero-frame-caption">{master.caption}</p>
            </>
          ) : (
            <Image src={heroInterim.src} alt={heroInterim.alt} fill sizes="100vw" />
          )}
        </div>
      </div>
      <div ref={veilRef} className="ez-veil" aria-hidden="true">
        <div className="ez-veil-layer ez-veil-a" />
        <div className="ez-veil-layer ez-veil-b" />
        <div className="ez-veil-layer ez-veil-c" />
      </div>
    </>
  );
}

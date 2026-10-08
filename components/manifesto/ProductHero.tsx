import type { ReactNode } from "react";
import { heroMasterFrame } from "../../lib/visualAssets";
import HeroBackgroundVideo from "./HeroBackgroundVideo";

/**
 * Product-led Hero (Phase 2E Sprint 1 · motion layer Phase 2G).
 *
 * The hero film's opening frame (dawn facility aerial with the
 * operating-layer scan) is the full-bleed poster stage; when the registry's
 * hero loop is active,
 * a gated client layer (HeroBackgroundVideo) fades the produced facility
 * film in over it, using a lighter encode on mobile. The copy renders over a
 * directional scrim, and a restrained operational overlay (loop chips +
 * low-opacity facility contours) communicates the Sense → Plan → Coordinate →
 * Execute → Verify loop without a HUD. The chip list is a labelled <ul> so the
 * "illustrative, not live data" qualifier reaches assistive technology, and
 * its first chip says the same thing visibly.
 *
 * No scroll track, no space imagery. The copy never depends on the media:
 * reduced-motion, no-JS, and load-failure paths keep the still,
 * and if that fails too the night-tone stage keeps the section fully
 * readable. Chip fade-in reuses the existing hero-fade rhythm and is
 * disabled under prefers-reduced-motion by the global motion rules.
 */
export default function ProductHero({ copy }: { copy: ReactNode }) {
  const { desktop, mobile, alt } = heroMasterFrame;

  return (
    <section className="phero" aria-label="NXTektal — the site brain and robotic workforce for outdoor facilities">
      {/* Not aria-hidden: the upstream mobile-video fix renders a reachable
          "Play background video" fallback button inside this stage. */}
      <div className="phero-media">
        {desktop && (
          <picture aria-hidden="true">
            {mobile && (
              <>
                <source media="(max-width: 760px)" type="image/avif" srcSet={mobile.avif} />
                <source media="(max-width: 760px)" type="image/webp" srcSet={mobile.webp} />
              </>
            )}
            <source type="image/avif" srcSet={desktop.avif} />
            <img
              src={desktop.webp}
              width={desktop.width}
              height={desktop.height}
              alt={alt}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        )}
        <HeroBackgroundVideo />
        {/* low-opacity facility contours — permitted ambient treatment */}
        <svg className="phero-contours" aria-hidden="true" viewBox="0 0 1440 810" preserveAspectRatio="xMidYMid slice">
          <path d="M -40 620 C 300 560, 620 590, 900 540 C 1120 500, 1300 520, 1480 470" />
          <path d="M -40 700 C 340 650, 700 680, 1040 620 C 1220 590, 1360 600, 1480 570" />
        </svg>
      </div>
      <div className="phero-scrim" aria-hidden="true" />

      <div className="phero-inner">
        <div className="ez-copy ez-copy--hero">{copy}</div>
        {/* site-brain loop overlay — illustrative, non-numeric, real DOM text */}
        <ul className="phero-chips" aria-label="Illustrative site brain readout — not live facility data">
          <li className="phero-chip phero-chip--note">Illustrative readout · not live data</li>
          <li className="phero-chip phero-chip--data">Sense · inventory and demand</li>
          <li className="phero-chip">Plan · collection run scheduled</li>
          <li className="phero-chip">Coordinate · task assigned to the robot</li>
          <li className="phero-chip"><i className="phero-dot" aria-hidden="true" /> Execute · robot sweeping Zone B</li>
          <li className="phero-chip">Verify · handoff confirmed</li>
        </ul>
      </div>
    </section>
  );
}

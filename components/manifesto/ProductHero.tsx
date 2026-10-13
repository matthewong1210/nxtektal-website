import type { ReactNode } from "react";
import { HERO_CAPTION } from "../../lib/firstJob";
import { heroMasterFrame } from "../../lib/visualAssets";
import HeroBackgroundVideo from "./HeroBackgroundVideo";

/**
 * Product-led Hero (Phase 2E Sprint 1 · motion layer Phase 2G · mobile film
 * PR #37).
 *
 * The hero film's opening frame (dawn facility aerial with the Site Brain
 * scan) is the full-bleed poster stage; when the registry's hero loop is
 * active, a gated client layer (HeroBackgroundVideo) fades the produced
 * facility film in over it, using a lighter encode on mobile. The copy
 * renders over a directional scrim, and a restrained overlay (loop chips +
 * low-opacity facility contours) walks through one job in the operating
 * loop without a HUD. The chip list is a labelled <ul> so the "illustrative,
 * not live data" qualifier reaches assistive technology; its first chip and
 * the caption under it say the same thing visibly, because the film is a
 * concept visualization that also shows later-stage machines.
 *
 * No scroll track, no space imagery. The copy never depends on the media:
 * reduced-motion, no-JS, and load-failure paths keep the still, and if that
 * fails too the night-tone stage keeps the section fully readable. Chip
 * fade-in reuses the existing hero-fade rhythm and is disabled under
 * prefers-reduced-motion by the global motion rules.
 */
export default function ProductHero({ copy }: { copy: ReactNode }) {
  const { desktop, mobile, alt } = heroMasterFrame;

  return (
    <section className="phero" aria-label="NXTektal — robots and the operating system behind them for outdoor work">
      {/* Not aria-hidden: the mobile-video fix renders a reachable
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
        {/* one job through the operating loop — illustrative, non-numeric, real DOM text */}
        <ul className="phero-chips" aria-label="Illustrative walk through one collection job — not live facility data">
          <li className="phero-chip phero-chip--note">Illustrative · not live data</li>
          <li className="phero-chip phero-chip--data">Work needed · outfield filling up</li>
          <li className="phero-chip">Scheduled · collection run</li>
          <li className="phero-chip"><i className="phero-dot" aria-hidden="true" /> In progress · robot sweeping</li>
          <li className="phero-chip">Confirmed · transfer logged</li>
          <li className="phero-chip">Exception · flagged to staff</li>
        </ul>
        <p className="phero-caption">{HERO_CAPTION}</p>
      </div>
    </section>
  );
}

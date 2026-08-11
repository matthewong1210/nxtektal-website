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
 * film in over it on desktop. The approved copy renders over a directional
 * scrim, and a restrained operational overlay (status chips + low-opacity
 * facility contours) communicates the operating layer without a HUD.
 *
 * No scroll track, no space imagery. The copy never depends on the media:
 * mobile, reduced-motion, no-JS, and load-failure paths keep the still,
 * and if that fails too the night-tone stage keeps the section fully
 * readable. Chip fade-in reuses the existing hero-fade rhythm and is
 * disabled under prefers-reduced-motion by the global motion rules.
 */
export default function ProductHero({ copy }: { copy: ReactNode }) {
  const { desktop, mobile, alt } = heroMasterFrame;

  return (
    <section className="phero" aria-label="NXTektal — the intelligence layer for autonomous golf facilities">
      <div className="phero-media" aria-hidden="true">
        {desktop && (
          <picture>
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
        <svg className="phero-contours" viewBox="0 0 1440 810" preserveAspectRatio="xMidYMid slice">
          <path d="M -40 620 C 300 560, 620 590, 900 540 C 1120 500, 1300 520, 1480 470" />
          <path d="M -40 700 C 340 650, 700 680, 1040 620 C 1220 590, 1360 600, 1480 570" />
        </svg>
      </div>
      <div className="phero-scrim" aria-hidden="true" />

      <div className="phero-inner">
        <div className="ez-copy ez-copy--hero">{copy}</div>
        {/* facility-intelligence overlay — illustrative, non-numeric, real DOM text */}
        <div className="phero-chips" aria-label="Illustrative facility intelligence readout">
          <span className="phero-chip phero-chip--data">State — monitoring</span>
          <span className="phero-chip"><i className="phero-dot" aria-hidden="true" /> Decision — collection priority updated</span>
          <span className="phero-chip">Execution — available</span>
        </div>
      </div>
    </section>
  );
}

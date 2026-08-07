import type { ReactNode } from "react";
import { heroMasterFrame } from "../../lib/visualAssets";

/**
 * Product-led Hero (Phase 2E Sprint 1).
 *
 * Replaces the earth-zoom scroll sequence: the approved Master Product
 * Visual (tracked collector on a sunlit range) is the full-bleed stage, the
 * approved copy renders over a directional scrim, and a restrained
 * operational overlay (two status chips + low-opacity facility contours)
 * communicates the operating layer without a HUD.
 *
 * No scroll track, no video, no space imagery. The copy never depends on
 * the image: if the still fails, the night-tone stage keeps the section
 * fully readable. Chip fade-in reuses the existing hero-fade rhythm and is
 * disabled under prefers-reduced-motion by the global motion rules.
 */
export default function ProductHero({ copy }: { copy: ReactNode }) {
  const { desktop, mobile, alt } = heroMasterFrame;

  return (
    <section className="phero" aria-label="NXTektal — one operating layer for autonomous golf facilities">
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
        {/* low-opacity facility contours — permitted ambient treatment */}
        <svg className="phero-contours" viewBox="0 0 1440 810" preserveAspectRatio="xMidYMid slice">
          <path d="M -40 620 C 300 560, 620 590, 900 540 C 1120 500, 1300 520, 1480 470" />
          <path d="M -40 700 C 340 650, 700 680, 1040 620 C 1220 590, 1360 600, 1480 570" />
        </svg>
      </div>
      <div className="phero-scrim" aria-hidden="true" />

      <div className="phero-inner">
        <div className="ez-copy ez-copy--hero">{copy}</div>
        {/* operational status overlay — real DOM text, max two chips */}
        <div className="phero-chips">
          <span className="phero-chip"><i className="phero-dot" aria-hidden="true" /> Collection · Zone B — active</span>
          <span className="phero-chip phero-chip--data">Ball inventory — above threshold</span>
        </div>
      </div>
    </section>
  );
}

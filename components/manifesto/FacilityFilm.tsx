import { GOLF } from "../../lib/homepage";
import { heroMasterFrame } from "../../lib/visualAssets";
import HeroBackgroundVideo from "./HeroBackgroundVideo";

/**
 * The facility film, framed as the main visual of the golf block (until
 * 2026-10-22 it was the full-bleed hero background). The film's opening
 * frame is the poster — the 16:9 still on wide viewports, the 3:4
 * recomposition centred on the Insite scan on narrow ones — and
 * HeroBackgroundVideo fades the loop in over it with the PR #37 behaviour
 * intact: a lighter encode on narrow viewports, muted inline autoplay,
 * poster first, a reachable "Play background video" fallback, and no video
 * under reduced motion. The label under the frame says what the film is,
 * because it is a concept visualization that also shows a transfer
 * mechanism under development and machines that are later direction.
 */
export default function FacilityFilm() {
  const { desktop, mobile, alt } = heroMasterFrame;

  return (
    <figure className="film">
      <div className="film-stage">
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
      </div>
      <figcaption className="film-label">{GOLF.filmLabel}</figcaption>
    </figure>
  );
}

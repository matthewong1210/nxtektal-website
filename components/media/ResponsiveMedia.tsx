import type { StillSource } from "../../lib/visualAssets";

/**
 * Renders a registry StillSource: an AVIF→WebP picture with an optional
 * ≤760px mobile recomposition. The caller reserves the stage's aspect ratio,
 * so a slow or failed load never shifts the layout.
 */
export function ResponsiveStill({ source }: { source: StillSource }) {
  return (
    <picture>
      {source.mobile && (
        <>
          <source media="(max-width: 760px)" type="image/avif" srcSet={source.mobile.avif} />
          <source media="(max-width: 760px)" type="image/webp" srcSet={source.mobile.webp} />
        </>
      )}
      <source type="image/avif" srcSet={source.avif} />
      <img
        src={source.webp}
        width={source.width}
        height={source.height}
        alt={source.alt}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

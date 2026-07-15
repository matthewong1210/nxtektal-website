/**
 * Branded static Earth poster. Shown while the WebGL scene loads, kept
 * permanently when WebGL is unavailable, and used as the hero visual in
 * reduced-motion mode. Pure DOM/CSS — uses the same local day texture, so
 * there is no layout shift or off-brand flash before the 3D scene is ready.
 */
export default function EarthFallback() {
  return (
    <div className="ez-poster" aria-hidden="true">
      <div className="ez-poster-earth">
        <div className="ez-poster-shade" />
      </div>
    </div>
  );
}

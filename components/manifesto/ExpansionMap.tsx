import MediaFrame, { CAPTIONS } from "../media/MediaFrame";
import { ResponsiveStill } from "../media/ResponsiveMedia";
import { expansionMap } from "../../lib/visualAssets";

/**
 * Facility capability map slot (#expansion, above the roadmap stages).
 *
 * Renders NOTHING until the map exists — the roadmap cards remain the
 * section's content and permanent fallback, and no public placeholder is
 * ever shown (Phase 2A rule). When the inline-SVG map component is built,
 * it mounts here in place of the still branch.
 */
export default function ExpansionMap() {
  // The inline-SVG map, when built, is added as a child right here (inline SVG
  // is code by nature — that edit is expected and documented). Until then the
  // slot activates only via a registered still; nothing else ever renders.
  if (!expansionMap.still) return null;

  return (
    <MediaFrame caption={CAPTIONS.direction} tone="light" bare className="expansion-map-frame">
      <ResponsiveStill source={expansionMap.still} />
    </MediaFrame>
  );
}

import MediaFrame from "../media/MediaFrame";
import { ResponsiveStill } from "../media/ResponsiveMedia";
import { buildEvidenceApproved, buildEvidencePhotos } from "../../lib/visualAssets";

/**
 * Real-build-evidence strip (PHASE_2_VISUAL_ASSET_PLAN.md contract 6).
 *
 * Mounted beside the Development Status band but renders NOTHING until
 * (a) real photos are registered in lib/visualAssets.ts and
 * (b) NXTektal has approved the strip (buildEvidenceApproved).
 * Real unretouched photography only — the MediaFrame caption slot carries
 * each photo's HTML date/location line, never a visualization label.
 */
export default function BuildEvidenceGallery() {
  if (!buildEvidenceApproved || buildEvidencePhotos.length === 0) return null;

  return (
    <div className="evidence-grid" role="list" aria-label="Real build evidence photographs">
      {buildEvidencePhotos.map((photo) => (
        <div role="listitem" key={photo.webp}>
          <MediaFrame caption={photo.line} aspect="3 / 2">
            <ResponsiveStill source={photo} />
          </MediaFrame>
        </div>
      ))}
    </div>
  );
}

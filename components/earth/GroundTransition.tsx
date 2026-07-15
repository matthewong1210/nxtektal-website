"use client";

import type { RefObject } from "react";

/**
 * The cloud veil that masks the earth→ground crossfade, plus the golf-range
 * ground stage — a full-bleed photograph of the NXTektal robot revealed as
 * the clouds part. Both are plain DOM layers whose opacity/transforms are
 * driven by the scroll driver in EarthExperience, so the hand-off stays
 * perfectly reversible.
 */
export default function GroundTransition({
  veilRef,
  groundRef,
}: {
  veilRef: RefObject<HTMLDivElement | null>;
  groundRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <>
      <div ref={groundRef} className="ez-ground">
        <div className="ground-photo">
          <img
            src="/robot/robot-front.jpg"
            alt="NXTektal ball collection robot facing the camera on a driving range at dusk"
          />
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

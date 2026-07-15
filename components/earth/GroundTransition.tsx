"use client";

import type { RefObject } from "react";
import ConceptScene from "../manifesto/ConceptScene";

/**
 * The cloud veil that masks the earth→ground crossfade, plus the golf-range
 * ground stage. Both are plain DOM layers whose opacity/transforms are driven
 * by the scroll driver in EarthExperience, so the hand-off stays perfectly
 * reversible.
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
        <ConceptScene />
      </div>
      <div ref={veilRef} className="ez-veil" aria-hidden="true">
        <div className="ez-veil-layer ez-veil-a" />
        <div className="ez-veil-layer ez-veil-b" />
        <div className="ez-veil-layer ez-veil-c" />
      </div>
    </>
  );
}

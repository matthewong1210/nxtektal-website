// Shared scroll-progress state and camera-path math for the earth sequence.
// Everything in the sequence is a pure function of `progress` (0–1), which is
// what makes scrolling fully reversible: scrolling up simply samples the same
// path backwards.

export const earthState = {
  progress: 0,
  active: true,
  mobile: false,
  aspect: 1.6,
};

export type ChapterDef = {
  id: string;
  start: number;
  end: number;
};

export const CHAPTERS: ChapterDef[] = [
  { id: "top", start: 0, end: 0.18 },
  { id: "thesis", start: 0.18, end: 0.36 },
  { id: "observation", start: 0.36, end: 0.52 },
  { id: "starting-point", start: 0.52, end: 0.76 },
  { id: "vision", start: 0.76, end: 1 },
];

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Hermite smoothstep between edges a and b. */
export const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

const easeInOut = (t: number) => t * t * (3 - 2 * t);
const easeIn = (t: number) => t * t;

/** Piecewise camera distance from the earth centre (earth radius = 1). */
export function cameraZ(p: number): number {
  if (p <= 0.36) return lerp(4.8, 2.55, easeInOut(clamp01(p / 0.36)));
  if (p <= 0.52) return lerp(2.55, 1.72, easeInOut((p - 0.36) / 0.16));
  if (p <= 0.72) return lerp(1.72, 1.045, easeIn((p - 0.52) / 0.2));
  return 1.045;
}

/** Earth drifts from right-of-frame to centre during the first third. */
export function earthOffsetX(p: number, aspect: number): number {
  const start = 1.35 * Math.min(1, aspect / 1.65);
  return lerp(start, 0, smoothstep(0, 0.34, p));
}

/** Progress-driven rotation that brings North America toward the camera. */
export function earthRotationY(p: number): number {
  return -1.35 + smoothstep(0.05, 0.62, p) * 1.55;
}

/** Atmosphere rim intensity grows as we approach orbit. */
export function atmosphereStrength(p: number): number {
  return 0.75 + smoothstep(0.15, 0.55, p) * 0.9;
}

/** Exposure lifts as the camera dives into the cloud deck. */
export function exposure(p: number): number {
  return 1.0 + smoothstep(0.52, 0.68, p) * 0.9;
}

/** Cloud layer opacity thickens slightly during the dive. */
export function cloudOpacity(p: number): number {
  return 0.85 + smoothstep(0.5, 0.68, p) * 0.15;
}

/** DOM opacity for the WebGL canvas (fades out inside the cloud veil). */
export function canvasOpacity(p: number): number {
  return 1 - smoothstep(0.66, 0.73, p);
}

/** DOM opacity for the cloud veil that hides the scene crossfade. */
export function veilOpacity(p: number): number {
  return smoothstep(0.58, 0.665, p) * (1 - smoothstep(0.71, 0.8, p));
}

/** DOM opacity for the ground (golf range) scene. */
export function groundOpacity(p: number): number {
  return smoothstep(0.675, 0.75, p);
}

/**
 * Text chapter opacity: fades in at the start of its range and out at the
 * end. The first chapter starts visible; the last stays visible to the end.
 */
export function chapterOpacity(
  p: number,
  c: ChapterDef,
  isFirst: boolean,
  isLast: boolean
): number {
  const span = c.end - c.start;
  const fadeLen = Math.min(0.045, span * 0.3);
  const fadeIn = isFirst ? 1 : smoothstep(c.start, c.start + fadeLen, p);
  const fadeOut = isLast ? 1 : 1 - smoothstep(c.end - fadeLen, c.end, p);
  return fadeIn * fadeOut;
}

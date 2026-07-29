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
  { id: "top", start: 0, end: 0.24 },
  { id: "validation", start: 0.24, end: 0.46 },
  { id: "ambition", start: 0.46, end: 0.66 },
];

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Hermite smoothstep between edges a and b. */
export const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/** DOM opacity for the footage layer (fades out inside the cloud veil). */
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

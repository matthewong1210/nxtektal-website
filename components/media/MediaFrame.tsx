import type { ReactNode } from "react";

/**
 * Phase 2 stable media container (see PHASE_2_VISUAL_ASSET_PLAN.md).
 *
 * Every homepage visual slot renders through this frame so final Phase 2
 * assets (WebP/AVIF stills, WebM/MP4 loops, inline SVG diagrams) can drop in
 * without changing page structure. Captions are rendered as HTML below the
 * media — never baked into the images themselves.
 */

export const CAPTIONS = {
  devViz: "Product development visualization",
  engConcept: "Engineering concept visualization",
  illustrative: "Illustrative product concept — not live facility data",
  direction: "Platform direction",
} as const;

type MediaFrameProps = {
  caption: string;
  /** CSS aspect-ratio for the media stage, e.g. "16 / 9". Omit for auto-height content such as diagrams. */
  aspect?: string;
  /** Matches the section theme; affects frame border/background. */
  tone?: "dark" | "light";
  /** Remove the frame chrome when the child brings its own (e.g. an app-shell mock). */
  bare?: boolean;
  className?: string;
  children: ReactNode;
};

export default function MediaFrame({
  caption,
  aspect,
  tone = "dark",
  bare = false,
  className,
  children,
}: MediaFrameProps) {
  const classes = ["media-frame", `media-frame--${tone}`, bare ? "media-frame--bare" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
  return (
    <figure className={classes}>
      <div className="media-frame-stage" style={aspect ? { aspectRatio: aspect } : undefined}>
        {children}
      </div>
      <figcaption className="media-caption">{caption}</figcaption>
    </figure>
  );
}

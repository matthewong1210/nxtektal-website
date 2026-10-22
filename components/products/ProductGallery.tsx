"use client";

import { useCallback, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { IMAGE_PENDING_TEXT, type ProductImage } from "../../lib/products/types";

export type GalleryImage = ProductImage & {
  /** False until the file is present in public/products/<model>/. */
  available: boolean;
};

/**
 * Contain-fit product shots are never shown wider than their source: a
 * low-resolution file (the ME74A front and raised-angle views are 617 and
 * 690 px wide) sits centred at its natural size instead of being blown up.
 */
function naturalCap(image: ProductImage): CSSProperties | undefined {
  return image.fit === "contain" ? ({ "--pd-natural": `${image.width}px` } as CSSProperties) : undefined;
}

/**
 * An image, or the neutral pending panel when the file is not there yet.
 * Both sit inside a `.pd-stage`, which sets the box (the hero stage takes the
 * supplied file's aspect ratio from the data; gallery and card stages are
 * 16:10), so the panel simply fills the stage.
 */
export function ProductPicture({ image, priority = false }: { image: GalleryImage; priority?: boolean }) {
  if (!image.available) {
    // A <span>, so the panel is valid inside the gallery's <button> as well as in a <figure>.
    return (
      <span className="pd-pending" role="img" aria-label={`${image.label}: ${IMAGE_PENDING_TEXT.toLowerCase()}`}>
        <span>{IMAGE_PENDING_TEXT}</span>
      </span>
    );
  }
  return (
    <img
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`pd-img pd-img--${image.fit}`}
      style={naturalCap(image)}
    />
  );
}

/**
 * Product gallery: one main image, thumbnails that switch it, and a native
 * <dialog> lightbox for full-size viewing. Everything is a button or a
 * dialog, so keyboard users get the same path: Tab to a thumbnail, Enter to
 * switch, Enter on the main image to open, arrows to move, Escape to close.
 * Focus returns to the opener when the dialog closes (native behaviour).
 */
export default function ProductGallery({ images, aspect = "16 / 10" }: { images: GalleryImage[]; aspect?: string }) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const current = images[index];

  const open = useCallback(() => {
    const d = dialogRef.current;
    if (d && !d.open) d.showModal();
  }, []);
  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback((delta: number) => setIndex((i) => (i + delta + images.length) % images.length), [images.length]);

  const onDialogKey = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
  };

  return (
    <div className="pd-gallery">
      <figure className="pd-gallery-main">
        <button type="button" className="pd-gallery-open pd-stage" style={{ aspectRatio: aspect }} onClick={open} aria-label={`${current.alt} — open at full size`} disabled={!current.available}>
          <ProductPicture image={current} />
        </button>
        <figcaption>{current.caption}</figcaption>
      </figure>

      <ul className="pd-thumbs" aria-label="Choose an image">
        {images.map((image, i) => (
          <li key={image.key}>
            <button type="button" className="pd-thumb" aria-pressed={i === index} onClick={() => setIndex(i)}>
              {image.available ? (
                <img src={image.src} width={image.width} height={image.height} alt="" loading="lazy" decoding="async" className={`pd-img pd-img--${image.fit}`} style={{ aspectRatio: aspect }} />
              ) : (
                <span className="pd-pending pd-pending--thumb" aria-hidden="true" style={{ aspectRatio: aspect }} />
              )}
              <span>{image.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dialogRef} className="pd-lightbox" aria-label={`${current.label} — full size`} onKeyDown={onDialogKey} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="pd-lightbox-inner">
          <div className="pd-lightbox-stage">
            {current.available ? (
              <img src={current.src} width={current.width} height={current.height} alt={current.alt} className={`pd-img pd-img--${current.fit}`} style={naturalCap(current)} />
            ) : (
              <span className="pd-pending" role="img" aria-label={IMAGE_PENDING_TEXT}><span>{IMAGE_PENDING_TEXT}</span></span>
            )}
          </div>
          <p className="pd-lightbox-caption">{current.caption}</p>
          <div className="pd-lightbox-controls">
            {images.length > 1 && (
              <>
                <button type="button" className="button button-secondary" onClick={() => step(-1)} aria-label="Previous image">← Previous</button>
                <button type="button" className="button button-secondary" onClick={() => step(1)} aria-label="Next image">Next →</button>
              </>
            )}
            <button type="button" className="button button-primary" onClick={close}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

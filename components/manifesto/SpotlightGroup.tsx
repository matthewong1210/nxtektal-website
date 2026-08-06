"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

/**
 * Sets --spot-x / --spot-y on the hovered card so the CSS-only spotlight
 * (see .why-card::before) can follow the cursor. Pure enhancement: mouse
 * events only, so touch devices never pay for it, and the cards render
 * fully polished without it (reduced-motion removes the layer in CSS).
 */
export default function SpotlightGroup({
  className,
  selector = ".why-card",
  children,
}: {
  className?: string;
  selector?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = (event.target as HTMLElement).closest(selector);
    if (!(card instanceof HTMLElement) || !ref.current?.contains(card)) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} className={className} onMouseMove={onMouseMove}>
      {children}
    </div>
  );
}

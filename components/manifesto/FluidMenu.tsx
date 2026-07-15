"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

export type FluidMenuItem = { label: string; href: string };

/**
 * Fluid expanding navigation menu, adapted from 21st.dev
 * `deepaksslibra/fluid-menu` (MenuContainer/MenuItem, data-expanded CSS
 * transitions). Rebuilt on this repo's plain-CSS design tokens — no
 * Tailwind, no icon library — with text-label pills instead of icon-only
 * circles so the five section links stay legible. Rendered only at the
 * breakpoint where the desktop nav is hidden.
 */
export default function FluidMenu({ items }: { items: FluidMenuItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const close = useCallback(() => setExpanded(false), []);

  useEffect(() => {
    if (!expanded) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded, close]);

  return (
    <div ref={rootRef} className="fluid-menu" data-expanded={expanded}>
      <button
        type="button"
        className="fluid-menu-toggle"
        aria-expanded={expanded}
        aria-controls={listId}
        aria-label={expanded ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setExpanded((open) => !open)}
      >
        <span className="fluid-menu-icon" aria-hidden="true">
          <svg className="fluid-icon-open" viewBox="0 0 24 24">
            <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <svg className="fluid-icon-close" viewBox="0 0 24 24">
            <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <ul id={listId} className="fluid-menu-items" inert={!expanded || undefined}>
        {items.map((item, index) => (
          <li
            key={item.href}
            className="fluid-menu-item"
            style={{ transitionDelay: expanded ? `${index * 45}ms` : `${(items.length - 1 - index) * 30}ms` }}
          >
            <a href={item.href} onClick={close} tabIndex={expanded ? 0 : -1}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

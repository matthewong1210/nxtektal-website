"use client";

import { useEffect, useState, type ReactNode } from "react";
import FluidMenu, { type FluidMenuItem } from "./FluidMenu";

/**
 * The floating navigation shell, unchanged in structure, plus two
 * client-side refinements: a slightly compacted state once the page is
 * scrolled, and a restrained active-section indicator driven by an
 * IntersectionObserver over the existing anchor targets. Without JS the
 * header renders exactly as before (expanded, no active state).
 */
export default function SiteHeader({
  items,
  brand,
  ctaIcon,
}: {
  items: FluidMenuItem[];
  brand: ReactNode;
  ctaIcon: ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        // Hysteresis: enter compact past 48px, leave below 16px — the state
        // can never flicker while hovering around one threshold.
        const y = window.scrollY;
        setScrolled((prev) => (prev ? y > 16 : y > 48));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      // A narrow band in the upper-middle of the viewport: exactly one
      // section owns it at a time, so boundaries don't flicker.
      { rootMargin: "-35% 0px -55% 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <header className={scrolled ? "site-header site-header--scrolled" : "site-header"}>
      <div className="header-shell">
        <a className="brand" href="#top" aria-label="NXTektal Systems home">
          {brand}
        </a>
        <nav aria-label="Primary navigation">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-end">
          <a className="header-cta" href="#pilot">
            Become a Pilot {ctaIcon}
          </a>
          <FluidMenu items={items} />
        </div>
      </div>
    </header>
  );
}

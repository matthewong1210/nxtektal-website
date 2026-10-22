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
  homeHref = "#top",
  ctaHref = "#pilot",
  currentHref,
}: {
  items: FluidMenuItem[];
  brand: ReactNode;
  ctaIcon: ReactNode;
  /** Brand link target: "#top" on the homepage, "/" on secondary pages. */
  homeHref?: string;
  /** Header CTA target: "#pilot" on the homepage, "/#pilot" on secondary pages. */
  ctaHref?: string;
  /** On a secondary page, the nav item that is the current page (aria-current="page"). */
  currentHref?: string;
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
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;
    // Track every section currently inside the band so the indicator clears
    // when none is (hero, footer, blocks without a nav id) instead of
    // sticking to the last section that scrolled past.
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) visible.add(href);
          else visible.delete(href);
        }
        setActive(items.map((item) => item.href).find((href) => visible.has(href)) ?? null);
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
        <a className="brand" href={homeHref} aria-label="NXTektal Systems home">
          {brand}
        </a>
        <nav aria-label="Primary navigation">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "true" : currentHref === item.href ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-end">
          <a className="header-cta" href={ctaHref}>
            Become a Pilot {ctaIcon}
          </a>
          <FluidMenu items={items} />
        </div>
      </div>
    </header>
  );
}

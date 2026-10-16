import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import BrandLockup from "../../../components/BrandLockup";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/manifesto/SiteHeader";
import ProductGallery, { ProductPicture, type GalleryImage } from "../../../components/products/ProductGallery";
import SpecTable from "../../../components/products/SpecTable";
import {
  CE82A,
  CE82A_ROUTE,
  CONTACT,
  FEATURES,
  FEATURES_INTRO,
  FEATURES_NOTE,
  HERO_STATS,
  IMAGES,
  SECTIONS,
  SPEC_GROUPS,
  SPEC_NOTE,
} from "../../../lib/products/ce82a";

export const metadata: Metadata = {
  title: `${CE82A.name} | ${CE82A.brand} hardware | NXTektal Systems`,
  description: CE82A.summary,
  alternates: { canonical: CE82A_ROUTE },
};

/* The homepage sections, reached from this page with absolute anchors, plus this page. */
const navItems = [
  { label: "The Work", href: "/#work" },
  { label: "First Job", href: "/#first-workflow" },
  { label: "Products", href: CE82A_ROUTE },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Why Golf", href: "/#why-golf" },
  { label: "Progress", href: "/#progress" },
  { label: "Company", href: "/#company" },
];

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="icon-arrow">
    <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** The manufacturer's files are copied into public/products/ce82a/; until then the page shows a neutral pending panel. */
function withAvailability(): GalleryImage[] {
  return IMAGES.map((image) => ({
    ...image,
    available: fs.existsSync(path.join(process.cwd(), "public", image.src)),
  }));
}

export default function Ce82aPage() {
  const images = withAvailability();
  const white = images.find((i) => i.key === "white") ?? images[0];

  return (
    <main className="pd-main" id="top">
      <SiteHeader items={navItems} brand={<BrandLockup />} ctaIcon={<Arrow />} homeHref="/" ctaHref="/#pilot" currentHref={CE82A_ROUTE} />

      {/* A · Overview: copy and the full product photograph side by side */}
      <section className="pd-section pd-hero" id="overview" aria-labelledby="pd-h1">
        <div className="pd-inner pd-hero-grid">
          <div className="pd-hero-copy">
            <p className="eyebrow">Products · {CE82A.brand} {CE82A.model}</p>
            <h1 id="pd-h1">{CE82A.name}</h1>
            <p className="pd-lede">{CE82A.summary}</p>
            <dl className="pd-stats" aria-label="Key figures">
              {HERO_STATS.map((stat) => (
                <div className="pd-stat" key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>
                    <span className="pd-stat-value">{stat.value}</span>
                    {stat.unit && <span className="pd-stat-unit">{stat.unit}</span>}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="pd-actions">
              <a className="button button-primary" href="#specs">See full specifications <Arrow /></a>
              <a className="button button-secondary" href={CONTACT.mailto}>{CONTACT.cta}</a>
            </div>
            <p className="pd-status">{CE82A.relationship}</p>
          </div>
          <figure className="pd-figure pd-figure--hero">
            <div className="pd-figure-stage">
              <ProductPicture image={white} sizes="(max-width: 760px) 100vw, 56vw" priority />
            </div>
            <figcaption>{white.caption}</figcaption>
          </figure>
        </div>
      </section>

      <nav className="pd-subnav" aria-label="On this page">
        <div className="pd-inner">
          <ul>
            {SECTIONS.map((s) => (
              <li key={s.id}><a href={`#${s.id}`}>{s.label}</a></li>
            ))}
          </ul>
        </div>
      </nav>

      {/* B · Features, as the manufacturer describes them */}
      <section className="pd-section" id="features" aria-labelledby="pd-h2-features">
        <div className="pd-inner">
          <p className="eyebrow">Features · manufacturer description</p>
          <h2 id="pd-h2-features">{FEATURES_INTRO}</h2>
          <dl className="pd-features">
            {FEATURES.map((feature) => (
              <div className="pd-feature" key={feature.title}>
                <dt>{feature.title}</dt>
                <dd>{feature.body}</dd>
              </div>
            ))}
          </dl>
          <p className="pd-note">{FEATURES_NOTE}</p>
        </div>
      </section>

      {/* C · Images: the product on white, and the manufacturer's course scene */}
      <section className="pd-section pd-section--tint" id="gallery" aria-labelledby="pd-h2-gallery">
        <div className="pd-inner">
          <p className="eyebrow">Images</p>
          <h2 id="pd-h2-gallery">The machine on white, and in the setting it works in.</h2>
          <ProductGallery images={images} />
        </div>
      </section>

      {/* D · Full specifications */}
      <section className="pd-section" id="specs" aria-labelledby="pd-h2-specs">
        <div className="pd-inner">
          <p className="eyebrow">Specifications</p>
          <h2 id="pd-h2-specs">Full technical specifications.</h2>
          <p className="pd-note pd-note--lead">{SPEC_NOTE}</p>
          <SpecTable groups={SPEC_GROUPS} />
        </div>
      </section>

      {/* E · Contact */}
      <section className="pd-section pd-contact" id="contact" aria-labelledby="pd-h2-contact">
        <div className="pd-inner pd-contact-grid">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="pd-h2-contact">{CONTACT.heading}</h2>
            <p className="pd-lede">{CONTACT.body}</p>
          </div>
          <div className="pd-contact-actions">
            <a className="button button-primary" href={CONTACT.mailto}>{CONTACT.cta} <Arrow /></a>
            <p className="pd-contact-email">or write to <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
            <a className="pd-textlink" href={CONTACT.secondaryHref}>{CONTACT.secondaryLabel} →</a>
          </div>
        </div>
      </section>

      <SiteFooter homeHref="/" />
    </main>
  );
}

import fs from "node:fs";
import path from "node:path";
import BrandLockup from "../BrandLockup";
import SiteFooter from "../SiteFooter";
import SiteHeader from "../manifesto/SiteHeader";
import ProductGallery, { ProductPicture, type GalleryImage } from "./ProductGallery";
import SpecTable from "./SpecTable";
import { CONTACT_LABEL, NAV_ITEMS } from "../../lib/homepage";
import { PRODUCTS_PAGE, PRODUCTS_ROUTE, relatedProducts } from "../../lib/products";
import type { ProductData } from "../../lib/products/types";

/* The same navigation as the homepage; its section anchors become absolute from a product page. */
export const productNavItems = NAV_ITEMS.map((item) => (item.href.startsWith("#") ? { ...item, href: `/${item.href}` } : item));

export const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="icon-arrow">
    <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Image files live in public/products/<model>/; until a file is present the page shows a neutral pending panel. */
export function withAvailability(product: ProductData): GalleryImage[] {
  return product.images.map((image) => ({
    ...image,
    available: fs.existsSync(path.join(process.cwd(), "public", image.src)),
  }));
}

/** A small card for another product: used by the related block and the products list. */
export function ProductCard({ product, image, heading: Heading = "h3" }: { product: ProductData; image: GalleryImage; heading?: "h2" | "h3" }) {
  return (
    <article className="pd-card">
      {/* The figure link duplicates the title link, so it is hidden from the tab order and the accessibility tree. */}
      <a className="pd-card-figure" href={product.route} tabIndex={-1} aria-hidden="true">
        <div className="pd-stage" style={{ aspectRatio: "16 / 10" }}>
          <ProductPicture image={image} />
        </div>
      </a>
      <div className="pd-card-body">
        <Heading><a href={product.route}>{product.name}</a></Heading>
        <p className="pd-card-job">{product.model} · {product.job}</p>
        <p className="pd-card-summary">{product.summary}</p>
        <a className="pd-textlink" href={product.route}>See the {product.model} →</a>
      </div>
    </article>
  );
}

/**
 * One template for every product detail page: A overview (copy beside the
 * full product image), B features as described in the product literature,
 * C gallery, D grouped specifications, E the other products and the contact
 * entry. All copy comes from the product's data module.
 */
export default function ProductPage({ product }: { product: ProductData }) {
  const images = withAvailability(product);
  const hero = images.find((i) => i.key === product.heroImageKey) ?? images[0];
  const related = relatedProducts(product).map((p) => ({ product: p, image: withAvailability(p).find((i) => i.key === p.heroImageKey) ?? withAvailability(p)[0] }));
  const { contact } = product;

  return (
    <main className="pd-main" id="top">
      <SiteHeader items={productNavItems} brand={<BrandLockup />} ctaIcon={<Arrow />} homeHref="/" ctaHref="#contact" ctaLabel={CONTACT_LABEL} currentHref={PRODUCTS_ROUTE} />

      {/* A · Overview: copy and the full product image side by side (functions and figures only — no maker or relationship copy) */}
      <section className="pd-section pd-hero" id="overview" aria-labelledby="pd-h1">
        <div className="pd-inner pd-hero-grid">
          <div className="pd-hero-copy">
            <p className="eyebrow pd-crumbs"><a href={PRODUCTS_ROUTE}>Products</a> · {product.model} · {product.job}</p>
            <h1 id="pd-h1">{product.name}</h1>
            <p className="pd-lede">{product.summary}</p>
            <dl className="pd-stats" aria-label="Key figures">
              {product.heroStats.map((stat) => (
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
              <a className="button button-secondary" href={contact.mailto}>{contact.cta}</a>
            </div>
          </div>
          <figure className="pd-figure pd-figure--hero">
            <div className="pd-figure-stage pd-stage" style={{ aspectRatio: `${hero.width} / ${hero.height}` }}>
              <ProductPicture image={hero} priority />
            </div>
            <figcaption>{hero.caption}</figcaption>
          </figure>
        </div>
      </section>

      <nav className="pd-subnav" aria-label="On this page">
        <div className="pd-inner">
          <ul>
            {product.sections.map((s) => (
              <li key={s.id}><a href={`#${s.id}`}>{s.label}</a></li>
            ))}
          </ul>
        </div>
      </nav>

      {/* B · Features */}
      <section className="pd-section" id="features" aria-labelledby="pd-h2-features">
        <div className="pd-inner">
          <p className="eyebrow">Features</p>
          <h2 id="pd-h2-features">{product.featuresIntro}</h2>
          <dl className="pd-features">
            {product.features.map((feature) => (
              <div className="pd-feature" key={feature.title}>
                <dt>{feature.title}</dt>
                <dd>{feature.body}</dd>
              </div>
            ))}
          </dl>
          <p className="pd-note">{product.featuresNote}</p>
        </div>
      </section>

      {/* C · Images */}
      <section className="pd-section pd-section--tint" id="gallery" aria-labelledby="pd-h2-gallery">
        <div className="pd-inner">
          <p className="eyebrow">Images</p>
          <h2 id="pd-h2-gallery">{product.galleryHeading}</h2>
          <ProductGallery images={images} aspect={product.galleryAspect} />
          {product.galleryNote && <p className="pd-note">{product.galleryNote}</p>}
        </div>
      </section>

      {/* D · Full specifications */}
      <section className="pd-section" id="specs" aria-labelledby="pd-h2-specs">
        <div className="pd-inner">
          <p className="eyebrow">Specifications</p>
          <h2 id="pd-h2-specs">Technical specifications.</h2>
          <p className="pd-note pd-note--lead">{product.specNote}</p>
          <SpecTable groups={product.specGroups} />
        </div>
      </section>

      {/* E · The other products, then the contact entry */}
      {related.length > 0 && (
        <section className="pd-section pd-related" id="related" aria-labelledby="pd-h2-related">
          <div className="pd-inner">
            <p className="eyebrow">{PRODUCTS_PAGE.relatedEyebrow}</p>
            <h2 id="pd-h2-related">The other machine, for a different job.</h2>
            <div className="pd-cards pd-cards--related">
              {related.map(({ product: other, image }) => (
                <ProductCard product={other} image={image} key={other.route} />
              ))}
            </div>
            <p className="pd-note"><a className="pd-textlink" href={PRODUCTS_ROUTE}>{PRODUCTS_PAGE.allLabel} →</a></p>
          </div>
        </section>
      )}

      <section className="pd-section pd-contact" id="contact" aria-labelledby="pd-h2-contact">
        <div className="pd-inner pd-contact-grid">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="pd-h2-contact">{contact.heading}</h2>
            <p className="pd-lede">{contact.body}</p>
          </div>
          <div className="pd-contact-actions">
            <a className="button button-primary" href={contact.mailto}>{contact.cta} <Arrow /></a>
            <p className="pd-contact-email">or write to <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
            <a className="pd-textlink" href={contact.secondaryHref}>{contact.secondaryLabel} →</a>
          </div>
        </div>
      </section>

      <SiteFooter homeHref="/" />
    </main>
  );
}

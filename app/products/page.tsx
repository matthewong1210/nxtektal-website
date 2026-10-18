import type { Metadata } from "next";
import BrandLockup from "../../components/BrandLockup";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/manifesto/SiteHeader";
import { Arrow, ProductCard, productNavItems, withAvailability } from "../../components/products/ProductPage";
import { PRODUCTS, PRODUCTS_PAGE, PRODUCTS_ROUTE } from "../../lib/products";

export const metadata: Metadata = {
  title: `${PRODUCTS_PAGE.title} | NXTektal Systems`,
  description: PRODUCTS_PAGE.intro,
  alternates: { canonical: PRODUCTS_ROUTE },
};

/** The products list: one card per model, by job, each linking to its detail page. */
export default function ProductsPage() {
  return (
    <main className="pd-main" id="top">
      <SiteHeader items={productNavItems} brand={<BrandLockup />} ctaIcon={<Arrow />} homeHref="/" ctaHref="/#pilot" currentHref={PRODUCTS_ROUTE} />

      <section className="pd-section pd-hero pd-list" aria-labelledby="pd-h1">
        <div className="pd-inner">
          <p className="eyebrow">{PRODUCTS_PAGE.eyebrow}</p>
          <h1 id="pd-h1">{PRODUCTS_PAGE.heading}</h1>
          <p className="pd-lede">{PRODUCTS_PAGE.intro}</p>
          <div className="pd-cards">
            {PRODUCTS.map((product) => {
              const images = withAvailability(product);
              const hero = images.find((i) => i.key === product.heroImageKey) ?? images[0];
              return <ProductCard product={product} image={hero} key={product.route} />;
            })}
          </div>
          <p className="pd-note">{PRODUCTS_PAGE.note}</p>
        </div>
      </section>

      <SiteFooter homeHref="/" />
    </main>
  );
}

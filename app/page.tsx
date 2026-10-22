import BrandLockup from "../components/BrandLockup";
import SiteFooter from "../components/SiteFooter";
import FacilityFilm from "../components/manifesto/FacilityFilm";
import SiteHeader from "../components/manifesto/SiteHeader";
import { ResponsiveStill } from "../components/media/ResponsiveMedia";
import { Arrow, withAvailability } from "../components/products/ProductPage";
import { CONTACT, CONTACT_LABEL, GOLF, HERO, INSITE, NAV_ITEMS, ROBOTS, robotCards } from "../lib/homepage";
import { FOUNDERS, SITE, SITE_DESCRIPTION } from "../lib/positioning";
import { PRODUCTS_ROUTE } from "../lib/products";
import { IMAGE_PENDING_TEXT } from "../lib/products/types";
import { agentSimulatorDemo } from "../lib/visualAssets";
import Reveal from "./reveal";

/**
 * The homepage (2026-10-22 minimal layout): five blocks in one reading
 * order — the promise; the first application, with the facility film as the
 * main visual; Insite, around one system screen; the robots; and one
 * contact entry. All copy lives in lib/homepage.ts. The film and the screen
 * keep their concept/simulation labels in or under the frame, and every
 * block's height follows its content.
 */
export default function Home() {
  const robots = robotCards().map((card) => {
    const images = withAvailability(card.product);
    return { ...card, image: images.find((i) => i.key === card.product.heroImageKey) ?? images[0] };
  });
  // The registry gates the screen: with ready=false the Insite block keeps its three values and no frame.
  const screen = agentSimulatorDemo.ready ? agentSimulatorDemo : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.brand,
    url: `https://${SITE.domain}`,
    logo: `https://${SITE.domain}/brand/nxtektal-lockup.png`,
    email: SITE.email,
    description: SITE_DESCRIPTION,
    founder: FOUNDERS.map((founder) => ({
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
    })),
  };

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SiteHeader items={NAV_ITEMS} brand={<BrandLockup />} ctaIcon={<Arrow />} ctaHref="#contact" ctaLabel={CONTACT_LABEL} />

      {/* 1 · The promise — two lines and whitespace */}
      <section className="promise" aria-labelledby="promise-h1">
        <div className="promise-inner">
          <h1 id="promise-h1" className="hero-fade">{HERO.title}</h1>
          <p className="promise-sub hero-fade">{HERO.subtitle}</p>
        </div>
      </section>

      {/* 2 · Golf — the first application; the film is the main visual */}
      <section className="chapter chapter--golf" id="golf" aria-labelledby="golf-h2">
        <div className="chapter-inner">
          <Reveal>
            <p className="eyebrow">{GOLF.eyebrow}</p>
            <h2 id="golf-h2">{GOLF.heading}</h2>
            <p className="chapter-lede">{GOLF.body}</p>
          </Reveal>
          <Reveal>
            <FacilityFilm />
          </Reveal>
        </div>
      </section>

      {/* 3 · Insite — one system screen and three things it gives the people running the site */}
      <section className="chapter" id="insite" aria-labelledby="insite-h2">
        <div className="chapter-inner">
          <Reveal>
            <p className="eyebrow">{INSITE.eyebrow}</p>
            <h2 id="insite-h2">{INSITE.heading}</h2>
            <p className="chapter-lede">{INSITE.body}</p>
          </Reveal>
          <Reveal>
            <div className="insite-grid">
              {screen && (
                <figure className="screen">
                  <div className="screen-stage">
                    <span className="screen-tag">{screen.truthLabel}</span>
                    <ResponsiveStill source={{ ...screen.posterDesktop, alt: screen.alt, mobile: screen.posterMobile }} />
                  </div>
                </figure>
              )}
              <ul className="values" aria-label="What Insite gives the people running the site">
                {INSITE.values.map((value) => (
                  <li key={value.title}>
                    <h3>{value.title}</h3>
                    <p>{value.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="chapter-note">{INSITE.status}</p>
          </Reveal>
        </div>
      </section>

      {/* 4 · Robots — name, job, and a short development status; details on the product pages */}
      <section className="chapter" id="robots" aria-labelledby="robots-h2">
        <div className="chapter-inner">
          <Reveal>
            <p className="eyebrow">{ROBOTS.eyebrow}</p>
            <h2 id="robots-h2">{ROBOTS.heading}</h2>
            <p className="chapter-lede">{ROBOTS.body}</p>
          </Reveal>
          <div className="robots">
            {robots.map(({ product, image, stage, status }, index) => (
              <Reveal key={product.route} delay={index * 60}>
                <article className="robot">
                  {/* The figure link duplicates the title link, so it stays out of the tab order and the accessibility tree. */}
                  <a className="robot-figure" href={product.route} tabIndex={-1} aria-hidden="true">
                    {image.available ? (
                      <img
                        className="robot-img"
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        alt={image.alt}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="robot-pending">{IMAGE_PENDING_TEXT}</span>
                    )}
                  </a>
                  <div className="robot-body">
                    <p className="robot-stage">{stage}</p>
                    <h3><a href={product.route}>{product.name}</a></h3>
                    <p className="robot-job">{product.job}</p>
                    <p className="robot-status">{status}</p>
                    <a className="text-link" href={product.route}>See the {product.model} <Arrow /></a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="chapter-note">
              <a href={PRODUCTS_ROUTE}>{ROBOTS.allLabel} <Arrow /></a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5 · Contact — one entry */}
      <section className="chapter chapter--contact" id="contact" aria-labelledby="contact-h2">
        <div className="chapter-inner">
          <Reveal>
            <p className="eyebrow">{CONTACT_LABEL}</p>
            <h2 id="contact-h2">{CONTACT.heading}</h2>
            <p className="chapter-lede">{CONTACT.body}</p>
            <div className="contact-actions">
              <a className="button button-primary" href={CONTACT.mailto}>{CONTACT.cta} <Arrow /></a>
              <p className="contact-email">or write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

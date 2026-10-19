import type { Metadata } from "next";
import { OG_IMAGE_PATH } from "../visualAssets";
import type { ProductData } from "./types";

/**
 * Page metadata for the products routes. Next.js merges metadata per
 * top-level key, so a page that sets only `title`/`description` inherits the
 * root layout's whole `openGraph`/`twitter` blocks — the homepage title and
 * URL would then describe a product page in link previews. Each products
 * route therefore sets its own blocks here (same site card image, own title,
 * description and URL; relative URLs resolve against the root metadataBase).
 */
const SITE_NAME = "NXTektal Systems";
const OG_IMAGE = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: "NXTektal Systems — robots and the operating system behind them for outdoor work, starting with golf",
};

export function pageMetadata({ title, description, route }: { title: string; description: string; route: string }): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: route },
    openGraph: { type: "website", url: route, siteName: SITE_NAME, title: fullTitle, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE.url] },
  };
}

export function productMetadata(product: ProductData): Metadata {
  return pageMetadata({ title: product.name, description: product.summary, route: product.route });
}

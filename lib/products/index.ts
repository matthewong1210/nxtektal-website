/**
 * The product registry: every model that has a detail page, in the order the
 * products list shows them. The list page (/products) and the related-product
 * block at the bottom of each detail page read from here, so adding a model
 * means adding its module and one entry below.
 */

import { CE82A_PRODUCT } from "./ce82a";
import { ME74A_PRODUCT } from "./me74a";
import type { ProductData } from "./types";

export const PRODUCTS_ROUTE = "/products";

export const PRODUCTS: ProductData[] = [CE82A_PRODUCT, ME74A_PRODUCT];

/** The other products, for the "Also in Products" block. */
export function relatedProducts(product: ProductData): ProductData[] {
  return PRODUCTS.filter((p) => p.route !== product.route);
}

/** Copy for the /products list page. */
export const PRODUCTS_PAGE = {
  title: "Products",
  eyebrow: "Products",
  heading: "Two machines, two jobs.",
  intro:
    "The CE82A collects range balls on driving ranges; the ME74A mows fairways. Both are manufactured by YAWIN. The CE82A is developed jointly with NXTektal and is the machine NXTektal’s software is built around first; the ME74A is the mower NXTektal plans to extend to, and it is not yet integrated with NXTektal’s software.",
  note: "Each page lists the manufacturer’s figures with their boundaries. Site fit, software coverage and commercial terms are confirmed for each site during the inquiry.",
  relatedEyebrow: "Also in Products",
  allLabel: "All products",
} as const;

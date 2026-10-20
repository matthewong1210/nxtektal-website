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
    "The CE82A collects range balls on driving ranges; the ME74A mows fairways. Each page describes what the machine does and lists its specifications.",
  note: "Figures are from each product’s literature. Software integration scope, site fit and supply arrangements are confirmed with NXTektal for each site.",
  relatedEyebrow: "Also in Products",
  allLabel: "All products",
} as const;

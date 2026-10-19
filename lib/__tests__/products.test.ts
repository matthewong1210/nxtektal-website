import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { PRODUCTS, PRODUCTS_PAGE, PRODUCTS_ROUTE, relatedProducts } from "../products";
import { CE82A_PRODUCT, CE82A_ROUTE } from "../products/ce82a";
import { ME74A_PRODUCT, ME74A_ROUTE } from "../products/me74a";
import { PRODUCT_SECTIONS } from "../products/types";

/** Pixel size from a WebP header (VP8X extended, VP8 lossy or VP8L lossless), so the data modules cannot drift from the files. */
function webpSize(file: string): [number, number] {
  const b = fs.readFileSync(file);
  expect(b.toString("ascii", 0, 4)).toBe("RIFF");
  expect(b.toString("ascii", 8, 12)).toBe("WEBP");
  const chunk = b.toString("ascii", 12, 16);
  if (chunk === "VP8X") return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  if (chunk === "VP8 ") return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  if (chunk === "VP8L") { const bits = b.readUInt32LE(21); return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1]; }
  throw new Error(`unknown WebP chunk ${chunk} in ${file}`);
}

describe("product registry", () => {
  it("lists the CE82A first and the ME74A second, each on its own route and image folder", () => {
    expect(PRODUCTS_ROUTE).toBe("/products");
    expect(PRODUCTS.map((p) => p.route)).toEqual([CE82A_ROUTE, ME74A_ROUTE]);
    expect(PRODUCTS.map((p) => p.model)).toEqual(["CE82A", "ME74A"]);
    expect(PRODUCTS.map((p) => p.job)).toEqual(["Driving-range ball collection", "Fairway mowing"]);
    for (const product of PRODUCTS) {
      expect(product.route.startsWith(PRODUCTS_ROUTE + "/")).toBe(true);
      const folder = `${product.route}/`;
      for (const image of product.images) {
        expect(image.src.startsWith(folder)).toBe(true);
        const file = path.join(process.cwd(), "public", image.src);
        expect(fs.existsSync(file), `${image.src} is missing — the page would render the pending panel`).toBe(true);
        expect(webpSize(file), `${image.src} size`).toEqual([image.width, image.height]);
      }
      expect(product.images.some((i) => i.key === product.heroImageKey)).toBe(true);
      expect(new Set(product.images.map((i) => i.key)).size).toBe(product.images.length);
      expect(product.sections).toBe(PRODUCT_SECTIONS);
      expect(product.contact.email).toBe("founders@nxtektal.com");
    }
  });

  it("keeps the two products separate: the ME74A does not replace the CE82A", () => {
    expect(CE82A_PRODUCT.name).toBe("CE82A Robotic Ball Collector");
    expect(CE82A_PRODUCT.relationship).toContain("developed jointly by NXTektal and YAWIN");
    expect(ME74A_PRODUCT.relationship).not.toContain("developed jointly");
    expect(relatedProducts(CE82A_PRODUCT).map((p) => p.model)).toEqual(["ME74A"]);
    expect(relatedProducts(ME74A_PRODUCT).map((p) => p.model)).toEqual(["CE82A"]);
  });

  it("describes the list neutrally: no claimed or denied ME74A integration, deployment or orders", () => {
    const text = `${PRODUCTS_PAGE.intro} ${PRODUCTS_PAGE.note}`.toLowerCase();
    expect(text).toContain("plans to extend");
    expect(text).toContain("software integration scope, site fit and supply arrangements are confirmed with nxtektal");
    for (const banned of ["fully integrated", "not yet integrated", "not integrated", "deployed", "no deployment", "orders", "dealer", "agreement", "price", "in stock"]) expect(text).not.toContain(banned);
  });
});

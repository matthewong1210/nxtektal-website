import type { Metadata } from "next";
import ProductPage from "../../../components/products/ProductPage";
import { ME74A_PRODUCT } from "../../../lib/products/me74a";

export const metadata: Metadata = {
  title: `${ME74A_PRODUCT.name} | NXTektal Systems`,
  description: ME74A_PRODUCT.summary,
  alternates: { canonical: ME74A_PRODUCT.route },
};

export default function Me74aPage() {
  return <ProductPage product={ME74A_PRODUCT} />;
}

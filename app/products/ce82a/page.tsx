import type { Metadata } from "next";
import ProductPage from "../../../components/products/ProductPage";
import { CE82A_PRODUCT } from "../../../lib/products/ce82a";

export const metadata: Metadata = {
  title: `${CE82A_PRODUCT.name} | NXTektal Systems`,
  description: CE82A_PRODUCT.summary,
  alternates: { canonical: CE82A_PRODUCT.route },
};

export default function Ce82aPage() {
  return <ProductPage product={CE82A_PRODUCT} />;
}

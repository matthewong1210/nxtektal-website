import type { Metadata } from "next";
import ProductPage from "../../../components/products/ProductPage";
import { CE82A_PRODUCT } from "../../../lib/products/ce82a";
import { productMetadata } from "../../../lib/products/metadata";

export const metadata: Metadata = productMetadata(CE82A_PRODUCT);

export default function Ce82aPage() {
  return <ProductPage product={CE82A_PRODUCT} />;
}

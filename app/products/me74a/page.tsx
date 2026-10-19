import type { Metadata } from "next";
import ProductPage from "../../../components/products/ProductPage";
import { ME74A_PRODUCT } from "../../../lib/products/me74a";
import { productMetadata } from "../../../lib/products/metadata";

export const metadata: Metadata = productMetadata(ME74A_PRODUCT);

export default function Me74aPage() {
  return <ProductPage product={ME74A_PRODUCT} />;
}

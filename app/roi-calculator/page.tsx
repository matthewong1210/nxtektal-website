import type { Metadata } from "next";
import Link from "next/link";
import FullCalculator from "../../components/roi/FullCalculator";

export const metadata: Metadata = {
  title: "ROI Calculator | NXTektal Systems",
  description:
    "Estimate what manual ball collection costs your range today — and what NXTektal could change — from your own operating numbers.",
  alternates: { canonical: "/roi-calculator" },
};

export default function RoiCalculatorPage() {
  return (
    <main className="roi-main">
      <header className="roi-topbar">
        <Link href="/" className="roi-topbar-brand">NXTektal <small>SYSTEMS</small></Link>
        <span className="roi-topbar-note">ROI Calculator · nxt-roi-v1.0</span>
      </header>
      <FullCalculator />
    </main>
  );
}

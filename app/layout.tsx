import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { OG_IMAGE_PATH } from "../lib/visualAssets";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = "https://nxtektal.com";
const title = "NXTektal Systems | Facility Intelligence for Autonomous Golf Facilities";
const description =
  "NXTektal builds the intelligence layer that enables physical outdoor facilities to understand their environment, make operational decisions, and coordinate autonomous systems — starting with golf facilities.";
const ogImage = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: "NXTektal Systems — the intelligence layer for autonomous golf facilities",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "NXTektal Systems",
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}

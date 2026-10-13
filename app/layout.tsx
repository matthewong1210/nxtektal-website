import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE_DESCRIPTION } from "../lib/positioning";
import { OG_IMAGE_PATH } from "../lib/visualAssets";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = "https://nxtektal.com";
const title = "NXTektal Systems | Robots and the Operating System for Outdoor Work";
const description = SITE_DESCRIPTION;
const ogImage = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: "NXTektal Systems — robots and the operating system behind them for outdoor work, starting with golf",
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

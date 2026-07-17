import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = "https://nxtektal.com";
const title = "NXTektal Systems | Autonomous Outdoor Operations";
const description =
  "NXTektal Systems is building the operating system for autonomous outdoor work, starting with demand-responsive ball collection and handoff for golf ranges.";
const ogImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "NXTektal Systems — building the operating system for autonomous outdoor work",
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

import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://nxtektal.com";
const title = "NXTektal Systems | Autonomous Outdoor Operations";
const description =
  "NXTektal Systems is building the operating system for autonomous outdoor work, starting with demand-responsive ball collection and handoff for golf ranges.";

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
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

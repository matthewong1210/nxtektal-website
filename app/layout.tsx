import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://nxtektal.com";
const title = "NXTektal Systems | Outdoor Autonomy";
const description =
  "NXTektal Systems is building the autonomy operating system for managed outdoor environments, starting with golf.";

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

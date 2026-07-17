import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NXTektal Systems",
    short_name: "NXTektal",
    description:
      "NXTektal Systems is building the operating system for autonomous outdoor work, starting with demand-responsive ball collection and handoff for golf ranges.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d1117",
    theme_color: "#0d1117",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

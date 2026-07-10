import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NXTektal Systems",
    short_name: "NXTektal",
    description:
      "The autonomy operating system for managed outdoor environments, starting with golf.",
    start_url: "/",
    display: "standalone",
    background_color: "#07100b",
    theme_color: "#07100b",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

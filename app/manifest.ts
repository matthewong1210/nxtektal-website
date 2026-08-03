import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NXTektal Systems",
    short_name: "NXTektal",
    description:
      "NXTektal is building one operating layer for autonomous golf facilities, starting with closed-loop ball operations at driving ranges.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d1117",
    theme_color: "#0d1117",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

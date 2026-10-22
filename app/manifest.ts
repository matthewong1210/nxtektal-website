import type { MetadataRoute } from "next";

import { POSITIONING_SENTENCE } from "../lib/positioning";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NXTektal Systems",
    short_name: "NXTektal",
    description: POSITIONING_SENTENCE,
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

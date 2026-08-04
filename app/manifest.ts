import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Leonardo Porto",
    short_name: "Leonardo Porto",
    description: "Indumentaria masculina a medida, hecha con materiales nobles.",
    start_url: "/",
    display: "standalone",
    background_color: "#FCFCFF",
    theme_color: "#111827",
    icons: [
      {
        src: "/icon.jpg",
        sizes: "200x200",
        type: "image/jpeg",
      },
    ],
  };
}

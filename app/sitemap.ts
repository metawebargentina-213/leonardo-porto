import type { MetadataRoute } from "next";
import { catalogoInicial } from "./catalogo";

export const dynamic = "force-static";

const SITE_URL = "https://leonardo-porto.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginasFijas: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/productos`, changeFrequency: "weekly", priority: 0.9 },
  ];

  const paginasProducto: MetadataRoute.Sitemap = catalogoInicial.map((p) => ({
    url: `${SITE_URL}/productos/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...paginasFijas, ...paginasProducto];
}

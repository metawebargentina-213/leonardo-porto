import type { Metadata } from "next";
import { catalogoInicial } from "../../catalogo";
import DetalleProducto from "./DetalleProducto";

const SITE_URL = "https://leonardo-porto.pages.dev";

export function generateStaticParams() {
  return catalogoInicial.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const producto = catalogoInicial.find((p) => p.slug === slug);
  if (!producto) return { title: "Leonardo Porto" };

  const titulo = `${producto.nombre} — ${producto.categoria}`;

  return {
    title: titulo,
    description: producto.descripcion,
    alternates: {
      canonical: `/productos/${producto.slug}`,
    },
    openGraph: {
      title: titulo,
      description: producto.descripcion,
      url: `${SITE_URL}/productos/${producto.slug}`,
      images: [producto.imagen],
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: producto.descripcion,
      images: [producto.imagen],
    },
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = catalogoInicial.find((p) => p.slug === slug);

  const productoJsonLd = producto
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: producto.nombre,
        description: producto.descripcion,
        category: producto.categoria,
        image: `${SITE_URL}${producto.imagen}`,
        url: `${SITE_URL}/productos/${producto.slug}`,
        brand: { "@type": "Brand", name: "Leonardo Porto" },
        ...(producto.precio !== null
          ? {
              offers: {
                "@type": "Offer",
                priceCurrency: "ARS",
                price: producto.precio,
                availability: "https://schema.org/InStock",
                url: `${SITE_URL}/productos/${producto.slug}`,
              },
            }
          : {}),
      }
    : null;

  const breadcrumbJsonLd = producto
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Colección", item: `${SITE_URL}/productos` },
          {
            "@type": "ListItem",
            position: 2,
            name: producto.categoria,
            item: `${SITE_URL}/productos?categoria=${encodeURIComponent(producto.categoria)}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: producto.nombre,
            item: `${SITE_URL}/productos/${producto.slug}`,
          },
        ],
      }
    : null;

  return (
    <>
      {productoJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productoJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <DetalleProducto slug={slug} />
    </>
  );
}

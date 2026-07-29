import { catalogoInicial } from "../../catalogo";
import DetalleProducto from "./DetalleProducto";

export function generateStaticParams() {
  return catalogoInicial.map((p) => ({ slug: p.slug }));
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DetalleProducto slug={slug} />;
}

import type { Metadata } from "next";

const DESCRIPCION =
  "Prendas cortadas a medida, en materiales nobles, pensadas para durar más que una temporada.";

export const metadata: Metadata = {
  title: {
    default: "Colección",
    template: "%s | Leonardo Porto",
  },
  description: DESCRIPCION,
  alternates: {
    canonical: "/productos",
  },
  openGraph: {
    title: "Colección | Leonardo Porto",
    description: DESCRIPCION,
    url: "https://leonardo-porto.pages.dev/productos",
  },
};

export default function ProductosLayout({ children }: { children: React.ReactNode }) {
  return children;
}

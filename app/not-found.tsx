"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Nav } from "./Nav";
import { Footer, SHELL } from "./ui";
import DetalleProducto from "./productos/[slug]/DetalleProducto";

// El sitio se exporta como estático, así que solo existen las páginas de los
// productos presentes al compilar. Un producto creado después desde el panel cae
// acá: resolvemos su slug contra el catálogo del navegador y mostramos su ficha.
export default function NoEncontrado() {
  const [slug, setSlug] = useState<string | null>(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const partes = window.location.pathname.split("/").filter(Boolean);
    if (partes[0] === "productos" && partes[1]) {
      setSlug(decodeURIComponent(partes[1]));
    }
    setListo(true);
  }, []);

  if (slug) return <DetalleProducto slug={slug} />;

  return (
    <main className="min-h-screen bg-[var(--color-off-white)]">
      <div className="bg-[var(--color-bg-black)]">
        <Nav />
      </div>
      <div className={`${SHELL} flex flex-col items-center gap-5 py-32 text-center`}>
        <span className="font-display text-6xl font-bold text-[var(--color-accent-blue)]">404</span>
        <h1 className="font-display text-3xl font-bold text-[var(--color-bg-black)]">
          Esta página no existe
        </h1>
        <p className="max-w-[420px] text-[15px] text-[var(--color-text-muted)]">
          {listo
            ? "Puede que el enlace esté mal escrito o que la prenda ya no esté disponible."
            : "Buscando…"}
        </p>
        <Link
          href="/productos"
          className="mt-2 rounded-full bg-[var(--color-bg-black)] px-8 py-3 text-sm font-semibold text-[var(--color-off-white)]"
        >
          Ver la colección
        </Link>
      </div>
      <Footer />
    </main>
  );
}

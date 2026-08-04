"use client";

import Link from "next/link";
import { Nav } from "../Nav";
import { Footer, SHELL } from "../ui";
import { useCatalogo } from "../useCatalogo";
import { useFavoritos } from "../useFavoritos";
import { ProductoCard } from "../ProductoCard";

export default function Favoritos() {
  const { productos, cargado: catalogoCargado } = useCatalogo();
  const { ids, cargado: favoritosCargado } = useFavoritos();

  const cargado = catalogoCargado && favoritosCargado;
  const favoritos = productos.filter((p) => ids.includes(p.id));

  return (
    <main className="min-h-screen bg-[var(--color-off-white)]">
      <div className="bg-[var(--color-bg-black)]">
        <Nav />
        <div className={`${SHELL} flex flex-col items-center gap-4 pt-8 pb-16 text-center lg:pb-20`}>
          <h1 className="font-display text-4xl font-bold text-[var(--color-off-white)] lg:text-6xl">
            Favoritos
          </h1>
          <p className="max-w-[460px] text-[15px] leading-relaxed text-[var(--color-text-muted)]">
            Las prendas que fuiste guardando para más adelante.
          </p>
        </div>
      </div>

      <section className={`${SHELL} flex flex-col gap-6 py-12 lg:py-16`}>
        {!cargado ? (
          <p className="text-sm text-[var(--color-text-muted)]">Cargando…</p>
        ) : favoritos.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <p className="font-display text-2xl font-bold text-[var(--color-bg-black)]">
              Todavía no guardaste nada
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              Tocá el corazón de una prenda para guardarla acá.
            </p>
            <Link
              href="/productos"
              className="mt-2 text-sm font-semibold text-[var(--color-accent-blue)] underline underline-offset-4"
            >
              Ver la colección
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-[var(--color-text-muted)]">
              {favoritos.length} {favoritos.length === 1 ? "prenda guardada" : "prendas guardadas"}
            </p>
            <div className="grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-3 lg:gap-7">
              {favoritos.map((p) => (
                <ProductoCard key={p.id} producto={p} />
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}

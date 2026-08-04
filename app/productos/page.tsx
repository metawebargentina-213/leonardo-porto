"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Nav } from "../Nav";
import { Footer, SHELL } from "../ui";
import { CATEGORIAS } from "../catalogo";
import { useCatalogo } from "../useCatalogo";
import { ProductoCard } from "../ProductoCard";
import { Filtros } from "./Filtros";

type Orden = "destacados" | "menor" | "mayor";

export default function ProductosPage() {
  return (
    <Suspense fallback={null}>
      <Productos />
    </Suspense>
  );
}

function Productos() {
  const searchParams = useSearchParams();
  const { productos, cargado } = useCatalogo();
  const [categoria, setCategoria] = useState<string>("Todos");
  const [talle, setTalle] = useState<string>("Todos");
  const [orden, setOrden] = useState<Orden>("destacados");
  const [buscar, setBuscar] = useState<string>("");

  const categoriaUrl = searchParams.get("categoria");
  const buscarUrl = searchParams.get("buscar");

  useEffect(() => {
    if (categoriaUrl && [...CATEGORIAS].includes(categoriaUrl as (typeof CATEGORIAS)[number])) {
      setCategoria(categoriaUrl);
    }
    if (buscarUrl) setBuscar(buscarUrl);
  }, [categoriaUrl, buscarUrl]);

  const tallesDisponibles = useMemo(() => {
    const todos = productos.flatMap((p) => p.talles);
    return Array.from(new Set(todos));
  }, [productos]);

  const filtrados = useMemo(() => {
    const busquedaNormalizada = buscar.trim().toLowerCase();
    const lista = productos.filter((p) => {
      const porCategoria = categoria === "Todos" || p.categoria === categoria;
      const porTalle = talle === "Todos" || p.talles.includes(talle);
      const porBusqueda = !busquedaNormalizada || p.nombre.toLowerCase().includes(busquedaNormalizada);
      return porCategoria && porTalle && porBusqueda;
    });

    // Los productos "a consultar" (sin precio) van siempre al final al ordenar por precio.
    if (orden === "menor")
      return [...lista].sort((a, b) => {
        if (a.precio === null) return 1;
        if (b.precio === null) return -1;
        return a.precio - b.precio;
      });
    if (orden === "mayor")
      return [...lista].sort((a, b) => {
        if (a.precio === null) return 1;
        if (b.precio === null) return -1;
        return b.precio - a.precio;
      });
    return lista;
  }, [productos, categoria, talle, orden, buscar]);

  const hayFiltros = categoria !== "Todos" || talle !== "Todos" || buscar.trim() !== "";

  return (
    <main className="min-h-screen bg-[var(--color-off-white)]">
      <div className="bg-[var(--color-bg-black)]">
        <Nav />
        <div className={`${SHELL} flex flex-col items-center gap-4 pt-8 pb-16 text-center lg:pb-20`}>
          <h1 className="font-display text-4xl font-bold text-[var(--color-off-white)] lg:text-6xl">
            Colección
          </h1>
          <p className="max-w-[460px] text-[15px] leading-relaxed text-[var(--color-text-muted)]">
            Prendas cortadas a medida, en materiales nobles, pensadas para durar más
            que una temporada.
          </p>
        </div>
      </div>

      <section className={`${SHELL} flex flex-col gap-10 py-12 lg:flex-row lg:items-start lg:gap-12 lg:py-16`}>
        <Filtros
          categorias={[...CATEGORIAS]}
          categoria={categoria}
          setCategoria={setCategoria}
          talles={tallesDisponibles}
          talle={talle}
          setTalle={setTalle}
          orden={orden}
          setOrden={(v) => setOrden(v as Orden)}
          hayFiltros={hayFiltros}
          limpiar={() => {
            setCategoria("Todos");
            setTalle("Todos");
            setBuscar("");
          }}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <p className="text-sm text-[var(--color-text-muted)]">
            {buscar.trim() ? (
              <>
                {filtrados.length} {filtrados.length === 1 ? "resultado" : "resultados"} para &quot;{buscar}&quot;
              </>
            ) : (
              <>
                {filtrados.length} {filtrados.length === 1 ? "producto" : "productos"}
              </>
            )}
          </p>

          {/* Grilla */}
          {filtrados.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <p className="font-display text-2xl font-bold text-[var(--color-bg-black)]">
                No encontramos prendas con esos filtros
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Probá quitando alguno para ver más opciones.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-3 lg:gap-7">
              {filtrados.map((p) => (
                <ProductoCard key={p.id} producto={p} />
              ))}
            </div>
          )}

          {!cargado && (
            <p className="text-xs text-[var(--color-text-muted)]">Cargando catálogo…</p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

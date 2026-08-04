"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Producto, textoPrecio } from "./catalogo";
import { useCarrito } from "./useCarrito";
import { CorazonFavorito } from "./CorazonFavorito";

function BolsaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M6.5 8.5h11l1 12.5h-13z" />
      <path d="M9 8.5v-2a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function ProductoCard({ producto: p, oscuro = false }: { producto: Producto; oscuro?: boolean }) {
  const { agregar } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  function agregarRapido(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (p.precio === null || agregado) return;
    agregar({
      productoId: p.id,
      slug: p.slug,
      nombre: p.nombre,
      imagen: p.imagenes[0],
      precio: p.precio,
      talle: p.talles[0] ?? "",
      color: p.colores[0]?.nombre ?? "",
    });
    setAgregado(true);
    window.setTimeout(() => setAgregado(false), 1800);
  }

  const boton =
    "absolute z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[var(--color-bg-black)] shadow-sm backdrop-blur-sm transition-transform hover:scale-105";

  return (
    <Link
      href={`/productos/${p.slug}`}
      className={`group flex w-full flex-col gap-3 rounded-[1.5rem] p-2 transition-colors lg:gap-3.5 lg:rounded-[1.75rem] ${
        oscuro ? "bg-white/[0.05] hover:bg-white/[0.09]" : "bg-black/[0.04] hover:bg-black/[0.07]"
      }`}
    >
      <div
        className={`relative aspect-[283/340] w-full overflow-hidden rounded-[1rem] lg:rounded-[1.25rem] ${
          oscuro ? "bg-[var(--color-off-white)]" : "bg-white"
        }`}
      >
        <Image
          src={p.imagenes[0]}
          alt={p.nombre}
          fill
          sizes="(max-width: 1023px) 50vw, 300px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <CorazonFavorito productoId={p.id} className={`${boton} top-2.5 right-2.5`} />
        {p.precio !== null && (
          <button type="button" onClick={agregarRapido} aria-label="Agregar al carrito" className={`${boton} bottom-2.5 right-2.5`}>
            {agregado ? <CheckIcon className="h-4 w-4" /> : <BolsaIcon className="h-4 w-4" />}
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1 px-1 pb-1">
        <span className="text-[11px] tracking-wide text-[var(--color-text-muted)]">{p.categoria}</span>
        <p className={`text-[13px] font-semibold md:text-sm ${oscuro ? "text-[var(--color-off-white)]" : "text-[var(--color-bg-black)]"}`}>
          {p.nombre}
        </p>
        <p
          className={`text-sm font-bold md:text-[15px] ${
            p.precio === null ? "text-[var(--color-text-muted)]" : "text-[var(--color-accent-blue)]"
          }`}
        >
          {textoPrecio(p.precio)}
        </p>
        {p.colores.length > 0 && (
          <div className="flex items-center gap-1 pt-0.5">
            {p.colores.slice(0, 4).map((c) => (
              <span
                key={c.nombre}
                title={c.nombre}
                className={`h-3 w-3 rounded-full border ${oscuro ? "border-white/20" : "border-black/10"}`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {p.colores.length > 4 && (
              <span className="text-[10px] text-[var(--color-text-muted)]">+{p.colores.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

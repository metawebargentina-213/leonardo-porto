"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CarritoDrawer } from "./CarritoDrawer";
import { useCarrito } from "./useCarrito";
import { useFavoritos } from "./useFavoritos";

const navLinks = [
  { label: "Colección", href: "/productos" },
  { label: "Abrigos", href: "/productos?categoria=Abrigos" },
  { label: "Accesorios", href: "/productos?categoria=Accesorios" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [buscadorAbierto, setBuscadorAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const { cantidadTotal } = useCarrito();
  const { cantidad: cantidadFavoritos } = useFavoritos();
  const router = useRouter();

  function buscar(e: React.FormEvent) {
    e.preventDefault();
    if (!busqueda.trim()) return;
    router.push(`/productos?buscar=${encodeURIComponent(busqueda.trim())}`);
    setBuscadorAbierto(false);
    setBusqueda("");
    setOpen(false);
  }

  return (
    <div className="flex justify-center px-5 pt-6 pb-4 md:pt-8 md:pb-6">
      <nav className="flex w-full max-w-[720px] items-center justify-between gap-6 rounded-full bg-white/[0.08] py-3 pl-6 pr-4 backdrop-blur-md md:w-auto md:gap-11 md:py-4 md:pl-8 md:pr-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
            <Image src="/images/logo-lp.jpg" alt="" fill sizes="28px" className="object-cover" />
          </span>
          <span className="font-display text-base font-bold whitespace-nowrap text-[var(--color-off-white)] md:text-lg">
            Leonardo Porto
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] font-medium text-[var(--color-off-white)] transition-opacity hover:opacity-70"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="relative flex items-center gap-4 text-[var(--color-off-white)] md:gap-5">
          <button
            aria-label="Buscar"
            aria-expanded={buscadorAbierto}
            onClick={() => setBuscadorAbierto((v) => !v)}
            className="transition-opacity hover:opacity-70"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="11" cy="11" r="7.5" />
              <line x1="21" y1="21" x2="16.2" y2="16.2" />
            </svg>
          </button>

          {buscadorAbierto && (
            <form
              onSubmit={buscar}
              className="absolute top-[calc(100%+12px)] right-0 z-20 flex w-[260px] items-center gap-2 rounded-full bg-[var(--color-bg-black)] p-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/15 sm:w-[300px]"
            >
              <input
                autoFocus
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar prendas…"
                className="w-full bg-transparent px-4 py-2 text-[13px] text-[var(--color-off-white)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Buscar"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-blue)] text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="7.5" />
                  <line x1="21" y1="21" x2="16.2" y2="16.2" />
                </svg>
              </button>
            </form>
          )}
          <Link href="/favoritos" aria-label="Favoritos" className="relative transition-opacity hover:opacity-70">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.3 4.5 5.7 4c2.1-.3 4.2.8 6.3 3.3C14.1 4.8 16.2 3.7 18.3 4c3.4.5 5.2 3.8 3.7 7.2-2.5 4.7-10 9.3-10 9.3z" />
            </svg>
            {cantidadFavoritos > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-accent-blue)] px-1 text-[9px] font-bold text-white">
                {cantidadFavoritos}
              </span>
            )}
          </Link>

          <button
            aria-label="Carrito"
            onClick={() => setCarritoAbierto(true)}
            className="relative transition-opacity hover:opacity-70"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M6.5 8.5h11l1 12.5h-13z" />
              <path d="M9 8.5v-2a3 3 0 0 1 6 0v2" />
            </svg>
            {cantidadTotal > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-accent-blue)] px-1 text-[9px] font-bold text-white">
                {cantidadTotal}
              </span>
            )}
          </button>

          <button
            aria-label="Menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative h-4 w-5 md:hidden"
          >
            <span
              className={`absolute left-0 block h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                open ? "top-1/2 rotate-45" : "top-1"
              }`}
            />
            <span
              className={`absolute left-0 block h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                open ? "top-1/2 -rotate-45" : "top-[11px]"
              }`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-black/90 backdrop-blur-xl md:hidden">
          <button
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="absolute top-9 right-9 text-3xl leading-none text-[var(--color-off-white)]"
          >
            ×
          </button>
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl font-bold text-[var(--color-off-white)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      <CarritoDrawer abierto={carritoAbierto} onCerrar={() => setCarritoAbierto(false)} />
    </div>
  );
}

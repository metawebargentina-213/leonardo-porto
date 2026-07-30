"use client";

import { useState } from "react";
import Link from "next/link";
import { CarritoDrawer } from "./CarritoDrawer";
import { useCarrito } from "./useCarrito";

const navLinks = [
  { label: "Colección", href: "/productos" },
  { label: "Abrigos", href: "/productos?categoria=Abrigos" },
  { label: "Accesorios", href: "/productos?categoria=Accesorios" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const { cantidadTotal } = useCarrito();

  return (
    <div className="flex justify-center px-5 pt-6 pb-4 md:pt-8 md:pb-6">
      <nav className="flex w-full max-w-[720px] items-center justify-between gap-6 rounded-full bg-white/[0.08] py-3 pl-6 pr-4 backdrop-blur-md md:w-auto md:gap-11 md:py-4 md:pl-8 md:pr-5">
        <Link
          href="/"
          className="font-display text-base font-bold whitespace-nowrap text-[var(--color-off-white)] md:text-lg"
        >
          Leonardo Porto
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

        <div className="flex items-center gap-4 text-[var(--color-off-white)] md:gap-5">
          <button aria-label="Buscar" className="transition-opacity hover:opacity-70">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="11" cy="11" r="7.5" />
              <line x1="21" y1="21" x2="16.2" y2="16.2" />
            </svg>
          </button>
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

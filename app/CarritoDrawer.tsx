"use client";

import Image from "next/image";
import Link from "next/link";
import { formatearPrecio } from "./catalogo";
import { armarLinkWhatsappCarrito, useCarrito } from "./useCarrito";

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.05-1.32A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3 .78.8-2.92-.2-.31A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8-.22-.09-.39-.13-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2.01 0 1.18.86 2.33.98 2.49.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  );
}

export function CarritoDrawer({ abierto, onCerrar }: { abierto: boolean; onCerrar: () => void }) {
  const { items, cargado, actualizarCantidad, quitar, cantidadTotal, subtotal } = useCarrito();

  return (
    <>
      <div
        onClick={onCerrar}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          abierto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-[420px] flex-col bg-[var(--color-off-white)] transition-transform duration-300 ease-out ${
          abierto ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!abierto}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <span className="font-display text-xl font-bold text-[var(--color-bg-black)]">
            Tu carrito
          </span>
          <button
            aria-label="Cerrar carrito"
            onClick={onCerrar}
            className="flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-[var(--color-bg-black)] transition-colors hover:bg-black/5"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {!cargado ? (
            <p className="text-sm text-[var(--color-text-muted)]">Cargando…</p>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <p className="font-display text-lg font-bold text-[var(--color-bg-black)]">
                Todavía no agregaste nada
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Elegí una prenda de la colección para empezar.
              </p>
              <Link
                href="/productos"
                onClick={onCerrar}
                className="mt-2 text-sm font-semibold text-[var(--color-accent-blue)] underline underline-offset-4"
              >
                Ver colección
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-[1.25rem] bg-black/[0.03] p-2">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-[0.8rem] bg-white">
                    <Image src={item.imagen} alt={item.nombre} fill sizes="64px" className="object-cover" />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-[13px] font-semibold leading-tight text-[var(--color-bg-black)]">
                      {item.nombre}
                    </p>
                    <p className="text-[12px] text-[var(--color-text-muted)]">
                      Talle {item.talle} · {item.color}
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full bg-white px-1 py-1">
                        <button
                          onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          aria-label="Restar"
                          className="flex h-6 w-6 items-center justify-center rounded-full text-sm text-[var(--color-bg-black)] transition-colors hover:bg-black/5"
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-[13px] font-medium text-[var(--color-bg-black)]">
                          {item.cantidad}
                        </span>
                        <button
                          onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          aria-label="Sumar"
                          className="flex h-6 w-6 items-center justify-center rounded-full text-sm text-[var(--color-bg-black)] transition-colors hover:bg-black/5"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[13px] font-bold text-[var(--color-accent-blue)]">
                        {formatearPrecio(item.precio * item.cantidad)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => quitar(item.id)}
                    aria-label="Quitar"
                    className="self-start text-lg leading-none text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-bg-black)]"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-black/10 px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-muted)]">
                {cantidadTotal} {cantidadTotal === 1 ? "prenda" : "prendas"}
              </span>
              <span className="font-display text-xl font-bold text-[var(--color-bg-black)]">
                {formatearPrecio(subtotal)}
              </span>
            </div>
            <a
              href={armarLinkWhatsappCarrito(items, subtotal)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-[15px] font-bold text-white transition-transform active:scale-[0.98]"
            >
              <WhatsappIcon className="h-5 w-5" />
              Finalizar por WhatsApp
            </a>
          </div>
        )}
      </aside>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "../../Nav";
import { Footer, SHELL } from "../../ui";
import { armarLinkWhatsapp, textoPrecio, WHATSAPP_NUMERO } from "../../catalogo";
import { useCatalogo } from "../../useCatalogo";
import { useCarrito } from "../../useCarrito";
import { GuiaTalles } from "../../GuiaTalles";

function BolsaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M6.5 8.5h11l1 12.5h-13z" />
      <path d="M9 8.5v-2a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.05-1.32A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3 .78.8-2.92-.2-.31A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8-.22-.09-.39-.13-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2.01 0 1.18.86 2.33.98 2.49.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  );
}

export default function DetalleProducto({ slug }: { slug: string }) {
  const { productos, cargado } = useCatalogo();
  const producto = productos.find((p) => p.slug === slug);
  const { agregar } = useCarrito();

  const [talle, setTalle] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    if (producto) {
      setTalle(producto.talles[0] ?? "");
      setColor(producto.colores[0]?.nombre ?? "");
    }
  }, [producto]);

  if (!producto) {
    return (
      <main className="min-h-screen bg-[var(--color-off-white)]">
        <div className="bg-[var(--color-bg-black)]">
          <Nav />
        </div>
        <div className={`${SHELL} flex flex-col items-center gap-4 py-32 text-center`}>
          <p className="font-display text-3xl font-bold text-[var(--color-bg-black)]">
            {cargado ? "No encontramos esta prenda" : "Cargando…"}
          </p>
          {cargado && (
            <Link
              href="/productos"
              className="text-sm font-semibold text-[var(--color-accent-blue)] underline underline-offset-4"
            >
              Volver a la colección
            </Link>
          )}
        </div>
        <Footer />
      </main>
    );
  }

  const relacionados = productos
    .filter((p) => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[var(--color-off-white)]">
      <div className="bg-[var(--color-bg-black)]">
        <Nav />
      </div>

      <section className={`${SHELL} py-10 lg:py-16`}>
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-[13px] text-[var(--color-text-muted)]">
          <Link href="/productos" className="hover:text-[var(--color-bg-black)]">
            Colección
          </Link>
          <span>/</span>
          <span>{producto.categoria}</span>
          <span>/</span>
          <span className="text-[var(--color-bg-black)]">{producto.nombre}</span>
        </nav>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Imagen */}
          <div className="w-full rounded-[2rem] bg-black/[0.05] p-2 lg:w-[52%] lg:rounded-[2.5rem] lg:p-2.5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-white lg:rounded-[2rem]">
              <Image
                src={producto.imagen}
                alt={producto.nombre}
                fill
                sizes="(max-width: 1023px) 100vw, 700px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Datos y selectores */}
          <div className="flex w-full flex-col gap-7 lg:flex-1 lg:pt-4">
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-accent-blue)]">
                {producto.categoria.toUpperCase()}
              </span>
              <h1 className="font-display text-3xl font-bold leading-tight text-[var(--color-bg-black)] lg:text-5xl">
                {producto.nombre}
              </h1>
              <p
                className={`text-2xl font-bold lg:text-3xl ${
                  producto.precio === null
                    ? "text-[var(--color-text-muted)]"
                    : "text-[var(--color-accent-blue)]"
                }`}
              >
                {textoPrecio(producto.precio)}
              </p>
            </div>

            <p className="max-w-[520px] text-[15px] leading-relaxed text-[#4B5563]">
              {producto.descripcion}
            </p>

            {/* Talle */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-bg-black)]">
                  TALLE
                </span>
                <GuiaTalles>
                  {(abrir) => (
                    <button
                      type="button"
                      onClick={abrir}
                      className="text-[13px] text-[var(--color-text-muted)] underline underline-offset-4 transition-colors hover:text-[var(--color-bg-black)]"
                    >
                      Guía de talles
                    </button>
                  )}
                </GuiaTalles>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {producto.talles.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTalle(t)}
                    className={`min-w-[56px] rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                      talle === t
                        ? "bg-[var(--color-bg-black)] text-[var(--color-off-white)]"
                        : "border border-black/20 text-[var(--color-bg-black)] hover:border-black/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-bg-black)]">
                COLOR: <span className="text-[var(--color-text-muted)]">{color}</span>
              </span>
              <div className="flex flex-wrap gap-3">
                {producto.colores.map((c) => (
                  <button
                    key={c.nombre}
                    onClick={() => setColor(c.nombre)}
                    aria-label={c.nombre}
                    title={c.nombre}
                    className={`h-10 w-10 rounded-full border-2 transition-all ${
                      color === c.nombre
                        ? "border-[var(--color-bg-black)] ring-2 ring-[var(--color-bg-black)]/20 ring-offset-2 ring-offset-[var(--color-off-white)]"
                        : "border-black/15 hover:border-black/40"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex flex-col gap-3 sm:flex-row">
                {producto.precio !== null && (
                  <button
                    onClick={() => {
                      agregar({
                        productoId: producto.id,
                        slug: producto.slug,
                        nombre: producto.nombre,
                        imagen: producto.imagen,
                        precio: producto.precio as number,
                        talle,
                        color,
                      });
                      setAgregado(true);
                      window.setTimeout(() => setAgregado(false), 2500);
                    }}
                    className="flex w-full items-center justify-center gap-3 rounded-full bg-[var(--color-bg-black)] px-8 py-4 text-[15px] font-bold text-[var(--color-off-white)] transition-transform active:scale-[0.98] sm:w-fit"
                  >
                    <BolsaIcon className="h-5 w-5" />
                    {agregado ? "Agregado ✓" : "Agregar al carrito"}
                  </button>
                )}

                <a
                  href={armarLinkWhatsapp(producto, talle, color)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-[15px] font-bold text-white transition-transform active:scale-[0.98] sm:w-fit"
                >
                  <WhatsappIcon className="h-5 w-5" />
                  {producto.precio === null ? "Consultar precio por WhatsApp" : "Consultar"}
                </a>
              </div>
              <p className="text-[13px] text-[var(--color-text-muted)]">
                {producto.precio === null
                  ? "Esta prenda es a medida — te confirmamos el precio por WhatsApp."
                  : "Sumalo al carrito para pedir varias prendas juntas, o consultanos directo por esta."}
              </p>
              {!WHATSAPP_NUMERO && (
                <p className="rounded-xl bg-amber-100 px-4 py-3 text-[12px] text-amber-900">
                  Falta cargar el número de WhatsApp de la tienda. Se configura en{" "}
                  <code className="font-mono">app/catalogo.ts</code>, en la constante{" "}
                  <code className="font-mono">WHATSAPP_NUMERO</code>.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Relacionados */}
      {relacionados.length > 0 && (
        <section className={`${SHELL} flex flex-col gap-8 pb-20`}>
          <h2 className="font-display text-2xl font-bold text-[var(--color-bg-black)] lg:text-3xl">
            También en {producto.categoria}
          </h2>
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-7">
            {relacionados.map((p) => (
              <Link
                key={p.id}
                href={`/productos/${p.slug}`}
                className="group flex w-full flex-col gap-3 rounded-[1.5rem] bg-black/[0.04] p-2 transition-colors hover:bg-black/[0.07]"
              >
                <div className="relative aspect-[283/340] w-full overflow-hidden rounded-[1rem] bg-white">
                  <Image
                    src={p.imagen}
                    alt={p.nombre}
                    fill
                    sizes="(max-width: 1023px) 50vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col gap-1 px-1 pb-1">
                  <p className="text-[13px] font-semibold text-[var(--color-bg-black)]">
                    {p.nombre}
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      p.precio === null ? "text-[var(--color-text-muted)]" : "text-[var(--color-accent-blue)]"
                    }`}
                  >
                    {textoPrecio(p.precio)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

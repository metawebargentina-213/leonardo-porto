"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIAS, Producto, generarSlug, textoPrecio } from "../catalogo";
import { useCatalogo } from "../useCatalogo";
import { useAdminAuth } from "./useAdminAuth";
import { Login } from "./Login";
import { CambiarPassword } from "./CambiarPassword";

const IMAGENES = [
  "/images/D2Y3h.jpeg",
  "/images/xczFv.jpeg",
  "/images/0fffc.jpeg",
  "/images/4DRhU.jpeg",
  "/images/HUiet.jpeg",
  "/images/WWwDa.jpeg",
  "/images/aVVsm.jpeg",
  "/images/pZwEh.jpeg",
  "/images/43JBA.jpeg",
];

const vacio = {
  nombre: "",
  tipoPrecio: "fijo" as "fijo" | "consultar",
  precio: "",
  categoria: CATEGORIAS[0] as string,
  imagenes: [] as string[],
  descripcion: "",
  talles: "",
  colores: "",
  imagenPorColor: {} as Record<string, string>,
};

type Formulario = typeof vacio;

function parsearColores(texto: string): { nombre: string; hex: string }[] {
  return texto
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean)
    .map((par) => {
      const [nombre, hex] = par.split(":").map((x) => x.trim());
      return { nombre: nombre || "Color", hex: hex || "#CCCCCC" };
    });
}

function productoAFormulario(p: Producto): Formulario {
  const imagenPorColor: Record<string, string> = {};
  p.colores.forEach((c) => {
    if (c.imagen) imagenPorColor[c.nombre] = c.imagen;
  });

  return {
    nombre: p.nombre,
    tipoPrecio: p.precio === null ? "consultar" : "fijo",
    precio: p.precio === null ? "" : String(p.precio),
    categoria: p.categoria,
    imagenes: p.imagenes,
    descripcion: p.descripcion,
    talles: p.talles.join(", "),
    colores: p.colores.map((c) => `${c.nombre}:${c.hex}`).join(", "),
    imagenPorColor,
  };
}

export default function Admin() {
  const { session, cargado: authCargado, entrar, salir } = useAdminAuth();
  const { productos, cargado, crear, actualizar, eliminar, restaurar } = useCatalogo();
  const [form, setForm] = useState<Formulario>(vacio);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");

  const editando = editandoId !== null;

  if (!authCargado) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F4F4F2]">
        <p className="text-sm text-[var(--color-text-muted)]">Cargando…</p>
      </main>
    );
  }

  if (!session) {
    return <Login onEntrar={entrar} />;
  }

  function limpiar() {
    setForm(vacio);
    setEditandoId(null);
    setError("");
  }

  function mostrarAviso(texto: string) {
    setAviso(texto);
    window.setTimeout(() => setAviso(""), 3000);
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.nombre.trim()) return setError("Poné un nombre para la prenda.");

    let precio: number | null = null;
    if (form.tipoPrecio === "fijo") {
      precio = Number(form.precio);
      if (!Number.isFinite(precio) || precio <= 0)
        return setError("El precio tiene que ser un número mayor a cero.");
    }

    const talles = form.talles
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (talles.length === 0) return setError("Cargá al menos un talle.");

    const colores = parsearColores(form.colores).map((c) => ({
      ...c,
      imagen: form.imagenPorColor[c.nombre],
    }));
    if (colores.length === 0)
      return setError("Cargá al menos un color, con el formato Nombre:#HEX.");

    if (form.imagenes.length === 0) return setError("Elegí al menos una foto.");

    const producto: Producto = {
      id: editandoId ?? `p-${Date.now()}`,
      slug: generarSlug(form.nombre),
      nombre: form.nombre.trim(),
      precio,
      categoria: form.categoria,
      imagenes: form.imagenes,
      descripcion: form.descripcion.trim(),
      talles,
      colores,
    };

    const ok = editando ? await actualizar(producto) : await crear(producto);
    if (!ok) {
      setError("No se pudo guardar. Probá cerrar sesión y volver a entrar.");
      return;
    }
    mostrarAviso(editando ? "Producto actualizado" : "Producto agregado");
    limpiar();
  }

  function toggleImagen(img: string) {
    setForm((f) => ({
      ...f,
      imagenes: f.imagenes.includes(img)
        ? f.imagenes.filter((i) => i !== img)
        : [...f.imagenes, img],
    }));
  }

  function toggleImagenColor(nombreColor: string, img: string) {
    setForm((f) => {
      const actual = { ...f.imagenPorColor };
      if (actual[nombreColor] === img) delete actual[nombreColor];
      else actual[nombreColor] = img;
      return { ...f, imagenPorColor: actual };
    });
  }

  function editar(p: Producto) {
    setForm(productoAFormulario(p));
    setEditandoId(p.id);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function borrar(p: Producto) {
    if (!window.confirm(`¿Eliminar "${p.nombre}"? Esta acción no se puede deshacer.`)) return;
    const ok = await eliminar(p.id);
    if (!ok) return mostrarAviso("No se pudo eliminar.");
    if (editandoId === p.id) limpiar();
    mostrarAviso("Producto eliminado");
  }

  const campo =
    "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[var(--color-bg-black)] focus:border-[var(--color-accent-blue)] focus:outline-none";
  const etiqueta = "text-[11px] font-semibold tracking-[0.15em] text-[var(--color-text-muted)]";

  return (
    <main className="min-h-screen bg-[#F4F4F2]">
      {/* Barra superior */}
      <header className="sticky top-0 z-20 border-b border-black/10 bg-[var(--color-bg-black)]">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-5 py-4 md:px-8">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-lg font-bold text-[var(--color-off-white)]">
              Leonardo Porto
            </span>
            <span className="text-[11px] tracking-[0.2em] text-[var(--color-text-muted)]">
              ADMINISTRACIÓN
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CambiarPassword />
            <Link
              href="/productos"
              className="rounded-full border border-white/20 px-4 py-2 text-[13px] text-[var(--color-off-white)] transition-colors hover:bg-white/10"
            >
              Ver la tienda
            </Link>
            <button
              onClick={() => salir()}
              className="rounded-full border border-white/20 px-4 py-2 text-[13px] text-[var(--color-off-white)] transition-colors hover:bg-white/10"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-5 py-8 md:px-8 lg:flex-row lg:items-start lg:gap-10">
        {/* Formulario */}
        <section className="w-full rounded-[1.5rem] border border-black/10 bg-white p-6 lg:sticky lg:top-24 lg:w-[420px] lg:shrink-0">
          <h2 className="font-display text-xl font-bold text-[var(--color-bg-black)]">
            {editando ? "Editar producto" : "Agregar producto"}
          </h2>
          <p className="mt-1 text-[13px] text-[var(--color-text-muted)]">
            {editando
              ? "Modificá los datos y guardá los cambios."
              : "Completá los datos de la prenda que querés publicar."}
          </p>

          <form onSubmit={enviar} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={etiqueta}>NOMBRE</label>
              <input
                className={campo}
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Camisa de lino"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={etiqueta}>PRECIO</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, tipoPrecio: "fijo" })}
                  className={`flex-1 rounded-full px-3 py-2 text-[12.5px] font-medium transition-colors ${
                    form.tipoPrecio === "fijo"
                      ? "bg-[var(--color-bg-black)] text-[var(--color-off-white)]"
                      : "border border-black/15 text-[var(--color-bg-black)] hover:border-black/40"
                  }`}
                >
                  Precio fijo
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, tipoPrecio: "consultar" })}
                  className={`flex-1 rounded-full px-3 py-2 text-[12.5px] font-medium transition-colors ${
                    form.tipoPrecio === "consultar"
                      ? "bg-[var(--color-bg-black)] text-[var(--color-off-white)]"
                      : "border border-black/15 text-[var(--color-bg-black)] hover:border-black/40"
                  }`}
                >
                  Consultar por WhatsApp
                </button>
              </div>
              {form.tipoPrecio === "fijo" ? (
                <input
                  className={`${campo} mt-1`}
                  value={form.precio}
                  onChange={(e) => setForm({ ...form, precio: e.target.value })}
                  placeholder="89999"
                  inputMode="numeric"
                />
              ) : (
                <p className="mt-1 rounded-xl bg-black/[0.03] px-4 py-3 text-[12px] text-[var(--color-text-muted)]">
                  Esta prenda va a mostrar &quot;Consultar precio&quot; en la tienda, sin un
                  monto fijo publicado. El cliente solo va a poder escribir por WhatsApp — no
                  se puede sumar al carrito.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={etiqueta}>CATEGORÍA</label>
              <select
                className={campo}
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              >
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={etiqueta}>DESCRIPCIÓN</label>
              <textarea
                className={`${campo} min-h-[90px] resize-y`}
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                placeholder="Material, corte y detalles de la prenda."
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={etiqueta}>TALLES (separados por coma)</label>
              <input
                className={campo}
                value={form.talles}
                onChange={(e) => setForm({ ...form, talles: e.target.value })}
                placeholder="S, M, L, XL"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={etiqueta}>COLORES (Nombre:#HEX, separados por coma)</label>
              <input
                className={campo}
                value={form.colores}
                onChange={(e) => setForm({ ...form, colores: e.target.value })}
                placeholder="Negro:#1A1A1A, Camel:#B08D57"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={etiqueta}>FOTOS (elegí una o varias, en orden)</label>
              <div className="grid grid-cols-5 gap-2">
                {IMAGENES.map((img) => {
                  const posicion = form.imagenes.indexOf(img);
                  const seleccionada = posicion !== -1;
                  return (
                    <button
                      type="button"
                      key={img}
                      onClick={() => toggleImagen(img)}
                      className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                        seleccionada
                          ? "border-[var(--color-accent-blue)]"
                          : "border-transparent hover:border-black/20"
                      }`}
                    >
                      <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                      {seleccionada && (
                        <span className="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent-blue)] text-[11px] font-bold text-white">
                          {posicion + 1}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)]">
                Se elige entre las fotos ya cargadas — la primera que toques es la
                portada. Tocá una foto de nuevo para sacarla.
              </p>
            </div>

            {parsearColores(form.colores).length > 0 && (
              <div className="flex flex-col gap-3">
                <label className={etiqueta}>FOTO POR COLOR (opcional)</label>
                {form.imagenes.length === 0 ? (
                  <p className="text-[11px] text-[var(--color-text-muted)]">
                    Elegí fotos arriba primero para poder asignarle una a cada color.
                  </p>
                ) : (
                  parsearColores(form.colores).map((c) => (
                    <div key={c.nombre} className="flex items-center gap-2.5">
                      <span
                        className="h-6 w-6 shrink-0 rounded-full border border-black/15"
                        style={{ backgroundColor: c.hex }}
                        title={c.nombre}
                      />
                      <span className="w-20 shrink-0 truncate text-[12.5px] text-[var(--color-bg-black)]">
                        {c.nombre}
                      </span>
                      <div className="flex gap-1.5 overflow-x-auto">
                        {form.imagenes.map((img) => {
                          const asignada = form.imagenPorColor[c.nombre] === img;
                          return (
                            <button
                              type="button"
                              key={img}
                              onClick={() => toggleImagenColor(c.nombre, img)}
                              className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                                asignada ? "border-[var(--color-accent-blue)]" : "border-transparent hover:border-black/20"
                              }`}
                            >
                              <Image src={img} alt="" fill sizes="36px" className="object-cover" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  Si no le asignás una foto a un color, elegirlo no cambia la imagen
                  principal de la ficha.
                </p>
              </div>
            )}

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-700">{error}</p>
            )}

            <div className="mt-2 flex gap-3">
              <button
                type="submit"
                className="flex-1 rounded-full bg-[var(--color-bg-black)] px-6 py-3 text-sm font-semibold text-[var(--color-off-white)] transition-transform active:scale-[0.98]"
              >
                {editando ? "Guardar cambios" : "Agregar producto"}
              </button>
              {editando && (
                <button
                  type="button"
                  onClick={limpiar}
                  className="rounded-full border border-black/20 px-5 py-3 text-sm font-medium text-[var(--color-bg-black)]"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Listado */}
        <section className="flex w-full flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-bold text-[var(--color-bg-black)]">
                Productos publicados
              </h2>
              <p className="text-[13px] text-[var(--color-text-muted)]">
                {productos.length} {productos.length === 1 ? "prenda" : "prendas"} en la tienda
              </p>
            </div>
            <button
              onClick={async () => {
                if (window.confirm("¿Restaurar el catálogo original? Se pierden los cambios hechos acá.")) {
                  const ok = await restaurar();
                  limpiar();
                  mostrarAviso(ok ? "Catálogo restaurado" : "No se pudo restaurar.");
                }
              }}
              className="text-[13px] font-medium text-[var(--color-text-muted)] underline underline-offset-4 hover:text-[var(--color-bg-black)]"
            >
              Restaurar catálogo original
            </button>
          </div>

          {aviso && (
            <p className="rounded-xl bg-emerald-50 px-4 py-3 text-[13px] font-medium text-emerald-800">
              {aviso}
            </p>
          )}

          {!cargado ? (
            <p className="text-sm text-[var(--color-text-muted)]">Cargando…</p>
          ) : productos.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-black/20 px-6 py-16 text-center">
              <p className="font-display text-lg font-bold text-[var(--color-bg-black)]">
                No hay productos cargados
              </p>
              <p className="mt-1 text-[13px] text-[var(--color-text-muted)]">
                Agregá el primero con el formulario de la izquierda.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {productos.map((p) => (
                <article
                  key={p.id}
                  className="flex flex-col gap-4 rounded-[1.25rem] border border-black/10 bg-white p-3 sm:flex-row sm:items-center"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F4F4F2]">
                    <Image src={p.imagenes[0]} alt={p.nombre} fill sizes="96px" className="object-cover" />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <span className="text-[11px] tracking-wide text-[var(--color-text-muted)]">
                      {p.categoria}
                    </span>
                    <p className="font-semibold text-[var(--color-bg-black)]">{p.nombre}</p>
                    <p
                      className={`text-sm font-bold ${
                        p.precio === null ? "text-[var(--color-text-muted)]" : "text-[var(--color-accent-blue)]"
                      }`}
                    >
                      {textoPrecio(p.precio)}
                    </p>
                    <p className="text-[12px] text-[var(--color-text-muted)]">
                      Talles: {p.talles.join(", ")} · {p.colores.length}{" "}
                      {p.colores.length === 1 ? "color" : "colores"}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => editar(p)}
                      className="rounded-full border border-black/20 px-5 py-2 text-[13px] font-medium text-[var(--color-bg-black)] transition-colors hover:bg-black/5"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => borrar(p)}
                      className="rounded-full border border-red-200 px-5 py-2 text-[13px] font-medium text-red-700 transition-colors hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          <p className="mt-2 rounded-xl bg-amber-50 px-4 py-3 text-[12px] leading-relaxed text-amber-900">
            Los cambios se guardan en la base de datos y se ven desde cualquier
            dispositivo apenas se guardan.
          </p>
        </section>
      </div>
    </main>
  );
}

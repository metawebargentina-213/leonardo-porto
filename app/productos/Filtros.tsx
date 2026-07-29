"use client";

import { useEffect, useRef, useState } from "react";

function ChevronIcon({ className, open }: { className?: string; open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
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

type Opcion = { valor: string; etiqueta: string };

function Desplegable({
  titulo,
  opciones,
  valor,
  onCambiar,
  abierto,
  onToggle,
}: {
  titulo: string;
  opciones: Opcion[];
  valor: string;
  onCambiar: (v: string) => void;
  abierto: boolean;
  onToggle: () => void;
}) {
  const actual = opciones.find((o) => o.valor === valor);

  return (
    <div className="relative border-b border-black/10 py-1 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={abierto}
        className="flex w-full items-center justify-between gap-3 py-4 text-left"
      >
        <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-text-muted)]">
          {titulo}
        </span>
        <span className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-[var(--color-bg-black)]">
            {actual?.etiqueta}
          </span>
          <ChevronIcon open={abierto} className="h-4 w-4 text-[var(--color-text-muted)]" />
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          abierto ? "max-h-[840px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mb-4 flex flex-col gap-1 rounded-[1.25rem] border border-black/10 bg-white p-2 shadow-[0_12px_30px_-12px_rgba(17,17,17,0.15)]">
          {opciones.map((o) => {
            const seleccionado = o.valor === valor;
            return (
              <button
                key={o.valor}
                type="button"
                onClick={() => onCambiar(o.valor)}
                className={`flex items-center justify-between gap-3 rounded-[0.9rem] px-4 py-2.5 text-left text-[13px] transition-colors ${
                  seleccionado
                    ? "bg-[var(--color-bg-black)] text-[var(--color-off-white)]"
                    : "text-[var(--color-bg-black)] hover:bg-black/[0.04]"
                }`}
              >
                <span className="font-medium">{o.etiqueta}</span>
                {seleccionado && <CheckIcon className="h-3.5 w-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Filtros({
  categorias,
  categoria,
  setCategoria,
  talles,
  talle,
  setTalle,
  orden,
  setOrden,
  hayFiltros,
  limpiar,
}: {
  categorias: string[];
  categoria: string;
  setCategoria: (v: string) => void;
  talles: string[];
  talle: string;
  setTalle: (v: string) => void;
  orden: string;
  setOrden: (v: string) => void;
  hayFiltros: boolean;
  limpiar: () => void;
}) {
  const [abierto, setAbierto] = useState<"categoria" | "talle" | "orden" | null>(null);
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function alClicarFuera(e: MouseEvent) {
      if (contenedorRef.current && !contenedorRef.current.contains(e.target as Node)) {
        setAbierto(null);
      }
    }
    document.addEventListener("mousedown", alClicarFuera);
    return () => document.removeEventListener("mousedown", alClicarFuera);
  }, []);

  const opcionesCategoria: Opcion[] = ["Todos", ...categorias].map((c) => ({
    valor: c,
    etiqueta: c,
  }));
  const opcionesTalle: Opcion[] = ["Todos", ...talles].map((t) => ({ valor: t, etiqueta: t }));
  const opcionesOrden: Opcion[] = [
    { valor: "destacados", etiqueta: "Destacados" },
    { valor: "menor", etiqueta: "Menor precio" },
    { valor: "mayor", etiqueta: "Mayor precio" },
  ];

  function toggle(clave: "categoria" | "talle" | "orden") {
    setAbierto((actual) => (actual === clave ? null : clave));
  }

  return (
    <aside ref={contenedorRef} className="w-full lg:w-[260px] lg:shrink-0">
      <div className="flex items-center justify-between pb-3">
        <span className="font-display text-lg font-bold text-[var(--color-bg-black)]">
          Filtrar
        </span>
        {hayFiltros && (
          <button
            onClick={limpiar}
            className="text-[12px] font-medium text-[var(--color-accent-blue)] underline underline-offset-4"
          >
            Limpiar
          </button>
        )}
      </div>

      <div className="flex flex-col lg:sticky lg:top-8">
        <Desplegable
          titulo="CATEGORÍA"
          opciones={opcionesCategoria}
          valor={categoria}
          onCambiar={(v) => {
            setCategoria(v);
            setAbierto(null);
          }}
          abierto={abierto === "categoria"}
          onToggle={() => toggle("categoria")}
        />
        <Desplegable
          titulo="TALLE"
          opciones={opcionesTalle}
          valor={talle}
          onCambiar={(v) => {
            setTalle(v);
            setAbierto(null);
          }}
          abierto={abierto === "talle"}
          onToggle={() => toggle("talle")}
        />
        <Desplegable
          titulo="ORDENAR"
          opciones={opcionesOrden}
          valor={orden}
          onCambiar={(v) => {
            setOrden(v);
            setAbierto(null);
          }}
          abierto={abierto === "orden"}
          onToggle={() => toggle("orden")}
        />
      </div>
    </aside>
  );
}

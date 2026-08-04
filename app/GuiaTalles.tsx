"use client";

import { useState } from "react";

const TALLES_PRENDA = [
  { talle: "S", pecho: "88–92", cintura: "76–80" },
  { talle: "M", pecho: "93–97", cintura: "81–85" },
  { talle: "L", pecho: "98–104", cintura: "86–92" },
  { talle: "XL", pecho: "105–111", cintura: "93–99" },
];

const TALLES_SASTRERIA = [
  { talle: "46", pecho: "88–91", cintura: "76–79" },
  { talle: "48", pecho: "92–95", cintura: "80–83" },
  { talle: "50", pecho: "96–99", cintura: "84–87" },
  { talle: "52", pecho: "100–103", cintura: "88–91" },
  { talle: "54", pecho: "104–108", cintura: "92–96" },
];

function Tabla({ titulo, filas }: { titulo: string; filas: { talle: string; pecho: string; cintura: string }[] }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-semibold tracking-[0.15em] text-[var(--color-text-muted)]">
        {titulo}
      </span>
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-black/10 text-left text-[var(--color-text-muted)]">
            <th className="py-2 font-medium">Talle</th>
            <th className="py-2 font-medium">Pecho (cm)</th>
            <th className="py-2 font-medium">Cintura (cm)</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => (
            <tr key={f.talle} className="border-b border-black/5 text-[var(--color-bg-black)] last:border-b-0">
              <td className="py-2 font-semibold">{f.talle}</td>
              <td className="py-2">{f.pecho}</td>
              <td className="py-2">{f.cintura}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GuiaTalles({ children }: { children: (abrir: () => void) => React.ReactNode }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      {children(() => setAbierto(true))}

      <div
        onClick={() => setAbierto(false)}
        className={`fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          abierto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!abierto}
        className={`fixed inset-x-0 bottom-0 z-[90] flex max-h-[85vh] flex-col rounded-t-[2rem] bg-white p-6 transition-transform duration-300 ease-out sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[440px] sm:-translate-x-1/2 sm:rounded-[1.75rem] sm:p-8 ${
          abierto
            ? "translate-y-0 sm:-translate-y-1/2"
            : "translate-y-full sm:-translate-y-[calc(50%-24px)] sm:opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-bold text-[var(--color-bg-black)]">
            Guía de talles
          </span>
          <button
            aria-label="Cerrar"
            onClick={() => setAbierto(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none text-[var(--color-bg-black)] hover:bg-black/5"
          >
            ×
          </button>
        </div>
        <p className="mt-2 text-[13px] text-[var(--color-text-muted)]">
          Medidas de referencia en centímetros. Ante la duda entre dos talles, te
          recomendamos el mayor.
        </p>
        <div className="mt-5 flex flex-col gap-6 overflow-y-auto">
          <Tabla titulo="ABRIGOS Y PRENDAS (S–XL)" filas={TALLES_PRENDA} />
          <Tabla titulo="SASTRERÍA (46–54)" filas={TALLES_SASTRERIA} />
        </div>
      </div>
    </>
  );
}

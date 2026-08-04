"use client";

import { useFavoritos } from "./useFavoritos";

export function CorazonFavorito({
  productoId,
  className,
  tamaño = "sm",
}: {
  productoId: string;
  className?: string;
  tamaño?: "sm" | "lg";
}) {
  const { esFavorito, toggle } = useFavoritos();
  const activo = esFavorito(productoId);
  const medida = tamaño === "lg" ? "h-5 w-5" : "h-4 w-4";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productoId);
      }}
      aria-label={activo ? "Quitar de favoritos" : "Agregar a favoritos"}
      aria-pressed={activo}
      className={className}
    >
      <svg
        viewBox="0 0 24 24"
        fill={activo ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        className={medida}
      >
        <path d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.3 4.5 5.7 4c2.1-.3 4.2.8 6.3 3.3C14.1 4.8 16.2 3.7 18.3 4c3.4.5 5.2 3.8 3.7 7.2-2.5 4.7-10 9.3-10 9.3z" />
      </svg>
    </button>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";

const CLAVE = "leonardo-porto:favoritos";

function leer(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const guardado = window.localStorage.getItem(CLAVE);
    return guardado ? (JSON.parse(guardado) as string[]) : [];
  } catch {
    return [];
  }
}

function guardar(ids: string[]) {
  window.localStorage.setItem(CLAVE, JSON.stringify(ids));
  window.dispatchEvent(new Event("favoritos-actualizado"));
}

export function useFavoritos() {
  const [ids, setIds] = useState<string[]>([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const sincronizar = () => setIds(leer());
    sincronizar();
    setCargado(true);
    window.addEventListener("favoritos-actualizado", sincronizar);
    window.addEventListener("storage", sincronizar);
    return () => {
      window.removeEventListener("favoritos-actualizado", sincronizar);
      window.removeEventListener("storage", sincronizar);
    };
  }, []);

  const esFavorito = useCallback((productoId: string) => ids.includes(productoId), [ids]);

  const toggle = useCallback((productoId: string) => {
    const actuales = leer();
    guardar(
      actuales.includes(productoId)
        ? actuales.filter((id) => id !== productoId)
        : [...actuales, productoId]
    );
  }, []);

  return { ids, cargado, esFavorito, toggle, cantidad: ids.length };
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { Producto, catalogoInicial } from "./catalogo";

const CLAVE = "leonardo-porto:catalogo";

// Etapa temporal: el catálogo vive en el navegador para poder probar el panel
// sin backend. Al conectar Supabase, estas cuatro funciones pasan a ser queries.
function leer(): Producto[] {
  if (typeof window === "undefined") return catalogoInicial;
  try {
    const guardado = window.localStorage.getItem(CLAVE);
    return guardado ? (JSON.parse(guardado) as Producto[]) : catalogoInicial;
  } catch {
    return catalogoInicial;
  }
}

function guardar(productos: Producto[]) {
  window.localStorage.setItem(CLAVE, JSON.stringify(productos));
  window.dispatchEvent(new Event("catalogo-actualizado"));
}

export function useCatalogo() {
  const [productos, setProductos] = useState<Producto[]>(catalogoInicial);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const sincronizar = () => setProductos(leer());
    sincronizar();
    setCargado(true);
    window.addEventListener("catalogo-actualizado", sincronizar);
    window.addEventListener("storage", sincronizar);
    return () => {
      window.removeEventListener("catalogo-actualizado", sincronizar);
      window.removeEventListener("storage", sincronizar);
    };
  }, []);

  const crear = useCallback((producto: Producto) => {
    guardar([...leer(), producto]);
  }, []);

  const actualizar = useCallback((producto: Producto) => {
    guardar(leer().map((p) => (p.id === producto.id ? producto : p)));
  }, []);

  const eliminar = useCallback((id: string) => {
    guardar(leer().filter((p) => p.id !== id));
  }, []);

  const restaurar = useCallback(() => {
    guardar(catalogoInicial);
  }, []);

  return { productos, cargado, crear, actualizar, eliminar, restaurar };
}

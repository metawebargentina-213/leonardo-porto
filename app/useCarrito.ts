"use client";

import { useCallback, useEffect, useState } from "react";
import { WHATSAPP_NUMERO, formatearPrecio } from "./catalogo";

export type ItemCarrito = {
  id: string;
  productoId: string;
  slug: string;
  nombre: string;
  imagen: string;
  precio: number;
  talle: string;
  color: string;
  cantidad: number;
};

const CLAVE = "leonardo-porto:carrito";

function leer(): ItemCarrito[] {
  if (typeof window === "undefined") return [];
  try {
    const guardado = window.localStorage.getItem(CLAVE);
    return guardado ? (JSON.parse(guardado) as ItemCarrito[]) : [];
  } catch {
    return [];
  }
}

function guardar(items: ItemCarrito[]) {
  window.localStorage.setItem(CLAVE, JSON.stringify(items));
  window.dispatchEvent(new Event("carrito-actualizado"));
}

export function useCarrito() {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const sincronizar = () => setItems(leer());
    sincronizar();
    setCargado(true);
    window.addEventListener("carrito-actualizado", sincronizar);
    window.addEventListener("storage", sincronizar);
    return () => {
      window.removeEventListener("carrito-actualizado", sincronizar);
      window.removeEventListener("storage", sincronizar);
    };
  }, []);

  const agregar = useCallback(
    (item: Omit<ItemCarrito, "id" | "cantidad">, cantidad = 1) => {
      const id = `${item.productoId}__${item.talle}__${item.color}`;
      const actuales = leer();
      const existente = actuales.find((i) => i.id === id);
      if (existente) {
        guardar(
          actuales.map((i) => (i.id === id ? { ...i, cantidad: i.cantidad + cantidad } : i))
        );
      } else {
        guardar([...actuales, { ...item, id, cantidad }]);
      }
    },
    []
  );

  const actualizarCantidad = useCallback((id: string, cantidad: number) => {
    if (cantidad <= 0) {
      guardar(leer().filter((i) => i.id !== id));
      return;
    }
    guardar(leer().map((i) => (i.id === id ? { ...i, cantidad } : i)));
  }, []);

  const quitar = useCallback((id: string) => {
    guardar(leer().filter((i) => i.id !== id));
  }, []);

  const vaciar = useCallback(() => {
    guardar([]);
  }, []);

  const cantidadTotal = items.reduce((acc, i) => acc + i.cantidad, 0);
  const subtotal = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

  return {
    items,
    cargado,
    agregar,
    actualizarCantidad,
    quitar,
    vaciar,
    cantidadTotal,
    subtotal,
  };
}

export function armarLinkWhatsappCarrito(items: ItemCarrito[], subtotal: number) {
  const lineas = items.map(
    (i) =>
      `• ${i.nombre} — Talle ${i.talle}, Color ${i.color} — x${i.cantidad} — ${formatearPrecio(
        i.precio * i.cantidad
      )}`
  );
  const detalle = [
    "Hola! Quiero hacer este pedido:",
    "",
    ...lineas,
    "",
    `Total: ${formatearPrecio(subtotal)}`,
  ].join("\n");

  const texto = encodeURIComponent(detalle);
  return WHATSAPP_NUMERO
    ? `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`
    : `https://wa.me/?text=${texto}`;
}

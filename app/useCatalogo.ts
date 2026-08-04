"use client";

import { useCallback, useEffect, useState } from "react";
import { Producto, catalogoInicial } from "./catalogo";
import { supabase } from "./supabaseClient";

export function useCatalogo() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargado, setCargado] = useState(false);

  const sincronizar = useCallback(async () => {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("creado_en", { ascending: true });
    if (!error && data) setProductos(data as Producto[]);
    setCargado(true);
  }, []);

  useEffect(() => {
    sincronizar();
  }, [sincronizar]);

  const crear = useCallback(
    async (producto: Producto) => {
      const { error } = await supabase.from("productos").insert(producto);
      await sincronizar();
      return !error;
    },
    [sincronizar]
  );

  const actualizar = useCallback(
    async (producto: Producto) => {
      const { error } = await supabase.from("productos").update(producto).eq("id", producto.id);
      await sincronizar();
      return !error;
    },
    [sincronizar]
  );

  const eliminar = useCallback(
    async (id: string) => {
      const { error } = await supabase.from("productos").delete().eq("id", id);
      await sincronizar();
      return !error;
    },
    [sincronizar]
  );

  const restaurar = useCallback(async () => {
    const { error: errorBorrado } = await supabase.from("productos").delete().neq("id", "");
    const { error: errorInsercion } = await supabase.from("productos").insert(catalogoInicial);
    await sincronizar();
    return !errorBorrado && !errorInsercion;
  }, [sincronizar]);

  return { productos, cargado, crear, actualizar, eliminar, restaurar };
}

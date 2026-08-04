"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";

export function useAdminAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCargado(true);
    });
    const { data: suscripcion } = supabase.auth.onAuthStateChange((_evento, nuevaSession) => {
      setSession(nuevaSession);
    });
    return () => suscripcion.subscription.unsubscribe();
  }, []);

  async function entrar(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error?.message ?? null;
  }

  async function salir() {
    await supabase.auth.signOut();
  }

  return { session, cargado, entrar, salir };
}

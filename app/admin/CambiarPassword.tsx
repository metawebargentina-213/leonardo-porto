"use client";

import { useState } from "react";
import { supabase } from "../supabaseClient";

export function CambiarPassword() {
  const [abierto, setAbierto] = useState(false);
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      setMensaje("La contraseña tiene que tener al menos 6 caracteres.");
      return;
    }
    setEnviando(true);
    setMensaje("");
    const { error } = await supabase.auth.updateUser({ password });
    setEnviando(false);
    if (error) {
      setMensaje(error.message);
      return;
    }
    setMensaje("Contraseña actualizada.");
    setPassword("");
    window.setTimeout(() => setAbierto(false), 1500);
  }

  if (!abierto) {
    return (
      <button
        onClick={() => setAbierto(true)}
        className="rounded-full border border-white/20 px-4 py-2 text-[13px] text-[var(--color-off-white)] transition-colors hover:bg-white/10"
      >
        Configurar contraseña
      </button>
    );
  }

  return (
    <form onSubmit={guardar} className="flex items-center gap-2">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Nueva contraseña"
        autoFocus
        className="rounded-full border border-white/20 bg-transparent px-4 py-2 text-[13px] text-[var(--color-off-white)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
      />
      <button
        type="submit"
        disabled={enviando}
        className="rounded-full bg-[var(--color-accent-blue)] px-4 py-2 text-[13px] font-semibold text-white disabled:opacity-50"
      >
        {enviando ? "Guardando…" : "Guardar"}
      </button>
      <button
        type="button"
        onClick={() => setAbierto(false)}
        className="text-[13px] text-[var(--color-text-muted)]"
      >
        Cancelar
      </button>
      {mensaje && <span className="text-[12px] text-[var(--color-off-white)]">{mensaje}</span>}
    </form>
  );
}

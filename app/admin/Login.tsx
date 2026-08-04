"use client";

import { useState } from "react";

export function Login({
  onEntrar,
}: {
  onEntrar: (email: string, password: string) => Promise<string | null>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setError("");
    const mensaje = await onEntrar(email, password);
    setEnviando(false);
    if (mensaje) setError(mensaje === "Invalid login credentials" ? "Email o contraseña incorrectos." : mensaje);
  }

  const campo =
    "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[var(--color-bg-black)] focus:border-[var(--color-accent-blue)] focus:outline-none";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4F4F2] px-5">
      <form onSubmit={enviar} className="w-full max-w-[360px] rounded-[1.5rem] border border-black/10 bg-white p-8">
        <h1 className="font-display text-xl font-bold text-[var(--color-bg-black)]">Ingresar</h1>
        <p className="mt-1 text-[13px] text-[var(--color-text-muted)]">
          Acceso exclusivo para administración de Leonardo Porto.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <input
            className={campo}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
          <input
            className={campo}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error && <p className="text-[13px] text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={enviando}
            className="rounded-full bg-[var(--color-bg-black)] px-6 py-3 text-sm font-semibold text-[var(--color-off-white)] disabled:opacity-50"
          >
            {enviando ? "Ingresando…" : "Ingresar"}
          </button>
        </div>
      </form>
    </main>
  );
}

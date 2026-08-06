import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_NUMERO } from "./catalogo";
import { GuiaTalles } from "./GuiaTalles";

export const SHELL = "mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-20";

const linkContacto = WHATSAPP_NUMERO
  ? `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent("Hola! Tengo una consulta.")}`
  : `https://wa.me/?text=${encodeURIComponent("Hola! Tengo una consulta.")}`;

const productosColumna = [
  { label: "Hombre", href: "/productos" },
  { label: "Abrigos", href: "/productos?categoria=Abrigos" },
  { label: "Accesorios", href: "/productos?categoria=Accesorios" },
];

const empresaColumna = ["Sobre Leonardo Porto", "Sustentabilidad", "Trabajá con nosotros"];

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function PillButton({
  href,
  children,
  variant = "solid",
  target,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "dark";
  target?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`group flex w-fit shrink-0 items-center gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-semibold text-[var(--color-off-white)] transition-transform active:scale-[0.98] md:gap-4 md:pl-7 ${
        variant === "solid" ? "bg-[var(--color-accent-blue)]" : "bg-[var(--color-bg-black)]"
      }`}
    >
      <span className="whitespace-nowrap">{children}</span>
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:h-9 md:w-9 ${
          variant === "solid" ? "bg-[var(--color-bg-black)]" : "bg-[var(--color-accent-blue)]"
        }`}
      >
        <ArrowIcon className="h-4 w-4" />
      </span>
    </a>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-fit rounded-full border border-[var(--color-accent-blue)] px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-[var(--color-accent-blue)] md:px-5 md:text-[11px]">
      {children}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--color-bg-black)]">
      <div className={`${SHELL} flex flex-col gap-10 pt-14 pb-8 lg:gap-12 lg:pt-16`}>
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left lg:w-72">
            <div className="flex items-center gap-2.5">
              <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                <Image src="/images/logo-lp.jpg" alt="" fill sizes="32px" className="object-cover" />
              </span>
              <span className="font-display text-xl font-bold text-[var(--color-off-white)]">
                Leonardo Porto
              </span>
            </div>
            <p className="max-w-[320px] text-sm leading-relaxed text-[var(--color-text-muted)]">
              Indumentaria atemporal, hecha con materiales nobles y atención al
              detalle.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4 sm:text-left lg:flex lg:gap-16">
            <div className="flex flex-col items-center gap-3.5 sm:items-start">
              <span className="text-xs font-bold tracking-wide text-[var(--color-off-white)]">
                PRODUCTOS
              </span>
              {productosColumna.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="-my-2 py-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-off-white)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col items-center gap-3.5 sm:items-start">
              <span className="text-xs font-bold tracking-wide text-[var(--color-off-white)]">
                AYUDA
              </span>
              <span className="text-sm text-[var(--color-text-muted)]">Envíos</span>
              <span className="text-sm text-[var(--color-text-muted)]">Cambios y devoluciones</span>
              <GuiaTalles>
                {(abrir) => (
                  <button
                    type="button"
                    onClick={abrir}
                    className="-my-2 py-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-off-white)]"
                  >
                    Guía de talles
                  </button>
                )}
              </GuiaTalles>
              <a
                href={linkContacto}
                target="_blank"
                rel="noopener noreferrer"
                className="-my-2 py-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-off-white)]"
              >
                Contacto
              </a>
            </div>

            <div className="flex flex-col items-center gap-3.5 sm:items-start">
              <span className="text-xs font-bold tracking-wide text-[var(--color-off-white)]">
                EMPRESA
              </span>
              {empresaColumna.map((item) => (
                <span key={item} className="text-sm text-[var(--color-text-muted)]">
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-col items-center gap-3.5 sm:items-start">
              <span className="text-xs font-bold tracking-wide text-[var(--color-off-white)]">
                SEGUINOS
              </span>
              <div className="flex gap-3">
                {[
                  { label: "IG", href: "https://www.instagram.com/leonardoporto_okk/" },
                  {
                    label: "FB",
                    href: "https://www.facebook.com/profile.php?id=61558631401665",
                  },
                ].map((red) => (
                  <a
                    key={red.label}
                    href={red.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-[11px] text-[var(--color-off-white)] transition-colors hover:bg-white/[0.16]"
                  >
                    {red.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/10" />

        <div className="flex flex-col items-center gap-4 text-center text-xs text-[var(--color-text-muted)] sm:flex-row sm:justify-between sm:text-left">
          <span>© 2026 Leonardo Porto. Todos los derechos reservados.</span>
          <div className="flex gap-6">
            <span>Privacidad</span>
            <span>Términos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

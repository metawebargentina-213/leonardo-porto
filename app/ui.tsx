export const SHELL = "mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-20";

const footerColumns = [
  { title: "PRODUCTOS", items: ["Hombre", "Abrigos", "Accesorios"] },
  {
    title: "AYUDA",
    items: ["Envíos", "Cambios y devoluciones", "Guía de talles", "Contacto"],
  },
  {
    title: "EMPRESA",
    items: ["Sobre Leonardo Porto", "Sustentabilidad", "Trabajá con nosotros"],
  },
];

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
            <span className="font-display text-xl font-bold text-[var(--color-off-white)]">
              Leonardo Porto
            </span>
            <p className="max-w-[320px] text-sm leading-relaxed text-[var(--color-text-muted)]">
              Indumentaria atemporal, hecha con materiales nobles y atención al
              detalle.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4 sm:text-left lg:flex lg:gap-16">
            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col items-center gap-3.5 sm:items-start">
                <span className="text-xs font-bold tracking-wide text-[var(--color-off-white)]">
                  {col.title}
                </span>
                {col.items.map((item) => (
                  <span key={item} className="text-sm text-[var(--color-text-muted)]">
                    {item}
                  </span>
                ))}
              </div>
            ))}

            <div className="flex flex-col items-center gap-3.5 sm:items-start">
              <span className="text-xs font-bold tracking-wide text-[var(--color-off-white)]">
                SEGUINOS
              </span>
              <div className="flex gap-3">
                {["IG", "YT", "X"].map((label) => (
                  <span
                    key={label}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-[11px] text-[var(--color-off-white)]"
                  >
                    {label}
                  </span>
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

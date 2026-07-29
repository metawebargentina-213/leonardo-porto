import Image from "next/image";

const navLinks = ["Novedades", "Hombre", "Accesorios"];

const categories = [
  { label: "Hombre", image: "/images/4DRhU.jpeg" },
  { label: "Abrigos", image: "/images/xczFv.jpeg" },
  { label: "Accesorios", image: "/images/aVVsm.jpeg" },
];

const products = [
  { name: "Trench coat clásico", price: "$189.999", image: "/images/D2Y3h.jpeg" },
  { name: "Mocasín de cuero", price: "$149.999", image: "/images/WWwDa.jpeg" },
  { name: "Blazer de lana a medida", price: "$99.999", image: "/images/0fffc.jpeg" },
  { name: "Sweater de lana merino", price: "$114.999", image: "/images/HUiet.jpeg" },
];

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function PillButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "dark";
}) {
  return (
    <a
      href={href}
      className={`group flex w-fit items-center gap-4 rounded-full py-2 pl-7 pr-2 text-sm font-semibold text-[var(--color-off-white)] transition-transform active:scale-[0.98] ${
        variant === "solid" ? "bg-[var(--color-accent-blue)]" : "bg-[var(--color-bg-black)]"
      }`}
    >
      {children}
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
          variant === "solid" ? "bg-[var(--color-bg-black)]" : "bg-[var(--color-accent-blue)]"
        }`}
      >
        <ArrowIcon className="h-4 w-4" />
      </span>
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-fit rounded-full border border-[var(--color-accent-blue)] px-5 py-2 text-[11px] font-semibold tracking-[0.2em] text-[var(--color-accent-blue)]">
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-off-white)]">
      {/* Header + Hero (dark block) */}
      <section className="bg-[var(--color-bg-black)]">
        <div className="flex justify-center pt-8 pb-6">
          <nav className="flex items-center gap-11 rounded-full bg-white/[0.08] py-4 pl-8 pr-5 backdrop-blur-md">
            <span className="font-display text-lg font-bold text-[var(--color-off-white)]">
              Leonardo Porto
            </span>
            <div className="flex items-center gap-8">
              {navLinks.map((label) => (
                <a key={label} href="#" className="text-[13px] font-medium text-[var(--color-off-white)]">
                  {label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-5 text-[var(--color-off-white)]">
              <button aria-label="Buscar">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <circle cx="11" cy="11" r="7.5" />
                  <line x1="21" y1="21" x2="16.2" y2="16.2" />
                </svg>
              </button>
              <button aria-label="Carrito">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M6.5 8.5h11l1 12.5h-13z" />
                  <path d="M9 8.5v-2a3 3 0 0 1 6 0v2" />
                </svg>
              </button>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-16 px-20 pt-16 pb-24">
          <div className="flex w-[560px] shrink-0 flex-col gap-7">
            <Eyebrow>COLECCIÓN 2026</Eyebrow>
            <h1 className="font-display text-7xl font-bold leading-[1.02] text-[var(--color-off-white)]">
              Elegancia
              <br />
              sin tiempo
            </h1>
            <p className="text-[17px] leading-relaxed text-[var(--color-text-muted)]">
              Prendas cortadas a medida, en materiales nobles, pensadas para durar más
              que una temporada.
            </p>
            <div className="flex items-center gap-6">
              <PillButton href="#">Comprar ahora</PillButton>
              <a href="#" className="text-sm font-semibold text-[var(--color-off-white)]">
                Ver lookbook
              </a>
            </div>
          </div>
          <div className="relative h-[640px] flex-1 rounded-[2.5rem] bg-white/[0.08] p-2.5">
            <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
              <Image src="/images/pZwEh.jpeg" alt="Colección Leonardo Porto" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="flex flex-col gap-10 px-20 py-24">
        <span className="w-fit rounded-full bg-black/[0.05] px-5 py-2 text-[11px] font-semibold tracking-[0.2em] text-[var(--color-bg-black)]">
          EXPLORÁ
        </span>
        <h2 className="font-display text-4xl font-bold text-[var(--color-bg-black)]">
          Comprá por categoría
        </h2>
        <div className="flex gap-8">
          {categories.map((cat) => (
            <div key={cat.label} className="h-[520px] w-full rounded-[2.25rem] bg-black/[0.05] p-2">
              <div className="relative h-full w-full overflow-hidden rounded-[1.75rem]">
                <Image src={cat.image} alt={cat.label} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="font-display absolute bottom-6 left-6 text-xl font-semibold text-[var(--color-off-white)]">
                  {cat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Más vendidos */}
      <section className="flex flex-col gap-12 bg-[var(--color-bg-navy)] px-20 py-24">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-accent-blue)]">
              TOP DE LA SEMANA
            </span>
            <h2 className="font-display text-4xl font-bold text-[var(--color-off-white)]">
              Más vendidos
            </h2>
          </div>
          <PillButton href="#" variant="dark">
            Ver todo
          </PillButton>
        </div>
        <div className="flex gap-7">
          {products.map((p) => (
            <div key={p.name} className="flex w-full flex-col gap-3.5 rounded-[1.75rem] bg-white/[0.05] p-2">
              <div className="relative h-[340px] w-full overflow-hidden rounded-[1.25rem] bg-[var(--color-off-white)]">
                <Image src={p.image} alt={p.name} fill className="object-cover" />
              </div>
              <p className="px-1 text-sm font-semibold text-[var(--color-off-white)]">{p.name}</p>
              <p className="px-1 pb-1 text-[15px] font-bold text-[var(--color-accent-blue)]">{p.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Statement */}
      <section className="flex h-[400px] flex-col items-center justify-center gap-6 bg-[var(--color-bg-black)] px-20">
        <div className="h-[3px] w-14 rounded-full bg-[var(--color-accent-blue)]" />
        <h2 className="font-display max-w-[820px] text-center text-5xl font-bold italic text-[var(--color-off-white)]">
          La elegancia no pasa de moda.
        </h2>
        <p className="text-base text-[var(--color-text-muted)]">
          No seguimos tendencias. Creamos piezas que las trascienden.
        </p>
      </section>

      {/* Editorial */}
      <section className="flex items-center gap-16 px-20 py-24">
        <div className="relative h-[520px] w-full rounded-[2.5rem] bg-black/[0.05] p-2.5">
          <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
            <Image src="/images/43JBA.jpeg" alt="Nueva temporada Leonardo Porto" fill className="object-cover" />
          </div>
        </div>
        <div className="flex w-[480px] shrink-0 flex-col gap-5">
          <Eyebrow>NUEVA COLECCIÓN</Eyebrow>
          <h2 className="font-display text-5xl font-bold leading-[1.05] text-[var(--color-bg-black)]">
            Nueva
            <br />
            temporada
          </h2>
          <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
            Cortes precisos y telas naturales, pensados para acompañar cada
            temporada sin perder vigencia.
          </p>
          <PillButton href="#" variant="dark">
            Descubrir colección
          </PillButton>
        </div>
      </section>

      {/* Newsletter */}
      <section className="flex flex-col items-center justify-center gap-6 bg-[var(--color-bg-navy)] px-20 py-20">
        <h2 className="font-display text-3xl font-bold text-[var(--color-off-white)]">
          Uníte al círculo Leonardo Porto
        </h2>
        <p className="text-[15px] text-[var(--color-text-muted)]">
          Enterate primero de nuevas colecciones y eventos exclusivos.
        </p>
        <form className="flex items-center gap-2 rounded-full bg-white/[0.05] p-1.5">
          <input
            type="email"
            placeholder="Tu email"
            className="h-12 w-80 bg-transparent px-5 text-sm text-[var(--color-off-white)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
          />
          <button className="h-12 rounded-full bg-[var(--color-accent-blue)] px-7 text-[13px] font-bold text-white">
            Suscribirme
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-12 bg-[var(--color-bg-black)] px-20 pt-16 pb-8">
        <div className="flex justify-between">
          <div className="flex w-72 flex-col gap-4">
            <span className="font-display text-xl font-bold text-[var(--color-off-white)]">
              Leonardo Porto
            </span>
            <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
              Indumentaria atemporal, hecha con materiales nobles y atención al
              detalle.
            </p>
          </div>
          <div className="flex flex-col gap-3.5">
            <span className="text-xs font-bold tracking-wide text-[var(--color-off-white)]">
              PRODUCTOS
            </span>
            {["Hombre", "Abrigos", "Accesorios"].map((i) => (
              <span key={i} className="text-sm text-[var(--color-text-muted)]">
                {i}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-3.5">
            <span className="text-xs font-bold tracking-wide text-[var(--color-off-white)]">
              AYUDA
            </span>
            {["Envíos", "Cambios y devoluciones", "Guía de talles", "Contacto"].map(
              (i) => (
                <span key={i} className="text-sm text-[var(--color-text-muted)]">
                  {i}
                </span>
              )
            )}
          </div>
          <div className="flex flex-col gap-3.5">
            <span className="text-xs font-bold tracking-wide text-[var(--color-off-white)]">
              EMPRESA
            </span>
            {["Sobre Leonardo Porto", "Sustentabilidad", "Trabajá con nosotros"].map(
              (i) => (
                <span key={i} className="text-sm text-[var(--color-text-muted)]">
                  {i}
                </span>
              )
            )}
          </div>
          <div className="flex flex-col gap-3.5">
            <span className="text-xs font-bold tracking-wide text-[var(--color-off-white)]">
              SEGUINOS
            </span>
            <div className="flex gap-3">
              {["instagram", "youtube", "twitter"].map((name) => (
                <span
                  key={name}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-[var(--color-off-white)]"
                >
                  {name === "instagram" ? "IG" : name === "youtube" ? "YT" : "X"}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-white/10" />
        <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
          <span>© 2026 Leonardo Porto. Todos los derechos reservados.</span>
          <div className="flex gap-6">
            <span>Privacidad</span>
            <span>Términos</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

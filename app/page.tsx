import Image from "next/image";
import { Nav } from "./Nav";

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

const SHELL = "mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-20";

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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-fit rounded-full border border-[var(--color-accent-blue)] px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-[var(--color-accent-blue)] md:px-5 md:text-[11px]">
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-off-white)]">
      {/* Header + Hero */}
      <section className="bg-[var(--color-bg-black)]">
        <Nav />

        <div
          className={`${SHELL} flex flex-col items-center gap-10 pt-10 pb-16 xl:flex-row xl:gap-16 xl:pt-16 xl:pb-24`}
        >
          <div className="flex w-full flex-col items-center gap-5 text-center xl:w-[560px] xl:shrink-0 xl:items-start xl:gap-7 xl:text-left">
            <Eyebrow>COLECCIÓN 2026</Eyebrow>
            <h1 className="font-display text-5xl font-bold leading-[1.02] text-[var(--color-off-white)] sm:text-6xl lg:text-7xl">
              Elegancia
              <br />
              sin tiempo
            </h1>
            <p className="max-w-[460px] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-[17px]">
              Prendas cortadas a medida, en materiales nobles, pensadas para durar más
              que una temporada.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5 md:gap-6 xl:justify-start">
              <PillButton href="#">Comprar ahora</PillButton>
              <a href="#" className="text-sm font-semibold text-[var(--color-off-white)]">
                Ver lookbook
              </a>
            </div>
          </div>

          <div className="w-full rounded-[2rem] bg-white/[0.08] p-2 xl:flex-1 xl:rounded-[2.5rem] xl:p-2.5">
            <div className="relative aspect-[636/620] w-full overflow-hidden rounded-[1.5rem] xl:rounded-[2rem]">
              <Image
                src="/images/pZwEh.jpeg"
                alt="Colección Leonardo Porto"
                fill
                sizes="(max-width: 1279px) 100vw, 660px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section
        className={`${SHELL} flex flex-col items-center gap-8 py-16 text-center sm:items-start sm:text-left md:gap-10 lg:py-24`}
      >
        <span className="w-fit rounded-full bg-black/[0.05] px-5 py-2 text-[11px] font-semibold tracking-[0.2em] text-[var(--color-bg-black)]">
          EXPLORÁ
        </span>
        <h2 className="font-display text-3xl font-bold text-[var(--color-bg-black)] md:text-4xl">
          Comprá por categoría
        </h2>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="w-full rounded-[2rem] bg-black/[0.05] p-2 lg:rounded-[2.25rem]"
            >
              <div className="relative aspect-[389/504] w-full overflow-hidden rounded-[1.5rem] lg:rounded-[1.75rem]">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 33vw, 405px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="font-display absolute bottom-5 left-5 text-lg font-semibold text-[var(--color-off-white)] md:bottom-6 md:left-6 md:text-xl">
                  {cat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Más vendidos */}
      <section className="bg-[var(--color-bg-navy)]">
        <div className={`${SHELL} flex flex-col gap-8 py-16 md:gap-12 lg:py-24`}>
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:items-end sm:text-left">
            <div className="flex flex-col gap-3 md:gap-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--color-accent-blue)] md:text-xs">
                TOP DE LA SEMANA
              </span>
              <h2 className="font-display text-3xl font-bold text-[var(--color-off-white)] md:text-4xl">
                Más vendidos
              </h2>
            </div>
            <PillButton href="#" variant="dark">
              Ver todo
            </PillButton>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-7">
            {products.map((p) => (
              <div
                key={p.name}
                className="flex w-full flex-col gap-3 rounded-[1.5rem] bg-white/[0.05] p-2 lg:gap-3.5 lg:rounded-[1.75rem]"
              >
                <div className="relative aspect-[283/340] w-full overflow-hidden rounded-[1rem] bg-[var(--color-off-white)] lg:rounded-[1.25rem]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 1023px) 50vw, 300px"
                    className="object-cover"
                  />
                </div>
                <p className="px-1 text-[13px] font-semibold text-[var(--color-off-white)] md:text-sm">
                  {p.name}
                </p>
                <p className="px-1 pb-1 text-sm font-bold text-[var(--color-accent-blue)] md:text-[15px]">
                  {p.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="bg-[var(--color-bg-black)]">
        <div
          className={`${SHELL} flex flex-col items-center justify-center gap-5 py-24 text-center md:gap-6 lg:h-[400px] lg:py-0`}
        >
          <div className="h-[3px] w-14 rounded-full bg-[var(--color-accent-blue)]" />
          <h2 className="font-display max-w-[820px] text-3xl font-bold italic text-[var(--color-off-white)] sm:text-4xl lg:text-5xl">
            La elegancia no pasa de moda.
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] md:text-base">
            No seguimos tendencias. Creamos piezas que las trascienden.
          </p>
        </div>
      </section>

      {/* Editorial */}
      <section className={`${SHELL} flex flex-col items-center gap-10 py-16 xl:flex-row xl:gap-16 xl:py-24`}>
        <div className="w-full rounded-[2rem] bg-black/[0.05] p-2 xl:flex-1 xl:rounded-[2.5rem] xl:p-2.5">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] xl:aspect-[716/500] xl:rounded-[2rem]">
            <Image
              src="/images/43JBA.jpeg"
              alt="Nueva temporada Leonardo Porto"
              fill
              sizes="(max-width: 1279px) 100vw, 740px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-5 text-center xl:w-[480px] xl:shrink-0 xl:items-start xl:text-left">
          <Eyebrow>NUEVA COLECCIÓN</Eyebrow>
          <h2 className="font-display text-4xl font-bold leading-[1.05] text-[var(--color-bg-black)] lg:text-5xl">
            Nueva
            <br />
            temporada
          </h2>
          <p className="max-w-[420px] text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-base">
            Cortes precisos y telas naturales, pensados para acompañar cada
            temporada sin perder vigencia.
          </p>
          <PillButton href="#" variant="dark">
            Descubrir colección
          </PillButton>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[var(--color-bg-navy)]">
        <div
          className={`${SHELL} flex flex-col items-center justify-center gap-5 py-16 text-center md:gap-6 lg:py-20`}
        >
          <h2 className="font-display text-2xl font-bold text-[var(--color-off-white)] sm:text-3xl">
            Uníte al círculo Leonardo Porto
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] md:text-[15px]">
            Enterate primero de nuevas colecciones y eventos exclusivos.
          </p>
          <form className="flex w-full max-w-[440px] flex-col items-stretch gap-2 rounded-[1.75rem] bg-white/[0.05] p-1.5 sm:flex-row sm:items-center sm:rounded-full">
            <input
              type="email"
              placeholder="Tu email"
              className="h-12 w-full bg-transparent px-5 text-sm text-[var(--color-off-white)] placeholder:text-[var(--color-text-muted)] focus:outline-none sm:flex-1"
            />
            <button className="h-12 shrink-0 rounded-full bg-[var(--color-accent-blue)] px-7 text-[13px] font-bold whitespace-nowrap text-white">
              Suscribirme
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
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
    </main>
  );
}

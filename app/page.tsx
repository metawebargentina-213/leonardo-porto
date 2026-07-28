import Image from "next/image";

const navLinks = [
  { label: "Novedades", accent: false },
  { label: "Hombre", accent: false },
  { label: "Accesorios", accent: false },
  { label: "Rebajas", accent: true },
];

const categories = [
  { label: "Hombre", image: "/images/EcQ0E.jpeg" },
  { label: "Abrigos", image: "/images/o4iKs.jpeg" },
  { label: "Accesorios", image: "/images/b25Nk.jpeg" },
];

const products = [
  { name: "Trench coat clásico", price: "$189.999", image: "/images/enPlO.jpeg" },
  { name: "Mocasín de cuero", price: "$149.999", image: "/images/EOQC8.jpeg" },
  { name: "Blazer de lana a medida", price: "$99.999", image: "/images/FPWwb.jpeg" },
  { name: "Sweater de lana merino", price: "$114.999", image: "/images/7l4gK.jpeg" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-off-white)]">
      {/* Header */}
      <header className="flex items-center justify-between bg-[var(--color-bg-black)] px-16 py-6">
        <span className="font-display text-2xl font-bold tracking-wide text-[var(--color-off-white)]">
          Leonardo Porto
        </span>
        <nav className="flex items-center gap-10">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`text-[13px] font-semibold tracking-wide uppercase ${
                item.accent ? "text-[var(--color-accent-blue)]" : "text-[var(--color-off-white)]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-6 text-[var(--color-off-white)]">
          <button aria-label="Buscar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="11" cy="11" r="7.5" />
              <line x1="21" y1="21" x2="16.2" y2="16.2" />
            </svg>
          </button>
          <button aria-label="Carrito">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M6.5 8.5h11l1 12.5h-13z" />
              <path d="M9 8.5v-2a3 3 0 0 1 6 0v2" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex h-[760px] bg-[var(--color-bg-black)]">
        <div className="flex w-full max-w-[720px] flex-col justify-center gap-6 px-16">
          <span className="w-fit border border-[var(--color-accent-blue)] px-4 py-2 text-xs font-semibold tracking-[0.2em] text-[var(--color-accent-blue)]">
            COLECCIÓN 2026
          </span>
          <h1 className="font-display max-w-[640px] text-7xl font-bold leading-[0.95] text-[var(--color-off-white)]">
            Elegancia
            <br />
            sin tiempo
          </h1>
          <p className="max-w-[480px] text-[17px] leading-relaxed text-[var(--color-text-muted)]">
            Prendas cortadas a medida, en materiales nobles, pensadas para durar más
            que una temporada.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="bg-[var(--color-accent-blue)] px-9 py-[18px] text-sm font-bold tracking-wide text-white"
            >
              COMPRAR AHORA
            </a>
            <a
              href="#"
              className="text-sm font-bold tracking-wide text-[var(--color-off-white)]"
            >
              VER LOOKBOOK →
            </a>
          </div>
        </div>
        <div className="relative h-full w-[640px] shrink-0">
          <Image src="/images/uDf7j.jpeg" alt="Colección Leonardo Porto" fill className="object-cover" priority />
        </div>
      </section>

      {/* Categorías */}
      <section className="flex flex-col gap-10 px-16 py-20">
        <h2 className="font-display text-4xl font-bold text-[var(--color-bg-black)]">
          Comprá por categoría
        </h2>
        <div className="flex gap-6">
          {categories.map((cat) => (
            <div key={cat.label} className="relative h-[480px] w-full overflow-hidden">
              <Image src={cat.image} alt={cat.label} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0ADD] to-transparent" />
              <span className="font-display absolute bottom-6 left-6 text-2xl font-semibold text-[var(--color-off-white)]">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Más vendidos */}
      <section className="flex flex-col gap-10 bg-[var(--color-bg-navy)] px-16 py-20">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-accent-blue)]">
              TOP DE LA SEMANA
            </span>
            <h2 className="font-display text-4xl font-bold text-[var(--color-off-white)]">
              Más vendidos
            </h2>
          </div>
          <a href="#" className="text-sm font-bold tracking-wide text-[var(--color-off-white)]">
            VER TODO →
          </a>
        </div>
        <div className="flex gap-6">
          {products.map((p) => (
            <div key={p.name} className="flex w-full flex-col gap-3">
              <div className="relative h-[320px] w-full bg-[var(--color-off-white)]">
                <Image src={p.image} alt={p.name} fill className="object-cover" />
              </div>
              <p className="text-sm font-semibold text-[var(--color-off-white)]">{p.name}</p>
              <p className="text-[15px] font-bold text-[var(--color-accent-blue)]">{p.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Statement */}
      <section className="flex h-[420px] flex-col items-center justify-center gap-6 bg-[var(--color-bg-black)] px-16">
        <div className="h-1 w-16 bg-[var(--color-accent-blue)]" />
        <h2 className="font-display max-w-[900px] text-center text-5xl font-bold italic text-[var(--color-off-white)]">
          La elegancia no pasa de moda.
        </h2>
        <p className="text-base text-[var(--color-text-muted)]">
          No seguimos tendencias. Creamos piezas que las trascienden.
        </p>
      </section>

      {/* Editorial */}
      <section className="flex h-[560px] bg-[var(--color-off-white)]">
        <div className="relative h-full w-full">
          <Image src="/images/6UVVY.jpeg" alt="Nueva temporada Leonardo Porto" fill className="object-cover" />
        </div>
        <div className="flex w-[560px] shrink-0 flex-col justify-center gap-5 px-16">
          <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-accent-blue)]">
            NUEVA COLECCIÓN
          </span>
          <h2 className="font-display max-w-[420px] text-5xl font-bold leading-[1.05] text-[var(--color-bg-black)]">
            Nueva
            <br />
            temporada
          </h2>
          <p className="max-w-[420px] text-base leading-relaxed text-[#4B5563]">
            Cortes precisos y telas naturales, pensados para acompañar cada
            temporada sin perder vigencia.
          </p>
          <a
            href="#"
            className="w-fit bg-[var(--color-bg-black)] px-9 py-[18px] text-sm font-bold tracking-wide text-[var(--color-off-white)]"
          >
            DESCUBRIR COLECCIÓN
          </a>
        </div>
      </section>

      {/* Newsletter */}
      <section className="flex flex-col items-center justify-center gap-5 bg-[var(--color-bg-navy)] px-16 py-16">
        <h2 className="font-display text-3xl font-bold text-[var(--color-off-white)]">
          Uníte al círculo Leonardo Porto
        </h2>
        <p className="text-[15px] text-[var(--color-text-muted)]">
          Enterate primero de nuevas colecciones y eventos exclusivos.
        </p>
        <form className="flex gap-3">
          <input
            type="email"
            placeholder="Tu email"
            className="h-[52px] w-[360px] border border-[var(--color-line)] bg-transparent px-5 text-sm text-[var(--color-off-white)] placeholder:text-[var(--color-text-muted)]"
          />
          <button className="h-[52px] bg-[var(--color-accent-blue)] px-8 text-[13px] font-bold tracking-wide text-white">
            SUSCRIBIRME
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-12 bg-[var(--color-bg-black)] px-16 pt-16 pb-8">
        <div className="flex justify-between">
          <div className="flex w-80 flex-col gap-4">
            <span className="font-display text-xl font-bold text-[var(--color-off-white)]">
              Leonardo Porto
            </span>
            <p className="max-w-[280px] text-sm leading-relaxed text-[var(--color-text-muted)]">
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
            <div className="flex gap-4 text-[var(--color-off-white)]">
              <span>IG</span>
              <span>YT</span>
              <span>X</span>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-[var(--color-line)]" />
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

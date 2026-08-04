import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// TODO: actualizar cuando se conecte el dominio propio (leonardoporto.com en Donweb).
const SITE_URL = "https://leonardo-porto.pages.dev";
const DESCRIPCION =
  "Indumentaria atemporal para hombre, hecha con materiales nobles y atención al detalle.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Leonardo Porto — Indumentaria masculina a medida",
    template: "%s | Leonardo Porto",
  },
  description: DESCRIPCION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Leonardo Porto",
    title: "Leonardo Porto — Indumentaria masculina a medida",
    description: DESCRIPCION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Leonardo Porto — Indumentaria masculina a medida",
    description: DESCRIPCION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizacionJsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "Leonardo Porto",
  description: DESCRIPCION,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.jpg`,
  logo: `${SITE_URL}/icon.jpg`,
  sameAs: [
    "https://www.instagram.com/leonardoporto_okk/",
    "https://www.facebook.com/profile.php?id=61558631401665",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizacionJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={`${playfair.variable} ${plusJakarta.variable} h-full font-body`}>
        {children}
      </body>
    </html>
  );
}

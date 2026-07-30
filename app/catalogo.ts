export type Color = { nombre: string; hex: string };

export type Producto = {
  id: string;
  slug: string;
  nombre: string;
  // null = "Consultar por WhatsApp", sin precio fijo publicado.
  precio: number | null;
  categoria: string;
  imagen: string;
  descripcion: string;
  talles: string[];
  colores: Color[];
};

// Reemplazar por el número real de la tienda, en formato internacional sin signos: 549XXXXXXXXXX
export const WHATSAPP_NUMERO = "";

export const CATEGORIAS = ["Abrigos", "Sastrería", "Prendas", "Accesorios"] as const;

export const catalogoInicial: Producto[] = [
  {
    id: "trench-clasico",
    slug: "trench-coat-clasico",
    nombre: "Trench coat clásico",
    precio: 189999,
    categoria: "Abrigos",
    imagen: "/images/D2Y3h.jpeg",
    descripcion:
      "Gabardina de algodón con forro interior, cinturón y doble botonadura. Un abrigo que resuelve el entretiempo sin esfuerzo y acompaña tanto un traje como un jean.",
    talles: ["S", "M", "L", "XL"],
    colores: [
      { nombre: "Beige", hex: "#C8B393" },
      { nombre: "Negro", hex: "#1A1A1A" },
    ],
  },
  {
    id: "tapado-camel",
    slug: "tapado-de-lana-camel",
    nombre: "Tapado de lana camel",
    precio: 224999,
    categoria: "Abrigos",
    imagen: "/images/xczFv.jpeg",
    descripcion:
      "Tapado largo en paño de lana, con caída estructurada y solapa de muesca. La pieza más versátil del guardarropa de invierno.",
    talles: ["S", "M", "L", "XL"],
    colores: [
      { nombre: "Camel", hex: "#B08D57" },
      { nombre: "Gris topo", hex: "#6E6A63" },
    ],
  },
  {
    id: "blazer-lana",
    slug: "blazer-de-lana-a-medida",
    nombre: "Blazer de lana a medida",
    precio: 99999,
    categoria: "Sastrería",
    imagen: "/images/0fffc.jpeg",
    descripcion:
      "Blazer de lana fría con corte entallado y hombro natural. Se ajusta a medida en el taller antes de la entrega.",
    talles: ["46", "48", "50", "52", "54"],
    colores: [
      { nombre: "Azul noche", hex: "#1E2B45" },
      { nombre: "Gris carbón", hex: "#3A3A3C" },
    ],
  },
  {
    id: "traje-azul",
    slug: "traje-azul-noche",
    nombre: "Traje azul noche",
    precio: 279999,
    categoria: "Sastrería",
    imagen: "/images/4DRhU.jpeg",
    descripcion:
      "Traje de dos piezas en lana Super 120's. Saco de dos botones y pantalón de corte recto, listo para ajustar al cuerpo.",
    talles: ["46", "48", "50", "52", "54"],
    colores: [
      { nombre: "Azul noche", hex: "#1E2B45" },
      { nombre: "Negro", hex: "#1A1A1A" },
    ],
  },
  {
    id: "sweater-merino",
    slug: "sweater-de-lana-merino",
    nombre: "Sweater de lana merino",
    precio: 114999,
    categoria: "Prendas",
    imagen: "/images/HUiet.jpeg",
    descripcion:
      "Tejido de lana merino de hilado fino, con cuello redondo y puños acanalados. Liviano, abrigado y sin picazón.",
    talles: ["S", "M", "L", "XL"],
    colores: [
      { nombre: "Crema", hex: "#E8DFCF" },
      { nombre: "Verde oliva", hex: "#4A5240" },
      { nombre: "Azul marino", hex: "#1E2B45" },
    ],
  },
  {
    id: "mocasin-cuero",
    slug: "mocasin-de-cuero",
    nombre: "Mocasín de cuero",
    precio: 149999,
    categoria: "Accesorios",
    imagen: "/images/WWwDa.jpeg",
    descripcion:
      "Mocasín de cuero vacuno con suela de cuero cosida y plantilla acolchada. Se amolda al pie con el uso.",
    talles: ["39", "40", "41", "42", "43", "44"],
    colores: [
      { nombre: "Marrón", hex: "#6B4429" },
      { nombre: "Negro", hex: "#1A1A1A" },
    ],
  },
  {
    id: "set-cuero",
    slug: "set-de-cuero",
    nombre: "Set de cuero — cinturón y billetera",
    precio: 74999,
    categoria: "Accesorios",
    imagen: "/images/aVVsm.jpeg",
    descripcion:
      "Cinturón de cuero curtido al vegetal con hebilla de bronce macizo, y billetera a juego con ocho compartimentos.",
    talles: ["Único"],
    colores: [
      { nombre: "Marrón", hex: "#6B4429" },
      { nombre: "Negro", hex: "#1A1A1A" },
    ],
  },
];

export function formatearPrecio(precio: number) {
  return `$${precio.toLocaleString("es-AR")}`;
}

// Para mostrar en pantalla: precio real o "Consultar precio" si no tiene.
export function textoPrecio(precio: number | null) {
  return precio === null ? "Consultar precio" : formatearPrecio(precio);
}

export function generarSlug(nombre: string) {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function armarLinkWhatsapp(producto: Producto, talle?: string, color?: string) {
  const detalle = [
    `Hola! Me interesa el ${producto.nombre}`,
    talle ? `Talle: ${talle}` : null,
    color ? `Color: ${color}` : null,
    producto.precio !== null ? `Precio: ${formatearPrecio(producto.precio)}` : "Quisiera consultar el precio.",
  ]
    .filter(Boolean)
    .join("\n");

  const texto = encodeURIComponent(detalle);
  return WHATSAPP_NUMERO
    ? `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`
    : `https://wa.me/?text=${texto}`;
}

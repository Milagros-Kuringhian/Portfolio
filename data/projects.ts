import type { LocalizedString } from "@/data/profile";

export type Project = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  image: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** External file / Drive download (e.g. WordPress export zip). */
  downloadUrl?: string;
  /** How the preview image is framed in the card. Defaults to `"window"`. */
  preview?: "window" | "phone";
  status?: "in-progress";
};

export const projects: Project[] = [
  {
    id: "app-peliculas",
    title: {
      es: "App Películas",
      en: "Movies App",
    },
    description: {
      es: "Aplicación para explorar películas, construida con Vue.",
      en: "Application to browse movies, built with Vue.",
    },
    image: "/images/app-peliculas.png",
    tech: ["Vue", "JavaScript", "CSS", "Vite"],
    liveUrl: "https://app-peliculas-sage.vercel.app",
    githubUrl: "https://github.com/Milagros-Kuringhian/App-Peliculas",
  },
  {
    id: "landing-resina",
    title: {
      es: "Landing Resina",
      en: "Resin Landing",
    },
    description: {
      es: "Catálogo web de artesanías en resina, con pedidos por WhatsApp.",
      en: "Web catalog for resin crafts, with WhatsApp ordering.",
    },
    image: "/images/landing-resina.png",
    tech: ["Astro", "Vue", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://resina-x-chechi.vercel.app",
    githubUrl: "https://github.com/Milagros-Kuringhian/Resina-x-Chechi",
    status: "in-progress",
  },
  {
    id: "gestor-de-gastos",
    title: {
      es: "Gestor de Gastos",
      en: "Expense Tracker",
    },
    description: {
      es: "PWA instalable para anotar ingresos, gastos y ahorros en 2 toques. Datos en el celular, con export CSV.",
      en: "Installable PWA to log income, expenses, and savings in 2 taps. Data stays on the phone, with CSV export.",
    },
    image: "/images/gestor-gastos-preview.png",
    tech: ["PWA", "HTML", "CSS", "JavaScript"],
    liveUrl: "https://milagros-kuringhian.github.io/Gestor-de-Gastos/",
    githubUrl: "https://github.com/Milagros-Kuringhian/Gestor-de-Gastos",
  },
  {
    id: "tienda-mate",
    title: {
      es: "Tienda Mate",
      en: "Mate Store",
    },
    description: {
      es: "Tienda online de mates y accesorios, armada con WordPress, WooCommerce y Elementor.",
      en: "Online store for mate gourds and accessories, built with WordPress, WooCommerce, and Elementor.",
    },
    image: "/images/tienda-mate.png",
    tech: ["WordPress", "WooCommerce", "Elementor", "Blocksy"],
    downloadUrl:
      "https://drive.google.com/file/d/1S-5nqfrA_hLPaTakDlGLbvB3tgAIWrBl/view?usp=drive_link",
  },
];

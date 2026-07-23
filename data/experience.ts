import type { LocalizedString } from "@/data/profile";

export type Experience = {
  id: string;
  role: LocalizedString;
  company: string;
  period: LocalizedString;
  highlights: {
    es: string[];
    en: string[];
  };
};

export const experiences: Experience[] = [
  {
    id: "casa-okis",
    role: {
      es: "Asistente comercial y de e-commerce",
      en: "Commercial & E-commerce Assistant",
    },
    company: "Casa Okis",
    period: {
      es: "2024 — Actualidad",
      en: "2024 — Present",
    },
    highlights: {
      es: [
        "Gestión y actualización de productos en Mercado Libre, Tiendanube y sitio web.",
        "Control de stock, facturación y tareas administrativas.",
        "Atención al cliente y apoyo operativo general del negocio.",
      ],
      en: [
        "Managed and updated products on Mercado Libre, Tiendanube, and the website.",
        "Handled stock control, invoicing, and administrative tasks.",
        "Provided customer support and day-to-day operational help.",
      ],
    },
  },
  {
    id: "delfino-dulce",
    role: {
      es: "Encargada",
      en: "Store Supervisor",
    },
    company: "Pastelería Delfino Dulce",
    period: {
      es: "Abr 2023 — Nov 2023",
      en: "Apr 2023 — Nov 2023",
    },
    highlights: {
      es: [
        "Coordinación del equipo y organización del flujo de trabajo diario.",
        "Supervisión de operación, tiempos y cumplimiento de estándares de servicio.",
        "Atención al cliente y resolución de incidencias en el local.",
      ],
      en: [
        "Coordinated the team and organized daily workflows.",
        "Supervised operations, timing, and service standards.",
        "Handled customer service and on-site issue resolution.",
      ],
    },
  },
];

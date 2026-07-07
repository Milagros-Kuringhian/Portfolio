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
    id: "freelance-frontend",
    role: {
      es: "Desarrollador/a Frontend Freelance",
      en: "Freelance Frontend Developer",
    },
    company: "Proyectos independientes",
    period: {
      es: "2024 — Presente",
      en: "2024 — Present",
    },
    highlights: {
      es: [
        "Desarrollo de landing pages responsive para pequeños negocios.",
        "Implementación de componentes reutilizables con React y Tailwind CSS.",
        "Optimización de rendimiento y accesibilidad básica en cada entrega.",
      ],
      en: [
        "Built responsive landing pages for small businesses.",
        "Implemented reusable components with React and Tailwind CSS.",
        "Improved performance and basic accessibility in every delivery.",
      ],
    },
  },
  {
    id: "bootcamp-projects",
    role: {
      es: "Estudiante de Bootcamp",
      en: "Bootcamp Student",
    },
    company: "Academia de Desarrollo Web",
    period: {
      es: "2023 — 2024",
      en: "2023 — 2024",
    },
    highlights: {
      es: [
        "Completé proyectos prácticos con HTML, CSS, JavaScript y React.",
        "Trabajé en equipo usando Git y metodologías ágiles.",
        "Presenté un proyecto final con enfoque en UX y diseño responsive.",
      ],
      en: [
        "Completed hands-on projects with HTML, CSS, JavaScript, and React.",
        "Collaborated in teams using Git and agile methodologies.",
        "Presented a final project focused on UX and responsive design.",
      ],
    },
  },
];

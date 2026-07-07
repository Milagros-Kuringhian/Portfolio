import type { LocalizedString } from "@/data/profile";

export type Project = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  image: string;
  tech: string[];
  liveUrl?: string;
  githubUrl: string;
};

export const projects: Project[] = [
  {
    id: "weather-app",
    title: {
      es: "App del Clima",
      en: "Weather App",
    },
    description: {
      es: "Aplicación para consultar el clima en tiempo real con búsqueda por ciudad y diseño responsive.",
      en: "Real-time weather application with city search and a responsive layout.",
    },
    image: "/images/project-weather-app.svg",
    tech: ["HTML", "CSS", "JavaScript", "API"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "task-manager",
    title: {
      es: "Gestor de Tareas",
      en: "Task Manager",
    },
    description: {
      es: "Herramienta para organizar tareas con filtros, estados y persistencia en el navegador.",
      en: "Task organization tool with filters, statuses, and browser persistence.",
    },
    image: "/images/project-task-manager.svg",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com",
  },
  {
    id: "portfolio-v1",
    title: {
      es: "Portfolio v1",
      en: "Portfolio v1",
    },
    description: {
      es: "Primera versión de mi portfolio personal con secciones de proyectos, contacto y modo oscuro.",
      en: "First version of my personal portfolio with projects, contact, and dark mode.",
    },
    image: "/images/project-portfolio.svg",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
];

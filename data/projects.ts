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
    id: "app-peliculas",
    title: {
      es: "App Películas",
      en: "Movies App",
    },
    description: {
      es: "Aplicación para explorar películas, construida con Vue y Vite.",
      en: "Application to browse movies, built with Vue and Vite.",
    },
    image: "/images/app-peliculas.png",
    tech: ["Vue", "JavaScript", "CSS", "Vite"],
    githubUrl: "https://github.com/Milagros-Kuringhian/App-Peliculas",
  },
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
      es: "Portfolio Personal",
      en: "Personal Portfolio",
    },
    description: {
      es: "Este sitio: portfolio bilingüe con modo claro/oscuro, animaciones sutiles y contenido editable desde data/.",
      en: "This site: bilingual portfolio with light/dark mode, subtle animations, and content editable from data/.",
    },
    image: "/images/project-portfolio.svg",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com",
  },
];

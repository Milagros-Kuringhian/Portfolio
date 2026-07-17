import type { Locale } from "@/i18n";

export type LocalizedString = {
  es: string;
  en: string;
};

export type ProfileValue = {
  id: string;
  label: LocalizedString;
  description: LocalizedString;
  tone: "primary" | "secondary" | "accent";
};

export type Profile = {
  name: string;
  firstName: string;
  title: LocalizedString;
  tagline: LocalizedString;
  bio: LocalizedString;
  availability: LocalizedString;
  image: string;
  email: string;
  github: string;
  linkedin: string;
  values: ProfileValue[];
};

export const profile: Profile = {
  name: "Portfolio",
  firstName: "Milagros",
  title: {
    es: "Desarrolladora Frontend",
    en: "Frontend Developer",
  },
  tagline: {
    es: "Creo experiencias web cálidas, accesibles y con atención al detalle.",
    en: "I build warm, accessible web experiences with attention to detail.",
  },
  bio: {
    es: "Soy desarrollador/a frontend apasionado/a por crear interfaces claras y agradables. Me gusta transformar ideas en productos digitales que se sientan humanos. Busco seguir creciendo en equipos que valoren el diseño, la calidad y el aprendizaje continuo.",
    en: "I'm a frontend developer passionate about building clear and delightful interfaces. I enjoy turning ideas into digital products that feel human. I'm looking to keep growing in teams that value design, quality, and continuous learning.",
  },
  availability: {
    es: "Disponible para proyectos freelance y oportunidades de empleo remoto.",
    en: "Available for freelance projects and remote job opportunities.",
  },
  image: "/images/avatar-removebg.png",
  email: "milikuri2003@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  values: [
    {
      id: "empathy",
      label: { es: "Empatía", en: "Empathy" },
      description: {
        es: "Diseño pensando en las personas que van a usar cada interfaz.",
        en: "I design with the people who will use each interface in mind.",
      },
      tone: "primary",
    },
    {
      id: "creativity",
      label: { es: "Creatividad", en: "Creativity" },
      description: {
        es: "Busco soluciones visuales claras sin perder funcionalidad.",
        en: "I look for clear visual solutions without losing functionality.",
      },
      tone: "secondary",
    },
    {
      id: "commitment",
      label: { es: "Compromiso", en: "Commitment" },
      description: {
        es: "Me involucro en cada proyecto con responsabilidad y detalle.",
        en: "I get involved in every project with responsibility and care.",
      },
      tone: "accent",
    },
  ],
};

export function getProfileField<T extends keyof Profile>(
  field: T,
  locale: Locale,
): Profile[T] extends LocalizedString ? string : Profile[T] {
  const value = profile[field];
  if (typeof value === "object" && value !== null && "es" in value && "en" in value) {
    return value[locale] as Profile[T] extends LocalizedString ? string : Profile[T];
  }
  return value as Profile[T] extends LocalizedString ? string : Profile[T];
}

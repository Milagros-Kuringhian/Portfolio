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
  name: "Milagros Sol Kuringhian",
  firstName: "Milagros",
  title: {
    es: "Desarrolladora Frontend",
    en: "Frontend Developer",
  },
  tagline: {
    es: "Interfaces claras, e-commerce y soporte digital con atención al detalle.",
    en: "Clear interfaces, e-commerce, and digital support with attention to detail.",
  },
  bio: {
    es: "Estudiante de Programación y Diseño Web en Escuela Da Vinci, con experiencia en gestión comercial y administración de e-commerce. Me interesa desarrollarme en puestos junior de frontend, e-commerce o soporte digital, combinando lo que aprendo en código con lo que ya vivo en operación digital.",
    en: "I'm a Web Programming and Design student at Escuela Da Vinci, with experience in commercial management and e-commerce administration. I'm looking for junior roles in frontend, e-commerce, or digital support—combining what I learn in code with hands-on digital operations.",
  },
  availability: {
    es: "Disponible para oportunidades junior y proyectos freelance.",
    en: "Available for junior opportunities and freelance projects.",
  },
  image: "/images/avatar-lilac.png",
  email: "milikuri2003@gmail.com",
  github: "https://github.com/Milagros-Kuringhian",
  linkedin: "",
  values: [
    {
      id: "empathy",
      label: { es: "Empatía", en: "Empathy" },
      description: {
        es: "Diseño y atiendo pensando en las personas que usan cada producto.",
        en: "I design and support with the people who use each product in mind.",
      },
      tone: "primary",
    },
    {
      id: "teamwork",
      label: { es: "Trabajo en equipo", en: "Teamwork" },
      description: {
        es: "Me adapto, comunico con claridad y colaboro para avanzar juntas hacia el objetivo.",
        en: "I adapt, communicate clearly, and collaborate to move forward together toward the goal.",
      },
      tone: "secondary",
    },
    {
      id: "commitment",
      label: { es: "Compromiso", en: "Commitment" },
      description: {
        es: "Organización, responsabilidad y detalle en cada tarea.",
        en: "Organization, responsibility, and care in every task.",
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

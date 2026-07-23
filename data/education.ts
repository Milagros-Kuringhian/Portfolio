import type { LocalizedString } from "@/data/profile";

export type Education = {
  id: string;
  institution: string;
  degree: LocalizedString;
  period: LocalizedString;
};

export const education: Education[] = [
  {
    id: "davinci",
    institution: "Escuela Da Vinci",
    degree: {
      es: "Programación y Diseño Web",
      en: "Web Programming and Design",
    },
    period: {
      es: "En curso",
      en: "In progress",
    },
  },
  {
    id: "marie-manoogian",
    institution: "Instituto Marie Manoogian",
    degree: {
      es: "Bachiller en Economía y Administración",
      en: "High School Diploma in Economics and Administration",
    },
    period: {
      es: "Finalizado",
      en: "Completed",
    },
  },
];

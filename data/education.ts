import type { LocalizedString } from "@/data/profile";

export type Education = {
  id: string;
  institution: string;
  degree: LocalizedString;
  period: string;
};

export const education: Education[] = [
  {
    id: "web-dev-bootcamp",
    institution: "Academia de Desarrollo Web",
    degree: {
      es: "Bootcamp de Desarrollo Web Full Stack",
      en: "Full Stack Web Development Bootcamp",
    },
    period: "2023 — 2024",
  },
];

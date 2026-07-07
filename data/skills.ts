import type { LocalizedString } from "@/data/profile";

export type SkillCategory = {
  id: string;
  label: LocalizedString;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: {
      es: "Frontend",
      en: "Frontend",
    },
    skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
  },
  {
    id: "tools",
    label: {
      es: "Herramientas",
      en: "Tools",
    },
    skills: ["Git", "Figma", "VS Code"],
  },
  {
    id: "learning",
    label: {
      es: "Aprendiendo",
      en: "Learning",
    },
    skills: ["Next.js", "Tailwind CSS"],
  },
];

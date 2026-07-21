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
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    id: "tools",
    label: {
      es: "Herramientas",
      en: "Tools",
    },
    skills: ["Tailwind CSS", "Git", "Figma", "VS Code", "WordPress", "Elementor"],
  },
];

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
    skills: ["HTML", "CSS", "JavaScript", "Vue", "TypeScript", "React", "Next.js"],
  },
  {
    id: "cms-ecommerce",
    label: {
      es: "CMS / E-commerce",
      en: "CMS / E-commerce",
    },
    skills: ["WordPress", "Elementor", "WooCommerce", "Tiendanube"],
  },
  {
    id: "design",
    label: {
      es: "Diseño",
      en: "Design",
    },
    skills: ["Figma", "Illustrator", "Photoshop"],
  },
];

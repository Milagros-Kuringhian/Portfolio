import { Code2, FlaskConical, Palette, ShoppingBag } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiCss,
  SiElementor,
  SiFigma,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
  SiWordpress,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const skillIconMap: Record<string, IconType> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  Vue: SiVuedotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  Git: SiGit,
  Figma: SiFigma,
  "VS Code": VscVscode,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  Testing: FlaskConical,
  "Framer Motion": Code2,
  WordPress: SiWordpress,
  Elementor: SiElementor,
  WooCommerce: ShoppingBag,
  Tiendanube: ShoppingBag,
  Illustrator: Palette,
  Photoshop: Palette,
};

export function getSkillIcon(skill: string): IconType {
  return skillIconMap[skill] ?? Code2;
}

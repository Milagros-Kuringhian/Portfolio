import { getSkillIcon } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

interface SkillChipsProps {
  skills: string[];
  accent?: "primary" | "secondary" | "accent";
}

const accentIconClass: Record<
  NonNullable<SkillChipsProps["accent"]>,
  string
> = {
  primary: "text-foreground",
  secondary: "text-secondary",
  accent: "text-accent",
};

export function SkillChips({ skills, accent = "primary" }: SkillChipsProps) {
  return (
    <ul className="flex flex-wrap justify-center gap-3">
      {skills.map((skill) => {
        const Icon = getSkillIcon(skill);

        return (
          <li
            key={skill}
            className="flex items-center gap-2 rounded-full bg-card px-3.5 py-2 shadow-[0_2px_10px_-4px_rgba(var(--shadow-primary),0.12)]"
          >
            <Icon className={cn("size-4", accentIconClass[accent])} aria-hidden />
            <span className="text-sm font-medium text-foreground">{skill}</span>
          </li>
        );
      })}
    </ul>
  );
}

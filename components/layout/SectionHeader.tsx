import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-3", className)}>
      <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-base text-muted-foreground sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}

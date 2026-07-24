import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-3", className)}>
      <h2 className="font-heading text-3xl tracking-[0.015em] text-foreground uppercase sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-base text-muted-foreground sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}

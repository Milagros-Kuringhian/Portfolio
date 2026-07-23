import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  action?: React.ReactNode;
}

export function SectionTitle({
  title,
  subtitle,
  className,
  action,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="flex max-w-2xl flex-col gap-2">
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          <span className="h-0.5 w-10 rounded-full bg-accent" aria-hidden />
        </div>
        {subtitle ? (
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

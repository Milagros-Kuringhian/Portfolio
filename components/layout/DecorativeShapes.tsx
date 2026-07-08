import { cn } from "@/lib/utils";

interface DecorativeShapesProps {
  className?: string;
}

export function DotGrid({ className }: DecorativeShapesProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 80 80"
      className={cn("text-border/80", className)}
    >
      {Array.from({ length: 64 }).map((_, index) => {
        const row = Math.floor(index / 8);
        const col = index % 8;

        return (
          <circle
            key={index}
            cx={col * 10 + 5}
            cy={row * 10 + 5}
            r="1.5"
            fill="currentColor"
          />
        );
      })}
    </svg>
  );
}

export function PageBlobs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-32 top-32 size-[28rem] rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -right-24 top-[55%] size-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-20 left-1/4 size-64 rounded-full bg-accent/10 blur-3xl" />
    </div>
  );
}

export function HeroDecorations() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -right-4 top-8 size-16 rotate-12 bg-primary/80 [clip-path:polygon(50%_0%,0%_100%,100%_100%)]" />
      <div className="absolute right-16 top-24 size-10 rounded-full bg-accent/80" />
      <DotGrid className="absolute right-0 top-1/2 size-20 opacity-60" />
      <div className="absolute -left-6 bottom-12 size-24 rounded-full bg-secondary/25 blur-sm" />
    </div>
  );
}

export function ContactPlant() {
  return (
    <div aria-hidden className="relative size-32 md:size-36">
      <DotGrid className="absolute right-0 top-0 size-16 opacity-50" />
      <div className="absolute bottom-0 left-1/2 h-20 w-24 -translate-x-1/2 rounded-[3rem] bg-primary/20" />
      <div className="absolute bottom-16 left-1/2 size-16 -translate-x-1/2 rounded-full bg-secondary/30" />
      <div className="absolute bottom-3 left-1/2 h-4 w-16 -translate-x-1/2 rounded-lg bg-accent/40" />
      <div className="absolute bottom-14 left-1/2 h-10 w-1 -translate-x-1/2 bg-primary/50" />
      <div className="absolute bottom-20 left-[42%] size-3 rounded-full bg-primary/60" />
      <div className="absolute bottom-24 right-[38%] size-2.5 rounded-full bg-primary/50" />
    </div>
  );
}

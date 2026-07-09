import { cn } from "@/lib/utils";

interface DecorativeShapesProps {
  className?: string;
}

export function DotGrid({ className }: DecorativeShapesProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 80 80"
      className={cn("text-muted-foreground/30", className)}
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
      <div className="absolute -left-28 top-12 size-72 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -right-20 top-[32%] size-64 rounded-full bg-[var(--soft-sky)]/25 blur-3xl" />
      <div className="absolute top-[58%] -left-12 size-52 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute bottom-20 right-[20%] size-56 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute top-[78%] left-[55%] size-40 rounded-full bg-secondary/15 blur-2xl" />
    </div>
  );
}

export function CoralWave({ className }: DecorativeShapesProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 24"
      fill="none"
      className={cn("text-accent", className)}
    >
      <path
        d="M2 14C18 6 34 20 50 12C66 4 82 18 98 10C106 6 112 8 118 6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TealDots({ className }: DecorativeShapesProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 80"
      className={cn("text-primary/55", className)}
    >
      {[
        [8, 8],
        [24, 16],
        [40, 6],
        [12, 32],
        [32, 40],
        [20, 56],
        [36, 64],
        [8, 72],
      ].map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r="2.5" fill="currentColor" />
      ))}
    </svg>
  );
}

export function HeroDecorations() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <TealDots className="absolute right-2 top-[18%] size-10 opacity-80 sm:right-4 sm:size-12 md:right-6 md:top-[22%] md:size-14" />
      <div className="absolute -left-6 bottom-16 size-20 rounded-full bg-[var(--soft-sky)]/35 blur-sm max-sm:hidden" />
      <div className="absolute right-[38%] top-4 size-2.5 rounded-full bg-accent/60 max-md:hidden" />
      <div className="absolute left-[12%] top-6 size-2 rounded-full bg-primary/50" />
      <div className="absolute bottom-8 right-[28%] size-3 rounded-full bg-primary/40 max-sm:hidden" />
    </div>
  );
}

export function AboutDecorations() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-16 top-1/3 size-40 rounded-full bg-secondary/22 blur-2xl max-md:hidden" />
      <div className="absolute -right-6 bottom-4 size-28 rounded-[50%_50%_45%_55%] bg-[var(--soft-sky)]/28 max-sm:hidden" />
      <DotGrid className="absolute right-2 top-4 size-14 opacity-55 max-md:hidden" />
      <div className="absolute left-[30%] top-1 size-2 rounded-full bg-accent/45" />
      <div className="absolute right-[35%] bottom-2 size-0 border-x-[8px] border-b-[14px] border-x-transparent border-b-primary/20 max-sm:hidden" />
    </div>
  );
}

export function ProjectsDecorations() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-12 top-8 size-36 rounded-full bg-primary/12 blur-2xl" />
      <div className="absolute -left-8 bottom-10 size-20 rounded-full bg-accent/18 max-sm:hidden" />
      <DotGrid className="absolute left-4 bottom-6 size-12 opacity-45 max-md:hidden" />
      <div className="absolute right-1/3 top-2 size-0 border-x-[8px] border-b-[14px] border-x-transparent border-b-secondary/35 max-md:hidden" />
    </div>
  );
}

export function SkillsDecorations() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/15 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--soft-sky)]/18 blur-2xl" />
      <DotGrid className="absolute left-4 top-1/2 size-12 -translate-y-1/2 opacity-50 max-md:hidden" />
      <DotGrid className="absolute right-4 top-1/3 size-12 opacity-50 max-md:hidden" />
      <div className="absolute right-[28%] bottom-4 size-7 rounded-full bg-[var(--soft-sky)]/40 max-sm:hidden" />
    </div>
  );
}

export function ExperienceDecorations() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-10 top-1/4 size-32 rounded-full bg-[var(--soft-sky)]/22 blur-2xl max-md:hidden" />
      <div className="absolute -left-12 bottom-1/3 size-36 rounded-full bg-secondary/18 blur-2xl max-sm:hidden" />
      <div className="absolute right-[18%] bottom-8 size-2.5 rounded-full bg-accent/40 max-sm:hidden" />
    </div>
  );
}

export function EducationDecorations() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-14 top-1/2 size-32 -translate-y-1/2 rounded-full bg-primary/10 blur-2xl max-md:hidden" />
      <DotGrid className="absolute right-6 top-6 size-12 opacity-40 max-md:hidden" />
      <div className="absolute right-[30%] bottom-2 size-6 rounded-full bg-secondary/25 max-sm:hidden" />
    </div>
  );
}

export function ContactPlant() {
  return (
    <div aria-hidden className="relative size-28 md:size-32">
      <DotGrid className="absolute right-0 top-0 size-14 opacity-45" />
      <div className="absolute bottom-0 left-1/2 h-16 w-20 -translate-x-1/2 rounded-[2.5rem] bg-primary/15" />
      <div className="absolute bottom-14 left-1/2 size-14 -translate-x-1/2 rounded-full bg-secondary/25" />
      <div className="absolute bottom-2 left-1/2 h-3.5 w-12 -translate-x-1/2 rounded-lg bg-accent/30" />
      <div className="absolute bottom-12 left-1/2 h-8 w-0.5 -translate-x-1/2 bg-primary/40" />
      <div className="absolute bottom-[3.75rem] left-[38%] size-2.5 rounded-full bg-primary/50" />
      <div className="absolute bottom-[4.5rem] right-[36%] size-2 rounded-full bg-primary/40" />
    </div>
  );
}

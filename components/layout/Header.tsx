"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#about", key: "about" },
  { href: "#projects", key: "projects" },
  { href: "#skills", key: "skills" },
  { href: "#experience", key: "experience" },
  { href: "#education", key: "education" },
  { href: "#contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tA11y = useTranslations("accessibility");
  const [isOpen, setIsOpen] = useState(false);

  const linkClassName =
    "rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <a
          href="#hero"
          aria-label={tA11y("homeLink")}
          className="max-w-[45vw] truncate rounded-md font-heading text-base font-semibold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:max-w-none sm:text-lg"
        >
          {profile.name}
        </a>

        <nav className="hidden items-center gap-4 xl:gap-6 lg:flex" aria-label={t("main")}>
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={linkClassName}
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="size-9 lg:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-label={isOpen ? t("closeMenu") : t("menu")}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <nav
        className={cn(
          "border-t border-border/70 lg:hidden",
          isOpen ? "block" : "hidden",
        )}
        aria-label={t("mobile")}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 md:px-6">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={cn(linkClassName, "px-3 py-2 hover:bg-muted")}
              onClick={() => setIsOpen(false)}
            >
              {t(item.key)}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

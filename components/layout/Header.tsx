"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#hero", key: "home" },
  { href: "#about", key: "about" },
  { href: "#projects", key: "projects" },
  { href: "#skills", key: "skills" },
  { href: "#experience", key: "experience" },
  { href: "#education", key: "education" },
  { href: "#contact", key: "contact" },
] as const;

type NavKey = (typeof navItems)[number]["key"];

export function Header() {
  const t = useTranslations("nav");
  const tA11y = useTranslations("accessibility");
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavKey | null>("home");

  const linkClassName =
    "relative rounded-md px-1 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  function getNavLinkClassName(key: NavKey) {
    return cn(
      linkClassName,
      activeSection === key &&
        "text-secondary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-secondary dark:text-accent dark:after:bg-accent",
    );
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const sectionIds = navItems.map((item) =>
      item.key === "home" ? "hero" : item.key,
    );
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topEntry = visibleEntries[0];
        if (topEntry) {
          const sectionId = topEntry.target.id;
          setActiveSection(sectionId === "hero" ? "home" : (sectionId as NavKey));
        }
      },
      {
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0.1, 0.35, 0.6],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-header-border bg-header backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a
          href="#hero"
          className="font-heading shrink-0 text-xl tracking-[0.02em] text-foreground uppercase transition-colors hover:text-secondary md:text-2xl"
          aria-label={tA11y("homeLink")}
        >
          {profile.firstName}
        </a>

        <nav
          className="hidden flex-1 items-center justify-end gap-5 pr-2 lg:flex xl:gap-7"
          aria-label={t("main")}
        >
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={getNavLinkClassName(item.key)}
              aria-current={activeSection === item.key ? "location" : undefined}
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
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
          "border-t border-header-border lg:hidden",
          isOpen ? "block" : "hidden",
        )}
        aria-label={t("mobile")}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 md:px-6">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={cn(getNavLinkClassName(item.key), "px-3 py-2.5 hover:bg-muted/50")}
              aria-current={activeSection === item.key ? "location" : undefined}
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

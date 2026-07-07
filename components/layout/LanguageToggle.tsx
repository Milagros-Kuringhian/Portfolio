"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const localeLabels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

export function LanguageToggle() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      return;
    }

    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border p-1">
      {(["es", "en"] as const).map((item) => (
        <Button
          key={item}
          variant="ghost"
          size="sm"
          className={cn(
            "h-7 min-w-9 px-2",
            locale === item && "bg-muted text-foreground",
          )}
          onClick={() => switchLocale(item)}
          aria-label={item === "es" ? t("switchToEs") : t("switchToEn")}
          aria-pressed={locale === item}
        >
          {localeLabels[item]}
        </Button>
      ))}
    </div>
  );
}

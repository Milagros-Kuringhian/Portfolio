"use client";

import { Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { ContactPlant } from "@/components/layout/DecorativeShapes";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";
import { SectionReveal } from "@/components/layout/SectionReveal";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export function Contact() {
  const t = useTranslations("contact");
  const tA11y = useTranslations("accessibility");
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <SectionReveal id="contact" className="section-padding-tight-top">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-[color-mix(in_oklch,var(--primary),transparent_88%)] px-6 py-7 sm:px-9 sm:py-9 md:px-11 md:py-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[var(--soft-sky)]/30 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -left-12 size-48 rounded-full bg-secondary/20 blur-2xl"
          />

          <div className="relative grid gap-6 md:grid-cols-[1fr_1.1fr_auto] md:items-center md:gap-8">
            <div className="flex min-w-0 flex-col gap-4">
              <div className="flex flex-col gap-3">
                <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                  {t("title")}
                </h2>
                <span className="h-0.5 w-10 rounded-full bg-primary" aria-hidden />
                <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
                  {t("subtitle")}
                </p>
              </div>

              <Button
                className="h-12 w-full rounded-full px-7 shadow-[0_4px_20px_-4px_rgba(var(--shadow-primary),0.3)] sm:w-auto"
                render={<a href={`mailto:${profile.email}`} />}
              >
                <Mail data-icon="inline-start" />
                {t("formSubmit")}
              </Button>
            </div>

            <div className="flex min-w-0 flex-col gap-5">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("email")}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <a
                      href={`mailto:${profile.email}`}
                      className="break-all text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                    >
                      {profile.email}
                    </a>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={handleCopyEmail}
                      className="text-primary hover:text-primary"
                    >
                      {copied ? t("copied") : t("copyEmail")}
                    </Button>
                    <span aria-live="polite" className="sr-only">
                      {copied ? t("copied") : ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("location")}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {t("locationValue")}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-border/60 bg-background/60"
                  render={
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${t("github")} ${tA11y("opensInNewTab")}`}
                    />
                  }
                >
                  <GitHubIcon className="size-4" data-icon="inline-start" />
                  {t("github")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-border/60 bg-background/60"
                  render={
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${t("linkedin")} ${tA11y("opensInNewTab")}`}
                    />
                  }
                >
                  <LinkedInIcon className="size-4" data-icon="inline-start" />
                  {t("linkedin")}
                </Button>
              </div>
            </div>

            <div className="hidden justify-center md:flex">
              <ContactPlant />
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

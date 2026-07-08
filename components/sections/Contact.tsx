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
    <SectionReveal id="contact" className="py-12 sm:py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-[color-mix(in_oklch,var(--primary),transparent_86%)] p-6 sm:p-8 md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-secondary/20 blur-2xl"
          />

          <div className="relative grid gap-10 md:grid-cols-[1fr_1.1fr_auto] md:items-center md:gap-8">
            <div className="flex min-w-0 flex-col gap-5">
              <div className="flex flex-col gap-3">
                <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                  {t("title")}
                </h2>
                <span className="h-1 w-12 rounded-full bg-primary" aria-hidden />
                <p className="text-base text-muted-foreground sm:text-lg">
                  {t("subtitle")}
                </p>
              </div>

              <Button
                className="h-11 w-full rounded-full px-6 sm:w-auto"
                render={<a href={`mailto:${profile.email}`} />}
              >
                <Mail data-icon="inline-start" />
                {t("formSubmit")}
              </Button>
            </div>

            <div className="flex min-w-0 flex-col gap-5">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Mail className="size-4" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("email")}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
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
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <MapPin className="size-4" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("location")}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {t("locationValue")}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-primary/30 bg-background/80"
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
                  className="rounded-full border-primary/30 bg-background/80"
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

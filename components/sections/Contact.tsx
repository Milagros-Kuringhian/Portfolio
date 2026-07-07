"use client";

import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";
import { SectionHeader } from "@/components/layout/SectionHeader";
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
    <SectionReveal id="contact" className="border-t border-border py-12 sm:py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 md:grid-cols-2 md:gap-16 md:px-6">
        <div className="flex min-w-0 flex-col gap-8">
          <SectionHeader title={t("title")} subtitle={t("subtitle")} />

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t("email")}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={`mailto:${profile.email}`}
                className="break-all rounded-md text-lg font-medium text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {profile.email}
              </a>
              <Button variant="outline" size="sm" onClick={handleCopyEmail}>
                {copied ? t("copied") : t("copyEmail")}
              </Button>
              <span aria-live="polite" className="sr-only">
                {copied ? t("copied") : ""}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t("social")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
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

          <Button
            className="w-full sm:w-auto"
            render={<a href="/cv.pdf" download="cv.pdf" />}
          >
            {t("downloadCv")}
          </Button>
        </div>

        <form
          className="min-w-0 rounded-xl border border-border/70 bg-card/50 p-4 shadow-sm md:rounded-none md:border-0 md:border-l md:border-border md:bg-transparent md:p-0 md:pl-10 md:shadow-none"
          action={`mailto:${profile.email}`}
          method="post"
          encType="text/plain"
        >
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-foreground">{t("formName")}</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                className="w-full rounded-lg border border-input bg-background/80 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-foreground">{t("formEmail")}</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                className="w-full rounded-lg border border-input bg-background/80 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-foreground">
                {t("formMessage")}
              </span>
              <textarea
                name="message"
                rows={5}
                className="w-full resize-y rounded-lg border border-input bg-background/80 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <Button type="submit" className="w-full sm:w-auto">
              <Mail data-icon="inline-start" />
              {t("formSubmit")}
            </Button>
          </div>
        </form>
      </div>
    </SectionReveal>
  );
}

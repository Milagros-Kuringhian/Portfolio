import { getTranslations } from "next-intl/server";

import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";
import { profile } from "@/data/profile";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-center text-sm text-muted-foreground sm:text-left md:flex-row md:px-6">
        <p className="min-w-0">
          © {year} {profile.name}. {t("rights")}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-md transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={t("github")}
          >
            <GitHubIcon className="size-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-md transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={t("linkedin")}
          >
            <LinkedInIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function NotFoundPage() {
  const t = await getTranslations("notFound");

  return (
    <section className="mx-auto flex min-h-[50vh] w-full max-w-6xl flex-col items-center justify-center gap-6 px-4 py-24 text-center md:px-6">
      <p className="font-label text-sm font-semibold uppercase tracking-[0.22em] text-secondary dark:text-accent">
        404
      </p>
      <h1 className="font-heading text-4xl tracking-[0.015em] text-foreground uppercase sm:text-5xl">
        {t("title")}
      </h1>
      <p className="max-w-md text-muted-foreground">{t("description")}</p>
      <Button render={<Link href="/" />}>{t("backHome")}</Button>
    </section>
  );
}

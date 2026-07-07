import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function NotFoundPage() {
  const t = await getTranslations("notFound");

  return (
    <section className="mx-auto flex min-h-[50vh] w-full max-w-6xl flex-col items-center justify-center gap-6 px-4 py-24 text-center md:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
        404
      </p>
      <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
        {t("title")}
      </h1>
      <p className="max-w-md text-muted-foreground">{t("description")}</p>
      <Button render={<Link href="/" />}>{t("backHome")}</Button>
    </section>
  );
}

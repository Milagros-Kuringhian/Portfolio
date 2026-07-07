import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import type { Locale } from "@/i18n";
import { locales } from "@/i18n";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Hero locale={locale} />
      <About locale={locale} />
      <Projects locale={locale} />
      <Skills locale={locale} />
      <Experience locale={locale} />
      <Education locale={locale} />
      <Contact />
    </>
  );
}

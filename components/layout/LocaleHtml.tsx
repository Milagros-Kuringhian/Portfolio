"use client";

import { useEffect } from "react";

interface LocaleHtmlProps {
  locale: string;
}

export function LocaleHtml({ locale }: LocaleHtmlProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}

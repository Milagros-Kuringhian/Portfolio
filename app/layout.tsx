import type { Metadata } from "next";
import { Barlow_Condensed, Bebas_Neue, Inter } from "next/font/google";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  weight: ["600", "700"],
  variable: "--font-label",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} ${bebasNeue.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-background">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

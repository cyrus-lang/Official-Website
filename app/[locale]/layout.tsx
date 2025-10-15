import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import dynamic from "next/dynamic";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cyrus Programming Language",
  description: "A programming language for Aliens.",
};

// dynamically import client wrapper for splash + top loading bar
const ClientAppWrapper = dynamic(
  () => import("@/components/app-loading-wrapper"),
  { ssr: false }
);

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <ToastProvider>
              <Toaster />
              {/* Client-side wrapper handles both splash + top loading bar */}
              <ClientAppWrapper>{children}</ClientAppWrapper>
            </ToastProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

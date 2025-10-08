"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import LogoDark from "@/app/assets/logo-dark.png";
import LogoLight from "@/app/assets/logo-light.png";
import { useTranslations } from "next-intl";

// Logo component
export function Logo() {
  const t = useTranslations("Header.logo");

  return (
    <>
      <Image
        src={LogoDark}
        className="dark:block hidden w-24"
        alt={t("alt")}
      />
      <Image
        src={LogoLight}
        className="dark:hidden block w-24"
        alt={t("altLight")}
      />
    </>
  );
}

// SplashScreen must be a client component
const SplashScreen = dynamic(() => import("./splash-screen"), { ssr: false });

export default function ClientSplashWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SplashScreen logo={<Logo />} duration={2000} fadeOutDuration={500} />
      {children}
    </>
  );
}
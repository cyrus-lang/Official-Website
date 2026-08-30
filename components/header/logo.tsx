import LogoDark from "@/app/assets/logo-dark.png";
import LogoLight from "@/app/assets/logo-light.png";
import Image from "next/image";

export function Logo({
  forceLightMode = false,
  forceDarkMode = false,
}: {
  forceLightMode?: boolean;
  forceDarkMode?: boolean;
}) {
  if (forceDarkMode) {
    return <Image src={LogoDark} className="w-8 h-8" alt="logo-dark" />;
  }

  if (forceLightMode) {
    return <Image src={LogoLight} className="w-8 h-8" alt="logo-light" />;
  }

  return (
    <>
      <Image
        src={LogoDark}
        className="dark:block hidden w-8 h-8"
        alt="logo-dark"
      />
      <Image src={LogoLight} className="dark:hidden block w-8" alt="logo" />
    </>
  );
}

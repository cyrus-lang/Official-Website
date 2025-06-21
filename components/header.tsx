import { Code, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import Image from "next/image";
import LogoDark from "@/app/assets/logo-dark.png";
import LogoLight from "@/app/assets/logo-light.png";

export function Logo() {
  return (
    <>
      <Image
        src={LogoDark}
        className="h-8 w-8 dark:block hidden"
        alt="Cyrus Programming Language Dark Logo"
      />
      <Image
        src={LogoLight}
        className="h-8 w-8 dark:hidden block"
        alt="Cyrus Programming Language Light Logo"
      />
    </>
  )
}

export default function Header() {
  return (
    <>
      <header className="select-none border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-4 flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 pl-1 pr-8">
              <Logo />
              <span className="text-md font-bold">Cyrus</span>
            </Link>

            <nav className="hidden xl:flex gap-6 pt-1">
              <Link
                href="/#examples"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Examples
              </Link>

              <Link
                href="/docs"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Documentation
              </Link>

              <Link
                href="/blog"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Blog
              </Link>

              <Link
                href="/forum"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Forum
              </Link>

              <Link
                href="/packages"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Packages
              </Link>

              <Link
                href="/support_us"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Support Us
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/docs" className="hidden xl:inline-flex">
              <Button variant="outline">Documentation</Button>
            </Link>
            <Link href="/docs" className="hidden xl:inline-flex">
              <Button>Get Started</Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="xl:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full fixed inset-0 ml-auto"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <Link href="/" className="flex items-center gap-2">
                      <Logo />
                      <span className="text-xl font-bold">Cyrus</span>
                    </Link>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetTrigger>
                  </div>

                  <nav className="flex flex-col gap-4">
                    <Link
                      href="/#examples"
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      Examples
                    </Link>

                    <Link
                      href="/docs"
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      Documentation
                    </Link>

                    <Link
                      href="/blog"
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      Blog
                    </Link>

                    <Link
                      href="/forum"
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      Forum
                    </Link>

                    <Link
                      href="/packages"
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      Packages
                    </Link>

                    <Link
                      href="/support_us"
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      Support Us
                    </Link>
                  </nav>
                  <div className="mt-auto flex flex-col gap-2">
                    <Link href="/docs" className="w-full">
                      <Button className="w-full">Get Started</Button>
                    </Link>
                    <Link href="/docs" className="w-full">
                      <Button variant="outline" className="w-full">
                        Documentation
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

import { DEFAULT_DOCS_HREF } from "@/app/[locale]/docs/_page";
import bg from "@/app/assets/philosophy-background.png";
import CodeBlock from "@/components/code-block";
import { Motion } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { HERO_SCROLL_SENTINEL_ID } from "@/lib/hero-sentinel";
import { TranslationProps } from "@/types/translation";
import Image from "next/image";
import "@/styles/hero-code-theme.css";

const HERO_SNIPPET = `import std::libc{printf};

struct Box<T> {
    pub value: T,

    pub fn new(value: T) Self {
        return Self { value };
    }
}

struct Container<T> {
    pub box: Box<T>
}

pub fn main() {
    var container = Container { box: Box.new("Cyrus!") };

    printf("%s\\n", container.box.value);
}`;

export const HomeHero = ({ t }: TranslationProps) => {
  const renderCtaButtons = (buttonWidthClassName: string) => (
    <>
      <Link href={DEFAULT_DOCS_HREF}>
        <Button size="lg" className={buttonWidthClassName}>
          {t("hero.getStarted")}
        </Button>
      </Link>
      <Link href="/#examples">
        <Button size="lg" variant="glass" className={buttonWidthClassName}>
          {t("hero.seeExamples")}
        </Button>
      </Link>
    </>
  );

  return (
    <section className="relative flex min-h-[calc(100dvh-var(--header-height))] items-center">
      <div className="absolute inset-x-0 bottom-0 top-[calc(var(--header-height)*-1)]">
        <Image
          src={bg}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[65%_38%]"
        />
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-primary/20 mix-blend-color" />
      </div>

      <div className="container relative z-10 pb-16 lg:pb-0">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 xl:gap-16">
          <Motion
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8 text-start"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-lg md:text-6xl lg:text-6xl xl:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
              {t("hero.subtitle")}
            </p>

            <div className="hidden gap-4 pt-2 lg:flex lg:flex-row">
              {renderCtaButtons("w-auto")}
            </div>
          </Motion>

          <Motion
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="hero-code-theme overflow-hidden rounded-xl border border-white/15 bg-black/30 shadow-2xl backdrop-blur-md [&_.code-block]:my-0">
              <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
                <span className="font-mono text-xs text-white/50">
                  main.cyrus
                </span>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/70" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                  <span className="h-3 w-3 rounded-full bg-green-400/70" />
                </div>
              </div>
              <CodeBlock language="cyrus" disableBorder>
                {HERO_SNIPPET}
              </CodeBlock>
            </div>
          </Motion>

          <Motion
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-4 lg:hidden"
          >
            {renderCtaButtons("w-full")}
          </Motion>
        </div>
      </div>

      <div
        id={HERO_SCROLL_SENTINEL_ID}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50px] bg-gradient-to-b from-transparent to-background" />
    </section>
  );
};

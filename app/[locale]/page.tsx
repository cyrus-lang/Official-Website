import CodeBlock from "@/components/CodeBlock";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import socialMedia from "@/content/social_media.json";
// import { Typewriter } from "nextjs-simple-typewriter";
import { Link } from "@/i18n/navigation";
import {
  Code,
  Cpu,
  Github,
  Globe,
  Layers,
  MessageSquare,
  Send,
  Shield,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Motion } from "@/components/motion";

export default async function LandingPage() {
  const t = await getTranslations("HomePage");

  const features = [
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: t("features.cleanSyntax.title"),
      desc: t("features.cleanSyntax.description"),
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: t("features.typeSystem.title"),
      desc: t("features.typeSystem.description"),
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: t("features.crossPlatform.title"),
      desc: t("features.crossPlatform.description"),
    },
    {
      icon: <Cpu className="h-6 w-6 text-primary" />,
      title: t("features.concurrency.title"),
      desc: t("features.concurrency.description"),
    },
    {
      icon: <Layers className="h-6 w-6 text-primary" />,
      title: t("features.standardLibrary.title"),
      desc: t("features.standardLibrary.description"),
    },
    {
      icon: <Github className="h-6 w-6 text-primary" />,
      title: t("features.openSource.title"),
      desc: t("features.openSource.description"),
    },
  ];

  const community = [
    {
      icon: <Github className="h-12 w-12 mx-auto mb-4 text-primary" />,
      title: t("community.github.title"),
      desc: t("community.github.description"),
      link: socialMedia.github,
      button: t("community.github.button"),
    },
    {
      icon: <MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary" />,
      title: t("community.discord.title"),
      desc: t("community.discord.description"),
      link: socialMedia.discord,
      button: t("community.discord.button"),
    },
    {
      icon: <Send className="h-12 w-12 mx-auto mb-4 text-primary" />,
      title: t("community.telegram.title"),
      desc: t("community.telegram.description"),
      link: "https://t.me/cyrus_lang",
      button: t("community.telegram.button"),
    },
  ];

  const getStartedSteps = [
    {
      number: 1,
      title: t("getStarted.steps.download.title"),
      desc: t("getStarted.steps.download.description"),
    },
    {
      number: 2,
      title: t("getStarted.steps.install.title"),
      desc: t("getStarted.steps.install.description"),
    },
    {
      number: 3,
      title: t("getStarted.steps.code.title"),
      desc: t("getStarted.steps.code.description"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10 z-0"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 z-0"></div>
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary">
                {t("hero.title")}
              </h1>
              {/* <h2 className="text-xl text-muted-foreground max-w-2xl mx-auto">
                <Typewriter
                  words={[
                    t("hero.firstTypeTitle"),
                    t("hero.secondTypeTitle"),
                    t("hero.thirdTypeTitle"),
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={75}
                  deleteSpeed={75}
                  delaySpeed={1250}
                />
              </h2> */}
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/docs">
                  <Button size="lg" className="w-full sm:w-auto">
                    {t("hero.getStarted")}
                  </Button>
                </Link>
                <Link href="/#examples">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    {t("hero.seeExamples")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("features.title")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("features.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Motion
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={ {once: true, amount: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-background rounded-lg p-6 shadow-xs border hover:scale-[107.5%] transition-transform"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </Motion>
              ))}
            </div>
          </div>
        </section>

        {/* Code Example Section */}
        <section id="examples" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("examples.title")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("examples.subtitle")}
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="hello" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="hello">
                    {t("examples.tabs.helloWorld")}
                  </TabsTrigger>
                  <TabsTrigger value="concurrency">
                    {t("examples.tabs.concurrency")}
                  </TabsTrigger>
                  <TabsTrigger value="data">
                    {t("examples.tabs.httpServer")}
                  </TabsTrigger>
                </TabsList>

                {["hello", "concurrency", "data"].map((tab, idx) => (
                  <TabsContent value={tab} key={tab} className="mt-6">
                    <Motion
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={ {once: true, amount: 0.8 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                      <pre className="font-mono text-sm">
                        <CodeBlock disableBorder language="typescript">
                          {tab === "hello"
                            ? `import std::io;

fn main() {
  io::println("Hello, World!");
}

fn greet(name: string): string {
  return io::format("Hello, {}", name);
}

fn example() {
  var message = greet("Cyrus");
  io::println(message);
}`
                            : t("examples.comingSoon")}
                        </CodeBlock>
                      </pre>
                    </Motion>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        {/* Why Cyrus Lang Section */}
        <section id="why" className="py-20 bg-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("why.title")}
                </h2>
              </div>
              <Motion
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={ {once: true, amount: 0.5 }}
                transition={{ duration: 0.4 }}
                className="bg-background rounded-lg p-8 shadow-xs border"
              >
                <p className="text-lg max-md:text-base mb-6">{t("why.paragraph1")}</p>
                <p className="text-lg max-md:text-base mb-6">{t("why.paragraph2")}</p>
                <p className="text-lg max-md:text-base">{t("why.paragraph3")}</p>
              </Motion>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section id="get-started" className="py-20">
          <div className="container">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("getStarted.title")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("getStarted.subtitle")}
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="bg-background rounded-lg p-8 shadow-xs border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {getStartedSteps.map((step, idx) => (
                    <Motion
                      key={step.number}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={ {once: true, amount: 0.8 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="text-center hover:scale-[107.5%] transition-transform"
                    >
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <span className="font-bold text-primary">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="font-bold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {step.desc}
                      </p>
                    </Motion>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Link href="/docs/getting-started/install-compiler-binary">
                    <Button size="lg" className="w-full sm:w-auto">
                      {t("getStarted.installButton")}
                    </Button>
                  </Link>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {t("getStarted.availability")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("community.title")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("community.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {community.map((item, idx) => (
                <Motion
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={ {once: true, amount: 0.8 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-background rounded-lg p-6 shadow-xs border text-center hover:scale-[107.5%] transition-transform"
                >
                  {item.icon}
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.desc}</p>
                  <Link href={item.link} passHref legacyBehavior>
                    <Button variant="outline" className="w-full" asChild>
                      <a target="_blank" rel="noopener noreferrer">
                        {item.button}
                      </a>
                    </Button>
                  </Link>
                </Motion>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20">
          <div className="container">
            <Motion
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={ {once: true, amount: 0.8 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto bg-primary/5 rounded-lg p-8 border border-primary/20"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {t("newsletter.title")}
                </h2>
                <p className="text-muted-foreground">
                  {t("newsletter.subtitle")}
                </p>
              </div>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button className="sm:w-auto">{t("newsletter.button")}</Button>
              </form>
            </Motion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

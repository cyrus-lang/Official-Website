import CodeBlock from "@/components/CodeBlock";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import socialMedia from "@/content/social_media.json";
import { Typewriter } from "nextjs-simple-typewriter";
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

export default async function LandingPage() {
  const t = await getTranslations("HomePage");

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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary-light relative bottom-4">
                <Typewriter
                  words={[
                    t("hero.firstTypeTitle"),
                    t("hero.secondTypeTitle"),
                    t("hero.thirdTypeTitle"),
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={50}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h2>
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
              {/* Feature 1 */}
              <div
                data-aos="fade-up"
                data-aos-duration="2000"
                className="bg-background rounded-lg p-6 shadow-xs border hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t("features.cleanSyntax.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("features.cleanSyntax.description")}
                </p>
              </div>

              {/* Feature 2 */}
              <div
                data-aos="fade-up"
                data-aos-duration="2000"
                className="bg-background rounded-lg p-6 shadow-xs border hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t("features.typeSystem.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("features.typeSystem.description")}
                </p>
              </div>

              {/* Feature 3 */}
              <div
                data-aos="fade-up"
                data-aos-duration="2000"
                className="bg-background rounded-lg p-6 shadow-xs border hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t("features.crossPlatform.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("features.crossPlatform.description")}
                </p>
              </div>

              {/* Feature 4 */}
              <div
                data-aos="fade-up"
                data-aos-duration="2000"
                className="bg-background rounded-lg p-6 shadow-xs border hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t("features.concurrency.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("features.concurrency.description")}
                </p>
              </div>

              {/* Feature 5 */}
              <div
                data-aos="fade-up"
                data-aos-duration="2000"
                className="bg-background rounded-lg p-6 shadow-xs border hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t("features.standardLibrary.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("features.standardLibrary.description")}
                </p>
              </div>

              {/* Feature 6 */}
              <div
                data-aos="fade-up"
                data-aos-duration="2000"
                className="bg-background rounded-lg p-6 shadow-xs border hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t("features.openSource.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("features.openSource.description")}
                </p>
              </div>
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
                <TabsContent value="hello" className="mt-6">
                  <div>
                    <pre className="font-mono text-sm">
                      <CodeBlock
                        disableBorder
                        language="typescript"
                      >{`import std::io;

fn main() {
  io::println("Hello, World!");
}

// A simple function
fn greet(name: string): string {
  return io::format("Hello, {}", name);
}

// Using the function
fn example() {
  var message = greet("Cyrus");
  io::println(message); // Outputs: Hello, Cyrus!
}`}</CodeBlock>
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="concurrency" className="mt-6">
                  <div>
                    <pre className="font-mono text-sm">
                      <CodeBlock disableBorder language="typescript">
                        {t("examples.comingSoon")}
                      </CodeBlock>
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="data" className="mt-6">
                  <div>
                    <pre className="font-mono text-sm">
                      <CodeBlock disableBorder language="typescript">
                        {t("examples.comingSoon")}
                      </CodeBlock>
                    </pre>
                  </div>
                </TabsContent>
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
              <div className="bg-background rounded-lg p-8 shadow-xs border">
                <p className="text-lg mb-6">{t("why.paragraph1")}</p>
                <p className="text-lg mb-6">{t("why.paragraph2")}</p>
                <p className="text-lg">{t("why.paragraph3")}</p>
              </div>
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
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold text-primary">1</span>
                    </div>
                    <h3 className="font-bold mb-2">
                      {t("getStarted.steps.download.title")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("getStarted.steps.download.description")}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold text-primary">2</span>
                    </div>
                    <h3 className="font-bold mb-2">
                      {t("getStarted.steps.install.title")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("getStarted.steps.install.description")}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold text-primary">3</span>
                    </div>
                    <h3 className="font-bold mb-2">
                      {t("getStarted.steps.code.title")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("getStarted.steps.code.description")}
                    </p>
                  </div>
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
              <div
                data-aos="fade-up"
                data-aos-duration="2000"
                className="bg-background rounded-lg p-6 shadow-xs border text-center hover:shadow-md transition-shadow"
              >
                <Github className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">
                  {t("community.github.title")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("community.github.description")}
                </p>
                <Link href={socialMedia.github} passHref legacyBehavior>
                  <Button variant="outline" className="w-full" asChild>
                    <a target="_blank" rel="noopener noreferrer">
                      {t("community.github.button")}
                    </a>
                  </Button>
                </Link>
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="2000"
                className="bg-background rounded-lg p-6 shadow-xs border text-center hover:shadow-md transition-shadow"
              >
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">
                  {t("community.discord.title")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("community.discord.description")}
                </p>
                <Link href={socialMedia.discord} passHref legacyBehavior>
                  <Button variant="outline" className="w-full" asChild>
                    <a target="_blank" rel="noopener noreferrer">
                      {t("community.discord.button")}
                    </a>
                  </Button>
                </Link>
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="2000"
                className="bg-background rounded-lg p-6 shadow-xs border text-center hover:shadow-md transition-shadow"
              >
                <Send className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">
                  {t("community.telegram.title")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("community.telegram.description")}
                </p>
                <Link href="https://t.me/cyrus_lang" passHref legacyBehavior>
                  <Button variant="outline" className="w-full" asChild>
                    <a target="_blank" rel="noopener noreferrer">
                      {t("community.telegram.button")}
                    </a>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto bg-primary/5 rounded-lg p-8 border border-primary/20">
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

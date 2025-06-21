"use client";

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Cpu, Globe, Github, Twitter, MessageSquare, Layers, Shield, Send, Menu, X } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Header from "@/components/header"
import CodeBlock from "@/components/CodeBlock";

const socialMedia = {
  github: "https://github.com/cyrus-lang",
  discord: "https://discord.gg/Wd5KMeUJ",
  telegram: "https://t.me/cyrus_lang",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10 z-0"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 z-0"></div>
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className="text-primary">Cyrus Programming Language</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A programming language designed for simplicity, performance, and developer happiness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/docs">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link href="/#examples">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    See Examples
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cyrus Lang combines the best aspects of modern programming languages with innovative features designed
                for today's development challenges.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Clean and Readable Syntax</h3>
                <p className="text-muted-foreground">
                  Designed with readability in mind, Cyrus Lang's syntax is intuitive and reduces cognitive load.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Strong Type System</h3>
                <p className="text-muted-foreground">
                  Catch errors at compile time with a powerful type system that provides safety without verbosity.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cross-platform Compatibility</h3>
                <p className="text-muted-foreground">
                  Write once, run anywhere. Cyrus Lang works seamlessly across all major operating systems.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Built-in Concurrency</h3>
                <p className="text-muted-foreground">
                  First-class support for concurrent and parallel programming with intuitive primitives.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Extensive Standard Library</h3>
                <p className="text-muted-foreground">
                  A rich, well-documented standard library that covers most common programming needs.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Open-source & Community-driven</h3>
                <p className="text-muted-foreground">
                  Developed in the open with contributions from developers around the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Code Example Section */}
        <section id="examples" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Elegant by Design</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cyrus's syntax is designed to be intuitive, expressive, and easy to read.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="hello" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="hello">Hello World</TabsTrigger>
                  <TabsTrigger value="concurrency">Concurrency</TabsTrigger>
                  <TabsTrigger value="data">Http Server</TabsTrigger>
                </TabsList>
                <TabsContent value="hello" className="mt-6">
                  <div className="bg-zinc-950 text-zinc-50 rounded-lg p-6 overflow-x-auto">
                    <pre className="font-mono text-sm">
                      <CodeBlock language="typescript">{`import std::io;

fn main() {
    io::println("Hello, World!");
}

// A simple function
fn greet(name: string): string {
    return io::format("Hello, {}", name);
}

// Using the function
fn example() {
    #message = greet("Developer");
    io::println(message); // Outputs: Hello, Developer!
}`}</CodeBlock>
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="concurrency" className="mt-6">
                  <div className="bg-zinc-950 text-zinc-50 rounded-lg p-6 overflow-x-auto">
                    <pre className="font-mono text-sm">
                      <CodeBlock language="typescript">{`// Coming soon`}</CodeBlock>
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="data" className="mt-6">
                  <div className="bg-zinc-950 text-zinc-50 rounded-lg p-6 overflow-x-auto">
                    <pre className="font-mono text-sm">
                      <CodeBlock language="typescript">{`// Coming soon`}</CodeBlock>
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ancient Wisdom, Modern Power</h2>
              </div>
              <div className="bg-background rounded-lg p-8 shadow-sm border">
                <p className="text-lg mb-6">
                  Cyrus blends timeless principles of engineering with state-of-the-art compiler technology. 
                  It's built to empower developers with a language that is both intuitive and powerful.
                </p>
                <p className="text-lg mb-6">
                  In a world crowded with programming languages, Cyrus stands apart by offering a unique balance of simplicity and strength.
                  Designed for developers who care deeply about both productivity and performance, Cyrus Lang eliminates the need to compromise.
                  Its clean, expressive syntax lowers the barrier to entry, while its advanced compiler infrastructure ensures your programs run with uncompromising speed.
                </p>
                <p className="text-lg">
                  Unlike traditional languages that force a trade-off between rapid development and runtime efficiency, Cyrus delivers both.
                  Whether you're prototyping a new idea or engineering a high-performance system, Cyrus gives you the confidence that your code will remain elegant, fast, and maintainable.

                  With first-class support for modern programming paradigms, built-in safety features, and a focus on developer experience, Cyrus Lang is your companion for building everything from simple scripts to complex, large-scale software systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section id="get-started" className="py-20">
          <div className="container">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started with Cyrus Programming Language</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start building with Cyrus in minutes. It's easy to install and comes with comprehensive
                documentation.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="bg-background rounded-lg p-8 shadow-sm border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold text-primary">1</span>
                    </div>
                    <h3 className="font-bold mb-2">Download</h3>
                    <p className="text-sm text-muted-foreground">
                      Get the latest version of Cyrus Lang for your platform.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold text-primary">2</span>
                    </div>
                    <h3 className="font-bold mb-2">Install</h3>
                    <p className="text-sm text-muted-foreground">
                      Follow the simple installation instructions for your system.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold text-primary">3</span>
                    </div>
                    <h3 className="font-bold mb-2">Code</h3>
                    <p className="text-sm text-muted-foreground">Start writing your first Cyrus Lang program.</p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Button size="lg" className="w-full sm:w-auto">
                    Install Cyrus Lang
                  </Button>
                  <p className="mt-4 text-sm text-muted-foreground">Available on Windows, macOS, and Linux</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Community</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cyrus Lang is open-source and community-driven. Get involved and help shape the future of the language.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-background rounded-lg p-6 shadow-sm border text-center hover:shadow-md transition-shadow">
                <Github className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">GitHub</h3>
                <p className="text-muted-foreground mb-4">
                  Explore the source code, report issues, and contribute to the project.
                </p>
                <Link href={socialMedia.github} passHref legacyBehavior>
                  <Button variant="outline" className="w-full" asChild>
                    <a target="_blank" rel="noopener noreferrer">
                      Visit Repository
                    </a>
                  </Button>
                </Link>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm border text-center hover:shadow-md transition-shadow">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Discord</h3>
                <p className="text-muted-foreground mb-4">
                  Join our Discord server to chat with other developers and get help.
                </p>
                <Link href={socialMedia.discord} passHref legacyBehavior>
                  <Button variant="outline" className="w-full" asChild>
                    <a target="_blank" rel="noopener noreferrer">
                    Join Discord
                    </a>
                  </Button>
                </Link>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm border text-center hover:shadow-md transition-shadow">
                <Send className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Telegram</h3>
                <p className="text-muted-foreground mb-4">
                  Join our Telegram channel for announcements and discussions.
                </p>
                <Link href="https://t.me/cyrus_lang" passHref legacyBehavior>
                  <Button variant="outline" className="w-full" asChild>
                    <a target="_blank" rel="noopener noreferrer">
                      Join Telegram
                    </a>
                  </Button>
                </Link>
              </div>
              {/* <div className="bg-background rounded-lg p-6 shadow-sm border text-center hover:shadow-md transition-shadow">
                <Twitter className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Twitter</h3>
                <p className="text-muted-foreground mb-4">Follow us on Twitter for the latest news and updates.</p>
                <Button variant="outline" className="w-full">
                  Follow @CyrusLang
                </Button>
              </div> */}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto bg-primary/5 rounded-lg p-8 border border-primary/20">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Stay Updated</h2>
                <p className="text-muted-foreground">
                  Subscribe to our newsletter to receive updates, tutorials, and news about Cyrus.
                </p>
              </div>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button className="sm:w-auto">Subscribe</Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-12 border-t">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Cyrus</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A modern programming language designed for simplicity, performance, and developer happiness.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Examples
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Community</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={socialMedia.github} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href={socialMedia.discord} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href={socialMedia.telegram} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Telegram
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    License
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href={socialMedia.github} className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

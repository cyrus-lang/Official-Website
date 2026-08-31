import CodeBlock from "@/components/code-block";
import { Motion } from "@/components/motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  homeExamplesCodeSnippets,
  homeExamplesCodeTabs,
} from "@/content/home/home-examples-code";
import { TranslationProps } from "@/types/translation";

export const HomeCodeExamples = ({ t }: TranslationProps) => (
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
          {homeExamplesCodeTabs.length > 1 ?
            <TabsList className="grid w-full grid-cols-3">
              {homeExamplesCodeTabs.map(({ value, translationKey }) => (
                <TabsTrigger key={value} value={value}>
                  {t(translationKey)}
                </TabsTrigger>
              ))}
            </TabsList> : undefined
          }

          {homeExamplesCodeTabs.map(({ value }, idx) => (
            <TabsContent value={value} key={value} className="mt-6">
              <Motion
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <pre className="font-mono text-sm">
                  <CodeBlock disableBorder language="typescript">
                    {homeExamplesCodeSnippets[value] ||
                      t("examples.comingSoon")}
                  </CodeBlock>
                </pre>
              </Motion>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  </section>
);

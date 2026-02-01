import { TranslationProps } from "@/types/translation";
import { CodeEditor } from "@/components/code-editor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code } from "lucide-react";

export const PlaygroundCodeEditor = ({ t }: TranslationProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          {t("codeEditor.title")}
        </CardTitle>
        <CardDescription>{t("subtitle")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <CodeEditor
          runButtonLabel={t("codeEditor.runButton")}
          outputPlaceholder={t("output.placeholder")}
          outputTitle={t("output.title")}
          placeholder={t("codeEditor.placeholder")}
          shortcuts={{
            keys: [
              t("codeEditor.shortcuts.run"),
              t("codeEditor.shortcuts.clear"),
            ],
            title: t("codeEditor.shortcuts.title"),
          }}
        />
      </CardContent>
    </Card>
  );
};

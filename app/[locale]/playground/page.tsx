"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Code, Keyboard } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function PlaygroundPage() {
  const t = useTranslations("Playground");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleRunCode = () => {
    setOutput("Code execution is not implemented yet. Coming soon!");
  };

  const handleClearCode = () => {
    setCode("");
    setOutput("");
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Code className="mx-auto h-16 w-16 text-blue-500 mb-4" />
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Main Editor and Output Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-600" />
              {t("codeEditor.title")}
            </CardTitle>
            <CardDescription>{t("subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Version Selector and Run Button */}
            <div className="flex items-center justify-between gap-4">
              <Select defaultValue="v1.0.0" disabled>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("versionSelector.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v1.0.0">v1.0.0</SelectItem>
                  <SelectItem value="v0.9.0">v0.9.0</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleRunCode}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Play className="h-4 w-4 mr-2" />
                {t("codeEditor.runButton")}
              </Button>
            </div>

            {/* Code Editor */}
            <textarea
              className="w-full h-80 p-4 border rounded-lg font-mono text-sm text-black dark:text-white bg-white border-gray-300 dark:border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: "#121212" }}
              placeholder={t("codeEditor.placeholder")}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.ctrlKey && e.key === "Enter") {
                  handleRunCode();
                } else if (e.ctrlKey && e.shiftKey && e.key === "C") {
                  handleClearCode();
                }
              }}
            />

            {/* Shortcuts Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-muted-foreground">
              <Keyboard className="h-4 w-4" />
              <span>{t("codeEditor.shortcuts.title")}:</span>
              <span>{t("codeEditor.shortcuts.run")}</span>
              <span>|</span>
              <span>{t("codeEditor.shortcuts.clear")}</span>
            </div>

            {/* Output Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-black dark:text-white flex items-center gap-2">
                <Code className="h-5 w-5 text-green-600" />
                {t("output.title")}
              </h3>
              <div
                className="w-full h-40 p-4 border rounded-lg font-mono text-sm text-black dark:text-white bg-white border-gray-300 dark:border-gray-700"
                style={{ backgroundColor: "#121212" }}
              >
                {output || t("output.placeholder")}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
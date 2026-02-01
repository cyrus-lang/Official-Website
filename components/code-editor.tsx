"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { playgroundVersionsArray } from "@/content/playground/playground-versions";
import { Code, Keyboard, Play } from "lucide-react";
import { Fragment, useState } from "react";
import { Textarea } from "./ui/textarea";

export const CodeEditor = ({
  placeholder,
  outputPlaceholder,
  shortcuts,
  outputTitle,
  runButtonLabel,
}: {
  placeholder: string;
  shortcuts: { title: string; keys: string[]; seprator?: string };
  outputTitle: string;
  outputPlaceholder: string;
  runButtonLabel: string;
}) => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(outputPlaceholder);
  const [selectedVersion, setSelectedVersion] = useState(
    playgroundVersionsArray[0].value
  );

  const handleRunCode = () => {
    setOutput(
      `Running code on version: ${selectedVersion}\n\n${outputPlaceholder}`
    );
  };

  const handleClearCode = () => {
    setCode("");
    setOutput("");
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Select
          value={selectedVersion}
          onValueChange={(value) => setSelectedVersion(value)}
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Select version" />
          </SelectTrigger>
          <SelectContent>
            {playgroundVersionsArray.map((version, index) => (
              <SelectItem
                key={"playground-version-" + index}
                value={version.value}
              >
                {version.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleRunCode}>
          <Play className="h-4 w-4 mr-2" />
          {runButtonLabel}
        </Button>
      </div>

      <Textarea
        className="min-h-48"
        placeholder={placeholder}
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

      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-muted-foreground mt-2">
        <Keyboard className="h-4 w-4" />
        <span>{shortcuts.title}:</span>
        {shortcuts.keys.map((item, index, self) => (
          <Fragment key={index}>
            <span>{item}</span>
            {self.length - 1 !== index && (
              <span>{shortcuts.seprator || "|"}</span>
            )}
          </Fragment>
        ))}
      </div>

      <div className="space-y-2 mt-4">
        <h3 className="text-lg font-semibold text-black dark:text-white flex items-center gap-2">
          <Code className="h-5 w-5 text-green-600" />
          {outputTitle}
        </h3>
        <Textarea
          value={output}
          className="min-h-52 max-h-72 focus-visible:ring-0 cursor-default"
          onChange={() => { }}
          readOnly
        />
      </div>
    </>
  );
};

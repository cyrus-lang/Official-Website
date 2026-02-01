"use client";

import { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InstallBlockProps {
    command: string;
    isRtl: boolean;
    translations: {
        label: string;
        tooltip: string;
        copied: string;
    };
}

export function InstallBlock({ command, isRtl, translations }: InstallBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(command);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <div

            className="cursor-pointer p-6 bg-zinc-950 rounded-xl text-zinc-100 relative group border border-zinc-800 transition-all hover:border-primary/50 active:scale-[0.99]"
        >
            <div onClick={() => handleCopy()} className="shrink-0 absolute top-0 right-0 p-4">
                {copied ? (
                    <Check size={18} className="text-green-500 animate-in zoom-in" />
                ) : (
                    <Copy size={18} className="text-zinc-600 group-hover:text-primary transition-colors" />
                )}
            </div>
            <p className="text-[10px] text-zinc-500 mb-3 uppercase tracking-widest font-bold">
                {translations.label}
            </p>
            <div className="flex items-center justify-between gap-4">
                <code className="text-lg font-mono text-primary truncate">
                    {command}
                </code>

            </div>
        </div>
    );
}
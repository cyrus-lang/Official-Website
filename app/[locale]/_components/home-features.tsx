"use client";

import { useState } from "react";
import { homeFeaturesArray } from "@/content/home/home-features";
import { useTranslations } from "next-intl";
import { Motion } from "@/components/motion";
import { cn } from "@/lib/utils";

export const HomeFeaturesCards = () => {
  const t = useTranslations("HomePage");
  const features = homeFeaturesArray(t);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeFeature = features[activeIndex];

  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            {t("features.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Interactive Non-Card Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Navigation selector list (No cards!) */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            {features.map((feature, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "group text-left px-6 py-5 rounded-xl transition-all duration-300 flex items-center justify-between relative",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10 translate-x-1"
                      : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "font-mono text-xs tracking-wider transition-colors",
                        isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                      )}
                    >
                      0{index + 1}
                    </span>
                    <span className="font-semibold text-lg md:text-xl tracking-tight">
                      {feature.title}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "transition-transform duration-300",
                      isActive ? "scale-110 text-primary-foreground" : "text-muted-foreground group-hover:scale-105"
                    )}
                  >
                    {feature.icon}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed active feature display panel (Zero card boxes, pure editorial immersive view) */}
          <div className="lg:col-span-7">
            <Motion
              key={activeIndex}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative p-8 md:p-12 rounded-2xl bg-linear-to-br from-muted/40 via-muted/20 to-transparent border border-border/60 backdrop-blur-sm"
            >
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 text-primary shadow-inner">
                {activeFeature.icon}
              </div>

              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-foreground">
                {activeFeature.title}
              </h3>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-normal">
                {activeFeature.desc}
              </p>

              <div className="mt-8 pt-6 border-t border-border/40 flex items-center gap-3 text-xs font-mono text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                CYRUS LANGUAGE SPECIFICATION
              </div>
            </Motion>
          </div>
        </div>
      </div>
    </section>
  );
};

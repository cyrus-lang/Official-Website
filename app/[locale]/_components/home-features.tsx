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

        {/* Interactive Feature Showcase following project design patterns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Navigation selector list */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            {features.map((feature, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "group text-left px-5 py-4 rounded-lg transition-all duration-200 flex items-center justify-between border",
                    isActive
                      ? "bg-background border-primary/50 shadow-xs text-foreground font-semibold"
                      : "bg-background/60 hover:bg-background border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "font-mono text-xs tracking-wider",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      0{index + 1}
                    </span>
                    <span className="text-base tracking-tight">
                      {feature.title}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "transition-transform duration-200",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:scale-105"
                    )}
                  >
                    {feature.icon}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed active feature display panel following standard project container style */}
          <div className="lg:col-span-7">
            <Motion
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-background rounded-lg p-8 shadow-xs border relative"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
                {activeFeature.icon}
              </div>

              <h3 className="text-2xl font-bold tracking-tight mb-4 text-foreground">
                {activeFeature.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed text-base">
                {activeFeature.desc}
              </p>
            </Motion>
          </div>
        </div>
      </div>
    </section>
  );
};

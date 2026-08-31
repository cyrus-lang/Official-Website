"use client";

import { homeFeaturesArray } from "@/content/home/home-features";
import { useTranslations } from "next-intl";
import { Motion } from "@/components/motion";
import { Check } from "lucide-react";

export const HomeFeaturesCards = () => {
  const t = useTranslations("HomePage");
  const features = homeFeaturesArray(t);

  return (
    <section id="features" className="py-24 md:py-32 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            {t("features.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        {/* 3-Column Grid of Rich Feature Cards with ample context details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Motion
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-background rounded-xl p-8 shadow-xs border flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    {feature.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold tracking-tight mb-3 text-foreground">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6">
                  {feature.desc}
                </p>
              </div>

              {feature.details && feature.details.length > 0 && (
                <div className="pt-6 border-t border-border/60 mt-auto">
                  <ul className="space-y-2.5">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Motion>
          ))}
        </div>
      </div>
    </section>
  );
};

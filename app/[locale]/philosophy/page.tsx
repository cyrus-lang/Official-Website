"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import bg from "@/app/assets/philosophy-background.png";

const fadeUp = {
  hidden: { y: 40 },
  show: {
    y: 0,
    transition: { duration: 0.8 }
  }
};

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -6,
        boxShadow: "0 0 60px rgba(255,255,255,0.08)"
      }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10"
    >
      {children}
    </motion.div>
  );
}

export default function PhilosophyPage() {
  const t = useTranslations("Philosophy");

  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={bg}
          alt="Cyrus Background"
          fill
          priority
          quality={100}
          className="object-cover"
        />
        <div className="absolute inset-0 dark:bg-black/75 bg-black/20" />
      </div>

      {/* HERO */}
      <section className="pt-36 pb-28 text-center px-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            {t("hero.title")}
          </h1>

          <p className="mt-8 text-2xl md:text-3xl text-gray-300 font-light">
            {t("hero.subtitle")}
          </p>

          <p className="mt-10 text-lg md:text-xl dark:text-gray-400 text-white  max-w-3xl mx-auto leading-8">
            {t("hero.description")}
          </p>
        </motion.div>
      </section>

      {/* CARDS */}
      <section className="max-w-5xl mx-auto px-6 space-y-10 pb-32">

        {["c1", "c2", "c3", "c4"].map((key) => (
          <motion.div
            key={key}
            initial="hidden"
            whileInView="show"
            variants={fadeUp}
            viewport={{ once: true, amount: 0.4 }}
          >
            <GlassCard>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                {t(`cards.${key}.title`)}
              </h2>

              <p className="text-gray-300 text-lg leading-9 whitespace-pre-line">
                {t(`cards.${key}.body`)}
              </p>
            </GlassCard>
          </motion.div>
        ))}

        <span className="block mt-16 text-center text-sm md:text-base text-white/50">
          {t("footer.line1")}
          <br />
          <span className="text-white/80 mt-4 block">
            {t("footer.line2")}
          </span>
        </span>
      </section>
    </div>
  );
}
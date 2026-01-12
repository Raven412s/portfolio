"use client"

import SectionTransition from "@/components/global/animated/section-transition"
import { ChevronDown, Languages } from "lucide-react"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

export default function LocalizationIntroSection() {
  const t = useTranslations("pages.homepage.sections.localizationIntro")
    const locale = useLocale()
  const highlights = t.raw("highlights") as string[]

  return (
    <section className="relative py-24 px-6 md:px-32 w-full h-screen overflow-hidden">
      <SectionTransition>
        <div className="relative w-full rounded-[2.5rem] h-full border border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-xl p-10 md:p-16 shadow-2xl overflow-hidden">

          {/* Ambient glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 blur-[180px] -z-10" />

          <div className="flex gap-12 items-center justify-between">
            {/* LEFT */}
            <div>
              {/* Tagline */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Languages className="w-5 h-5" />
                </div>
                <span className="text-sm uppercase tracking-widest text-primary font-medium">
                  {t("tagline")}
                </span>
              </div>

              {/* Title */}
              <h2 className={cn("text-4xl md:text-6xl font-bold max-w-4xl mb-8",
                locale === "hi" ? "leading-24 tracking-wide" : "leading-20 tracking-tight"
              )}>
                {t("title.prefix")}{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                  {t("title.highlight")}
                </span>
                {t("title.suffix")}
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-12">
                {t("description")}
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="h-80 md:h-105 aspect-square z-10 relative">
              <Image
                fill
                src="/assets/images/languages.svg"
                alt={t("imageAlt")}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-3 mb-16">
            {highlights.map((item) => (
              <span
                key={item}
                className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Scroll Hint */}
          <div className="flex flex-col items-center gap-2 text-primary/70 animate-pulse">
            <span className="text-xs font-mono uppercase tracking-widest">
              {t("scrollHint")}
            </span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </SectionTransition>
    </section>
  )
}

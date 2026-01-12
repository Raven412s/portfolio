"use client"

import { PortraitScene } from "@/components/3D/portrait"
import SectionTransition from "@/components/global/animated/section-transition"
import LocalizationIntroSection from "@/components/sections/home/localization-intro-section"
import LocalizationShowcaseSection from "@/components/sections/home/localization-showcase"
import { cn } from "@/lib/utils"
import { MoveRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { useState } from "react"

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const t = useTranslations("pages.homepage")
  const locale = useLocale();
  const titleWords = t.raw("sections.hero.title.words") as string[]
  const descriptionParts = t.raw("sections.hero.description.parts") as string[]

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    })
  }



  return (
    <main className="w-full relative overflow-x-hidden bg-background">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_2px,transparent_2px),linear-gradient(to_bottom,#80808020_2px,transparent_2px)] bg-size-[40px_40px]" />
      </div>

      <div
        onMouseMove={handleMouseMove}
        className="h-screen flex items-center justify-center py-20 px-6 md:px-32 w-full relative"
      >
        {/* Underlay Blur */}
        <div className="rounded-b-full w-full h-1/2 blur-[275px] bg-[#0039a3] dark:bg-[#00A36C]/40 absolute right-0 -top-1/4 -z-10" />

        <SectionTransition>
          <div className="h-full w-full flex flex-col md:flex-row justify-between p-8 md:p-16 bg-white/5 dark:bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden">

            {/* LEFT CONTENT */}
            <div className="flex flex-col justify-center z-10 basis-full md:basis-2/3">
              {/* Tagline */}
              <div className="flex items-center gap-2 mb-6">
                <span className="h-px w-12 bg-primary" />
                <span className="text-sm uppercase tracking-widest text-primary font-medium">
                  {t("sections.hero.tagline")}
                </span>
              </div>

              {/* Title */}
              <h1 className={cn("text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl",
                locale === "hi" ? "leading-24" : "leading-20"
              )}>
                {titleWords[0]}{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                  {titleWords[1]}
                </span>{" "}
                {titleWords[2]}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                {descriptionParts[0]}{" "}
                <span className="text-foreground font-medium">
                  {descriptionParts[1]}
                </span>{" "}
                {descriptionParts[2]}{" "}
                <span className="text-foreground font-medium">
                  {descriptionParts[3]}
                </span>
                . {descriptionParts[4]}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-3 mb-12">
                {["GSAP", "GLSL", "Three.js", "TypeScript", "PostgreSQL", "MongoDB"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-6 items-center">
                <button className="group flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold transition-all hover:pr-10">
                  {t("sections.hero.cta.button")}
                  <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </button>

                <div className="flex items-center gap-4 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {t("sections.hero.cta.line")}
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT: 3D MODEL */}
            <div className="relative basis-full md:basis-1/3 h-75 md:h-full">
              <div className="absolute inset-0 -z-10 ovherflow-hidden ">
                <Image
                  src="/assets/images/bg-lines.webp"
                  alt="Background Lines"
                  fill
                  className="object-cover object-center rounded-2xl"
                />
              </div>
              <div className="relative z-10 basis-full md:basis-1/3 h-100 md:h-full">
                <PortraitScene mousePos={mousePos} />
              </div>
            </div>

            {/* Subtle "Vercel Deployed" Badge */}
            <div className="absolute bottom-8 right-8 opacity-40 hover:opacity-100 transition-opacity z-20">
              <p className="text-[10px] font-mono tracking-tighter uppercase">Optimized for Vercel Edge</p>
            </div>
          </div>
        </SectionTransition>
      </div>
      <LocalizationIntroSection />
      <LocalizationShowcaseSection />
      <div className="h-100"></div>
    </main>
  );
}
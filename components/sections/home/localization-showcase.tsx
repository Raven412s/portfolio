"use client"

import React, { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronDown, Languages, LayoutDashboard, Network, LucideIcon } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

interface Step {
    id: string
    icon: LucideIcon
    title: string
    description: string
    hint?: string
    points?: string[]
    stack?: string[]
}

export default function LocalizationShowcaseSection() {
    const t = useTranslations("pages.homepage.sections.localizationShowcase")
    const containerRef = useRef<HTMLDivElement>(null)
    const stickyRef = useRef<HTMLDivElement>(null)
    const stepsRef = useRef<HTMLDivElement[]>([])

    const steps: Step[] = [
        {
            id: "awareness",
            icon: Languages,
            title: t("steps.awareness.title"),
            description: t("steps.awareness.description"),
            hint: t("steps.awareness.hint"),
        },
        {
            id: "impact",
            icon: ChevronDown,
            title: t("steps.impact.title"),
            description: t("steps.impact.description"),
        },
        {
            id: "architecture",
            icon: Network,
            title: t("steps.architecture.title"),
            description: t("steps.architecture.description"),
            stack: t.raw("steps.architecture.stack") as string[],
        },
        {
            id: "management",
            icon: LayoutDashboard,
            title: t("steps.management.title"),
            description: t("steps.management.description"),
        },
    ]

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const totalSteps = steps.length

            // 1. PINNING LOGIC
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: `+=${totalSteps * 100}%`,
                pin: stickyRef.current,
                pinSpacing: true,
            })

            // 2. STEP FADE IN/OUT ANIMATIONS
            stepsRef.current.forEach((step, i) => {
                const isLast = i === totalSteps - 1
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: () => `top+=${i * window.innerHeight} top`,
                        end: () => `top+=${(i + 1) * window.innerHeight} top`,
                        scrub: true,
                    },
                })

                tl.fromTo(step,
                    { opacity: 0, y: 50, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, ease: "power2.out" }
                )

                if (!isLast) {
                    tl.to(step, { opacity: 0, y: -50, scale: 0.95, ease: "power2.in", delay: 0.5 })
                }
            })


        }, containerRef)

        return () => ctx.revert()
    }, [steps.length])

    return (
        <section ref={containerRef} className="relative py-20 px-6 md:px-32 w-full overflow-hidden">
            <div ref={stickyRef} className="h-screen w-full flex items-top justify-center overflow-hidden ">
                <div className="relative w-full h-[85vh] max-w-full rounded-[2.5rem] border border-border/50 bg-card  backdrop-blur-3xl p-18 flex items-center justify-center overflow-hidden ">

                    {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full  blur-[120px] pointer-events-none " /> */}

                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            ref={(el) => { if (el) stepsRef.current[index] = el }}
                            className={cn("absolute inset-0 flex flex-col items-center text-center p-6 md:p-10 justify-center   ",
                                index !== 3 && "pointer-events-none"
                            )}
                            style={{ opacity: 0 }}
                        >
                            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-8 shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                                <step.icon className="w-8 h-8" />
                            </div>

                            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">{step.title}</h2>
                            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">{step.description}</p>                  
                            {/* Architecture Diagram */}
                            {step.id === "architecture" && (
                                <div className="mt-4 mb-8 flex flex-col items-center gap-4 text-sm font-mono">
                                    <div className="p-3 px-6 rounded-xl border border-primary/30 bg-primary/10 shadow-lg animate-pulse">
                                        {t("ui.architectureFlow")}
                                    </div>
                                    <div className="h-8 w-px bg-linear-to-b from-primary to-transparent" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-2 px-4 rounded border border-border bg-card">
                                            {t("ui.seoMeta")}
                                        </div>
                                        <div className="p-2 px-4 rounded border border-border bg-card">
                                            {t("ui.jsonLocales")}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Modern Language Management - Realistic Mock */}
                            {step.id === "management" && (
                                <div className="mt-4 mb-8 w-full max-w-md">
                                    <div className="bg-card rounded-2xl p-6 border border-border shadow-2xl text-left backdrop-blur-md">
                                        {/* Dashboard Header */}
                                        <div className="flex justify-between items-center mb-6">
                                            <div>
                                                <h4 className="text-xs font-mono uppercase tracking-widest text-primary/70">
                                                    {t("management.projectTitle")}
                                                </h4>
                                                <p className="text-sm font-bold text-foreground">
                                                    {t("management.projectName")}
                                                </p>
                                            </div>
                                            <div className="flex -space-x-2">
                                                {['🇺🇸', '🇮🇳', '🇩🇪', '🇯🇵'].map((flag, i) => (
                                                    <div key={i} className="w-7 h-7 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs">
                                                        {flag}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Translation Rows */}
                                        <div className="space-y-4">
                                            {/* Row 1 */}
                                            <div className="p-3 rounded-xl bg-muted/30 border border-border flex items-center justify-between group hover:bg-muted/50 transition-colors">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-mono text-muted-foreground">
                                                        {t("management.heroTitle")}
                                                    </span>
                                                    <p className="text-sm text-foreground">
                                                        {t("management.heroText")}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[10px] font-mono text-primary">HI-IN</span>
                                                    <p className="text-sm text-primary font-hindi">नमस्ते और स्वागत है</p>
                                                </div>
                                            </div>

                                            {/* Row 2 */}
                                            <div className="p-3 rounded-xl bg-muted/30 border border-border flex items-center justify-between group hover:bg-muted/50 transition-colors">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-mono text-muted-foreground">
                                                        {t("management.ctaButton")}
                                                    </span>
                                                    <p className="text-sm text-foreground">
                                                        {t("management.ctaText")}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[10px] font-mono text-chart-2">FR-FR</span>
                                                    <p className="text-sm text-chart-2 italic">Essai gratuit</p>
                                                </div>
                                            </div>

                                            {/* Progress Indicator */}
                                            <div className="pt-2">
                                                <div className="flex justify-between text-[10px] font-mono mb-2 text-muted-foreground uppercase">
                                                    <span>{t("management.overallCompletion")}</span>
                                                    <span>{t("management.completionRate")}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary w-[92%]" />
                                                </div>
                                            </div>
                                        </div>

                                        <Link
                                            href="/i18n-lab"
                                            className="mt-8 block w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:scale-[1.02] transition-transform active:scale-95 text-center text-sm shadow-lg shadow-primary/20"
                                        >
                                            {t("management.launchButton")}
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Hint for awareness step */}
                            {step.hint && (
                                <div className="mt-8 text-sm text-primary/70 font-mono animate-pulse">
                                    {step.hint}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
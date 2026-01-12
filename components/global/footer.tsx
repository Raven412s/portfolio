"use client"
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import {
    BookUser,
    BrainCircuit,
    HouseHeartIcon,
    Send,
    TestTubeDiagonal
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import scrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(scrollTrigger)

function Footer() {
    const t = useTranslations('global.navbar')
    const pathname = usePathname()

    const footerContainerRef = useRef<HTMLDivElement | null>(null)
    const footerCanvasRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            scrollTrigger.create({
                trigger: "footer",
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const yValue = -35 * (1 - progress);
                    gsap.set(footerContainerRef.current, { y: `${yValue}%` });
                }
            })
        });
        return () => ctx.revert();
    }, [])

    const locale = pathname.split("/")[1]
    const basePath = `/${locale}`
    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === basePath || pathname === `${basePath}/`
        }
        return pathname === `${basePath}${href}` || pathname.startsWith(`${basePath}${href}/`)
    }

    const navLinks = [
        { href: "/", icon: HouseHeartIcon, label: t('links.home') },
        { href: "/about", icon: BookUser, label: t('links.about') },
        { href: "/i18n-lab", icon: BrainCircuit, label: t('links.lab') },
        { href: "/experiments", icon: TestTubeDiagonal, label: t('links.experiments') },
        { href: "/contact", icon: Send, label: t('links.contact') },
    ]

    return (
        <footer className='relative w-full h-[85svh] md:h-[75svh] bg-[#ffffe2] dark:bg-[#1a1a1a] overflow-hidden'>
            <div
                ref={footerContainerRef}
                className="relative size-full p-6 md:p-12 lg:p-16 flex flex-col justify-between -translate-y-[35%] will-change-transform"
            >
                <div ref={footerCanvasRef} id="footer-canvas" className='absolute top-0 left-0 size-full pointer-events-none opacity-40 -z-10' />

                <div className="footer-content relative size-full flex flex-col justify-between z-10">
                    
                    {/* Top Section */}
                    <div className="flex flex-col lg:flex-row justify-between gap-12">
                        <div className="footer-col lg:w-2/3">
                            <h2 className='text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-foreground'>
                                Restoring meaning to the things I build
                            </h2>
                        </div>

                        <div className="flex flex-col sm:flex-row lg:flex-col gap-10 min-w-50">
                            <div className="footer-sub-col">
                                <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-semibold">Contact</h3>
                                <div className="flex flex-col gap-1 text-base md:text-lg opacity-80">
                                    <p className="hover:text-primary transition-colors cursor-pointer">being.ashutosh16.20@gmail.com</p>
                                    <p>+91 9198704352</p>
                                </div>
                            </div>

                            <div className="footer-sub-col">
                                <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-semibold">Navigation</h3>
                                <nav className="flex flex-wrap lg:flex-col gap-x-6 gap-y-3">
                                    {navLinks.map((link) => (
                                        <Link key={link.href} href={link.href} className={cn(
                                            "flex gap-2 items-center transition-all text-sm md:text-base hover:translate-x-1",
                                            isActive(link.href) ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                                        )}>
                                            <link.icon size={16} strokeWidth={2} />
                                            <span>{link.label}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section with Glass Signature */}
                    <div className="relative w-full pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
                        
                        <div className="group relative cursor-default">
                          <h1 className={cn(
                                "text-[18vw] md:text-[14vw] font-black uppercase tracking-tighter leading-none select-none transition-all duration-500",
                                // Default Glass State
                                "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.1)] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.05)]",
                                "bg-linear-to-b from-slate-950/30 via-stone-4from-slate-950/10 to-transparent dark:from-white/20 dark:via-white/5 dark:to-transparent bg-clip-text",
                            )}>
                                Ashutosh
                            </h1>
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-1 text-xs md:text-sm font-medium opacity-50 uppercase tracking-widest pb-2">
                            <p>© 2026 — ASHUTOSH SHARAN</p>
                            <p>All Rights Reserved</p>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer
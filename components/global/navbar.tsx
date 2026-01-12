"use client"

import { Link } from "@/i18n/navigation"
import { cn } from '@/lib/utils'
import {
  BookUser,
  BrainCircuit,
  ChevronDown,
  HouseHeartIcon,
  Send,
  TestTubeDiagonal
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { LocaleToggler } from '../togglers/LocaleToggler'
import { ThemeToggler } from '../togglers/ThemeToggler'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useLenis } from "lenis/react"
import { WORKS } from "@/data/works"
import { WorkCard } from "../cards/work-card"
import { SeeAllWorksCard } from "../cards/see-all-works-card"

gsap.registerPlugin(ScrollTrigger)

const Navbar = () => {
  const t = useTranslations('global.navbar')
  const pathname = usePathname()
  const navRef = useRef<HTMLElement | null>(null)
  const stackRef = useRef<HTMLDivElement | null>(null)
  const workRef = useRef<HTMLDivElement | null>(null)
  const [workHeight, setWorkHeight] = useState(0)

  const [isWorkOpen, setIsWorkOpen] = useState(false)
  useEffect(() => {
    if (!workRef.current) return

    setWorkHeight(workRef.current.offsetHeight)
  }, [])

  const lenis = useLenis()

  const locale = pathname.split("/")[1]
  const basePath = `/${locale}`


  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === basePath || pathname === `${basePath}/`
    }
    return pathname === `${basePath}${href}` ||
      pathname.startsWith(`${basePath}${href}/`)
  }

  useEffect(() => {
    if (!navRef.current) return

    let relaxTimeout: NodeJS.Timeout | null = null
    let isShrunk = false

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "max",
        onUpdate: () => {
          // 🔹 scroll start → shrink ONLY once
          if (!isShrunk) {
            gsap.to(navRef.current, {
              width: "964px", // SCROLL STATE
              duration: 0.18,
              ease: "expo.out",
            })
            isShrunk = true
          }

          // 🔹 clear previous relax timer
          if (relaxTimeout) clearTimeout(relaxTimeout)

          // 🔹 scroll STOP → relax
          relaxTimeout = setTimeout(() => {
            gsap.to(navRef.current, {
              width: "1024px", // RELAXED STATE
              duration: 0.28,
              ease: "sine.out",
            })
            isShrunk = false
          }, 140) // scroll stop buffer
        },
      })
    })

    return () => {
      if (relaxTimeout) clearTimeout(relaxTimeout)
      ctx.revert()
    }
  }, [])



  useEffect(() => {
    if (!stackRef.current) return

    gsap.to(stackRef.current, {
      y: isWorkOpen ? 0 : -workHeight,
      duration: 0.8,
      ease: "expo.inOut",
    })
  }, [isWorkOpen, workHeight])


  // handle escape key + outside clicks + scroll lock
  useEffect(() => {
    if (!stackRef.current) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsWorkOpen(false)
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        stackRef.current &&
        !stackRef.current.contains(e.target as Node)
      ) {
        setIsWorkOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)

    // disable Lenis scroll when dropdown is open
    if (lenis) lenis.stop() // stop scrolling
    if (!isWorkOpen && lenis) lenis.start() // resume scrolling when closed

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      if (lenis) lenis.start()
    }
  }, [isWorkOpen, lenis])
  return (

    <div
      ref={stackRef}
      className="fixed left-1/2 -translate-x-1/2 -translate-y-full top-0 z-50 w-full flex flex-col items-center"
    >
      <div
        ref={workRef}
        className="w-full bg-[#FAFAF9] dark:bg-[#1c1c1e] z-40"
      >
        <div className="py-12 px-12">
          <h2 className="text-3xl font-bold mb-6">Selected Work</h2>

          <div className="grid grid-cols-3 gap-6">
        {WORKS.slice(0, 5).map((work) => (
          <WorkCard
            key={work.slug}
            title={work.title}
            description={work.description}
            image={work.image}
            href={`/work/${work.slug}`}
          />
        ))}

        <SeeAllWorksCard />
          </div>
        </div>
      </div>

      {/* the nav has a work span under links which will bring down the work display grid when clicked */}
      <nav
        ref={navRef}
        className={cn(
          // IMPORTANT: remove w-full here
          "max-w-5xl w-5xl h-[4.2rem] hover:h-[4.6rem] transition-[height]",

          // layout
          "p-2 flex justify-between items-center rounded-b-xl",

          // background and borders
          "bg-[#FAFAF9] border border-[#E5E7EB] dark:bg-[#1C1C1E] dark:border-[#2C2C2E]",

          // effects
          "will-change-[width,height]"
        )}
      >
        {/* Logo */}
        <div className="text-4xl font-bold">
          {t('name')}<span className="text-red-600">.</span>
        </div>

        {/* Links */}
        <div className="flex gap-2.5 items-center">
          <Link href="/" className={cn(
            "flex gap-1 items-center px-2 py-1 rounded-md transition",
            isActive("/") ? "text-foreground font-medium" : "text-muted-foreground/80 hover:text-foreground"
          )}>
            <HouseHeartIcon size={18} />
            <span>{t('links.home')}</span>
          </Link>

          <Link href="/about" className={cn(
            "flex gap-1 items-center px-2 py-1 rounded-md transition",
            isActive("/about") ? "text-foreground font-medium" : "text-muted-foreground/80 hover:text-foreground"
          )}>
            <BookUser size={18} />
            <span>{t('links.about')}</span>
          </Link>

          <button
            onClick={() => setIsWorkOpen(prev => !prev)}
            className={cn(
              "flex gap-1 items-center px-2 py-1 rounded-md transition",
              isWorkOpen
                ? "text-foreground font-medium"
                : "text-muted-foreground/80 hover:text-foreground"
            )}
          >
            <span>{t('links.work')}</span>
            <ChevronDown
              size={18}
              className={cn(
                "transition-transform duration-300",
                isWorkOpen && "rotate-180"
              )}
            />
          </button>


          <Link href="/i18n-lab" className={cn(
            "flex gap-1 items-center px-2 py-1 rounded-md transition",
            isActive("/i18n-lab") ? "text-foreground font-medium" : "text-muted-foreground/80 hover:text-foreground"
          )}>
            <BrainCircuit size={18} />
            <span>{t('links.lab')}</span>
          </Link>

          <Link href="/experiments" className={cn(
            "flex gap-1 items-center px-2 py-1 rounded-md transition",
            isActive("/experiments") ? "text-foreground font-medium" : "text-muted-foreground/80 hover:text-foreground"
          )}>
            <TestTubeDiagonal size={18} />
            <span>{t('links.experiments')}</span>
          </Link>

          <Link href="/contact" className={cn(
            "flex gap-1 items-center px-2 py-1 rounded-md transition",
            isActive("/contact") ? "text-foreground font-medium" : "text-muted-foreground/80 hover:text-foreground"
          )}>
            <Send size={18} />
            <span>{t('links.contact')}</span>
          </Link>
        </div>

        {/* Togglers */}
        <div className="flex gap-2">
          <LocaleToggler availableLocales={["en", "hi", "fr"]} />
          <ThemeToggler variant="circle" start="top-center" />
        </div>
      </nav>

    </div>
  )
}

export default Navbar



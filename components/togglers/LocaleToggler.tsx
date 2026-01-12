"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface LocaleTogglerProps {
  availableLocales?: string[]
  className?: string
}

// Optional: map locale → display symbol
const LOCALE_SYMBOL: Record<string, string> = {
  en: "EN",
  hi: "हि",
  fr: "FR",
}

export function LocaleToggler({
  availableLocales = ["en"],
  className,
}: LocaleTogglerProps) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  if (availableLocales.length <= 1) return null

  const switchLocale = (nextLocale: string) => {
    if (nextLocale === locale) return

    const segments = pathname.split("/")
    segments[1] = nextLocale
    router.push(segments.join("/"), {scroll: false})
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full font-semibold text-xs tracking-wide",
            className
          )}
          aria-label="Change language"
        >
          {LOCALE_SYMBOL[locale] ?? locale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-30">
        {availableLocales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => switchLocale(loc)}
            className="flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span className="font-medium">
                {LOCALE_SYMBOL[loc] ?? loc.toUpperCase()}
              </span>
            </span>

            {loc === locale && (
              <Check className="h-4 w-4 opacity-70" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

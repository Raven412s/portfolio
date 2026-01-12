"use client"

import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface WorkCardProps {
  title: string
  description: string
  image: string
  href: string
  className?: string
}

export function WorkCard({
  title,
  description,
  image,
  href,
  className,
}: WorkCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative rounded-xl border bg-background p-4 transition hover:border-foreground/40",
        className
      )}
    >
      <div className="aspect-2/1 w-full overflow-hidden rounded-lg bg-muted relative">
        <Image
          fill
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-lg font-semibold leading-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  )
}

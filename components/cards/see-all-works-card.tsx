import { Link } from "@/i18n/navigation"

export function SeeAllWorksCard() {
  return (
    <Link
      href="/work"
      className="
        flex flex-col items-center justify-center rounded-xl border
        border-dashed p-4 text-center transition
        hover:border-foreground/40 hover:bg-muted/40
      "
    >
      <span className="text-lg font-medium">See all works</span>
      <span className="text-sm text-muted-foreground">
        View complete portfolio
      </span>
    </Link>
  )
}

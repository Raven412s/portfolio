"use client"

import { RefreshCcwDot } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useProjectStats } from "@/hooks/use-project-stats"

function StatsPanel() {
  const { locales, refreshStats } = useProjectStats()

  return (
    <div className="rounded-xl border-3 border-dashed bg-accent/70 p-4 flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Project Stats</h2>
        <Button
          variant="outline"
          size="icon-sm"
          className="rounded-4xl"
          onClick={refreshStats}
          disabled={locales.loading}
        >
          <RefreshCcwDot
            className={locales.loading ? "animate-spin" : ""}
          />
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Locales</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-semibold">
                  {locales.loading ? "—" : locales.total}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-semibold">
                  {locales.loading ? "—" : locales.active}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 🔜 Future cards */}
        {/* Translations */}
        {/* Projects */}
        {/* Experiments */}
      </div>
    </div>
  )
}

export default StatsPanel

import { useCallback } from "react"
import { useLocales } from "./use-locales"

const MIN_LOADING_TIME = 350 // ms

export function useProjectStats() {
  const locales = useLocales(true)

  /**
   * Single refresh entry point for ALL stats
   * Ensures minimum loading time for better UX
   */
  const refreshStats = useCallback(async () => {
    const start = performance.now()

    await Promise.all([
      locales.refresh(),

      // 🔜 future hooks
      // translations.refresh(),
      // projects.refresh(),
      // experiments.refresh(),
    ])

    const elapsed = performance.now() - start
    const remaining = MIN_LOADING_TIME - elapsed

    if (remaining > 0) {
      await wait(remaining)
    }
  }, [locales])

  return {
    locales,
    refreshStats,
  }
}

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

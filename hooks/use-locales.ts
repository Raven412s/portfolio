import { useCallback, useEffect, useState } from "react"
import type { LocaleDTO } from "@/types/locale"
import type { LocalesListResponse } from "@/types/api"

interface UseLocalesResult {
  locales: LocaleDTO[]
  total: number
  active: number
  loading: boolean
  refresh: () => Promise<void>
}

export function useLocales(autoLoad: boolean = true): UseLocalesResult {
  const [locales, setLocales] = useState<LocaleDTO[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchLocales = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/locales?all=true")
      const json: LocalesListResponse = await res.json()

      const items = Array.isArray(json.data) ? json.data : []
      setLocales(items)
    } catch {
      setLocales([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (autoLoad) {
      fetchLocales()
    }
  }, [autoLoad, fetchLocales])

  return {
    locales,
    total: locales.length,
    active: locales.filter(l => l.status === "active").length,
    loading,
    refresh: fetchLocales,
  }
}

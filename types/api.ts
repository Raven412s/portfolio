import type { LocaleDTO } from "./locale"

export interface LocalesListResponse {
  success: boolean
  data: LocaleDTO[]
  count?: number
}

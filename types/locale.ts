// types/locale.ts
export type LocaleDirection = "ltr" | "rtl"
export type LocaleStatus = "active" | "inactive"

export interface LocaleDTO {
  _id: string
  language: string
  code: string
  direction: LocaleDirection
  status: LocaleStatus
  createdAt: string
}

// models/Locale.ts
import { Schema, model, models } from "mongoose"
import type { LocaleDirection, LocaleStatus } from "@/types/locale"

export interface LocaleDocument {
  language: string
  code: string
  direction: LocaleDirection
  status: LocaleStatus
  createdAt: Date
  updatedAt: Date
}

const LocaleSchema = new Schema<LocaleDocument>(
  {
    language: { type: String, required: true, trim: true },
    code: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    direction: {
      type: String,
      enum: ["ltr", "rtl"],
      default: "ltr",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
  },
  { timestamps: true }
)

export default models.Locale ||
  model<LocaleDocument>("Locale", LocaleSchema)

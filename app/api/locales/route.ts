import { NextResponse } from "next/server"
import {connectToDb} from "@/lib/mongodb"
import Locale from "@/models/Locale"
import { LocaleStatus } from "@/types/locale"

export async function GET(req: Request) {
  await connectToDb()

  const { searchParams } = new URL(req.url)

  const page = Number(searchParams.get("page") ?? 1)
  const limit = Number(searchParams.get("limit") ?? 10)
  const status = searchParams.get("status") as LocaleStatus | null
  const all = searchParams.get("all") === "true"

  const filter: Partial<{ status: LocaleStatus }> = {}
  if (status) filter.status = status

  // 🔹 For language switcher / forms
  if (all) {
    const locales = await Locale.find(filter)
      .select("language code direction status")
      .sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      data: locales,
      count: locales.length,
    })
  }

  const skip = (page - 1) * limit

  const [data, total, activeCount] = await Promise.all([
    Locale.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Locale.countDocuments(filter),
    Locale.countDocuments({ status: "active" }),
  ])

  return NextResponse.json({
    success: true,
    data,
    meta: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      activeCount,
    },
  })
}

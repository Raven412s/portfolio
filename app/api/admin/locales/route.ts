import { NextResponse } from "next/server"
import {connectToDb} from "@/lib/mongodb"
import Locale, { LocaleDocument } from "@/models/Locale"

interface CreateLocalesPayload {
  locales: Omit<LocaleDocument, "createdAt" | "updatedAt">[]
}

export async function POST(req: Request) {
  await connectToDb()

  const body = (await req.json()) as CreateLocalesPayload

  const created = await Locale.insertMany(body.locales, {
    ordered: false,
  })

  return NextResponse.json({
    success: true,
    data: created,
  })
}

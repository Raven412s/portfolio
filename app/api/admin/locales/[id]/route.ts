import { NextResponse } from "next/server"
import { connectToDb } from "@/lib/mongodb"
import Locale from "@/models/Locale"
import { LocaleDirection, LocaleStatus } from "@/types/locale"

interface UpdateLocalePayload {
  language?: string
  direction?: LocaleDirection
  status?: LocaleStatus
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDb()

  const { id } = await params
  const body = (await req.json()) as UpdateLocalePayload

  const locale = await Locale.findByIdAndUpdate(
    id,
    body,
    { new: true }
  )

  if (!locale) {
    return NextResponse.json(
      { success: false, message: "Locale not found" },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true,
    data: locale,
  })
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDb()

  const { id } = await params

  await Locale.findByIdAndDelete(id)

  return NextResponse.json({ success: true })
}

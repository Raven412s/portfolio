import type { NextAuthRequest } from "next-auth"
import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import { auth } from "./auth"
import { routing } from "./i18n/routing"

const intlMiddleware = createMiddleware(routing)

export default auth((request: NextAuthRequest) => {
  const session = request.auth // ✅ typed correctly

  if (request.nextUrl.pathname.startsWith("/admin") && !session) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    )
  }

  return intlMiddleware(request)
})

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
}

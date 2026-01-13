import createMiddleware from 'next-intl/middleware'; 
import { routing } from './i18n/routing'; 
import { NextRequest } from 'next/server'; 
export default function proxy(request: NextRequest) { 
  // Directly invoke the next-intl middleware 
  return createMiddleware(routing)(request); 
} 

export const config = {
   matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)' 
  };
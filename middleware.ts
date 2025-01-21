import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle authentication for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authToken = request.cookies.get('auth_token')?.value
    
    if (!authToken || authToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Handle image requests from the uploads directory
  if (request.nextUrl.pathname.startsWith('/images/uploads/')) {
    const newPath = request.nextUrl.pathname.replace('/images/uploads/', '/uploads/')
    return NextResponse.rewrite(new URL(newPath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/images/uploads/:path*'
  ],
}


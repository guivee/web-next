// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { readCookies } from './app/auth/{util}/utils'
import { UNAUTHORISED_LINK } from './app/{lib}/links'
import { IAuthObj } from './app/auth/{util}/user_util'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.redirect(new URL(UNAUTHORISED_LINK, request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*'],
}

const isAuthenticated = (request: NextRequest) => {
  const authObj: IAuthObj = readCookies(request.cookies)
  return !!authObj?.user_id
}

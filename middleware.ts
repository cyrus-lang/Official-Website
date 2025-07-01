import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const locale = request.cookies.get('CYRUS_NEXT_LOCALE')?.value || 'en';
  
  const response = NextResponse.next();
  response.headers.set('x-next-locale', locale);
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}; 
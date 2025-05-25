import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();

  // Protect all routes except public ones
  const publicRoutes = ['/', '/auth/callback'];
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  if (!user && !isPublicRoute) {
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Always allow public paths, images, and auth APIs
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check session cookie
  const sessionCookie = request.cookies.get('cs_session');
  let session: { role?: string; user_id?: string } | null = null;

  if (sessionCookie?.value) {
    try {
      session = JSON.parse(sessionCookie.value);
    } catch {
      // invalid cookie
    }
  }

  // If no session cookie, check Supabase auth tokens in cookies
  const hasSupabaseCookie = request.cookies.getAll().some(c => c.name.startsWith('sb-'));

  if (!session && !hasSupabaseCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protect admin paths
  if (pathname.startsWith('/admin')) {
    if (session && session.role !== 'admin' && session.role !== 'judge') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedPaths = ['/dashboard'];

// Public routes that should redirect to dashboard if already authenticated
const authPaths = ['/login', '/register'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get('access_token')?.value;

    // Check if the current path is protected
    const isProtectedPath = protectedPaths.some((path) =>
        pathname.startsWith(path)
    );

    // Check if the current path is an auth page
    const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

    // Redirect to login if accessing protected route without token
    if (isProtectedPath && !accessToken) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect to dashboard if accessing auth pages with valid token
    if (isAuthPath && accessToken) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};

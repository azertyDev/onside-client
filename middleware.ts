import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/dashboard') && !req.cookies.get('userInfo')) {
        return NextResponse.rewrite(new URL('/login', req.url));
    }
    if (req.nextUrl.pathname === '/dashboard' && req.cookies.get('userInfo')) {
        return NextResponse.rewrite(new URL('/dashboard/news', req.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*'],
};

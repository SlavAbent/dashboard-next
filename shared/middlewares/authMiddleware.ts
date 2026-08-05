import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';

import authConfig from '@/auth.config';

export const { auth } = NextAuth(authConfig);

export const authMiddleware = auth((req) => {
  const { pathname } = req.nextUrl;

  const isPublic =
    pathname.startsWith('/login') || pathname.startsWith('/api/auth');

  if (!req.auth && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.auth && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
});

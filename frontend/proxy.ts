import { authMiddleware } from '@/shared/middlewares/authMiddleware';

export const proxy = authMiddleware;

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon|manifest.webmanifest|sw.js).*)',
  ],
};

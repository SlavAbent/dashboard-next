import { authMiddleware } from '@/shared/middlewares/authMiddleware';

export default authMiddleware;

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

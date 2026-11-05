import type { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors/app-error.ts';

export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type SessionResolver = (
  cookie: string | undefined
) => Promise<SessionUser | null>;

export const createSessionResolver =
  (origin: string): SessionResolver =>
  async (cookie) => {
    if (!cookie) return null;

    const response = await fetch(`${origin}/api/auth/session`, {
      headers: { cookie },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) return null;

    const session: unknown = await response.json();
    if (!isSession(session)) return null;

    return session.user;
  };

const isSession = (value: unknown): value is { user: SessionUser } => {
  if (!value || typeof value !== 'object' || !('user' in value)) return false;
  const user = value.user;
  return Boolean(
    user &&
    typeof user === 'object' &&
    'id' in user &&
    typeof user.id === 'string'
  );
};

export type AuthenticatedRequest = Request & { user: SessionUser };

export const createAuthMiddleware =
  (resolveSession: SessionResolver) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const user = await resolveSession(req.headers.cookie);
      if (!user)
        throw new AppError(401, 'UNAUTHORIZED', 'Authentication required');
      (req as AuthenticatedRequest).user = user;
      next();
    } catch (error) {
      next(error);
    }
  };

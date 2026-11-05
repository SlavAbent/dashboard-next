import express, { type Router } from 'express';

import { createBoardRouter } from './modules/board/board.routes.ts';
import { createChatRouter } from './modules/chat/chat.routes.ts';
import {
  createAuthMiddleware,
  type SessionResolver,
} from './shared/auth/session.ts';
import { errorHandler } from './shared/http/error-handler.ts';

type AppDependencies = {
  resolveSession: SessionResolver;
  boardRouter?: Router;
  chatRouter?: Router;
};

export const createApp = ({
  resolveSession,
  boardRouter = createBoardRouter(),
  chatRouter = createChatRouter(),
}: AppDependencies) => {
  const app = express();

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));
  app.use(
    '/api/v1',
    express.json({ limit: '32kb' }),
    createAuthMiddleware(resolveSession)
  );
  app.use('/api/v1/board', boardRouter);
  app.use('/api/v1/messages', chatRouter);
  app.use(errorHandler);

  return app;
};

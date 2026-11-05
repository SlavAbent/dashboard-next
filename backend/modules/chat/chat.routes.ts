import { Router } from 'express';

import { ChatController } from './chat.controller.ts';

export const createChatRouter = (controller = new ChatController()) => {
  const router = Router();
  router.get('/', controller.getMessages);
  return router;
};

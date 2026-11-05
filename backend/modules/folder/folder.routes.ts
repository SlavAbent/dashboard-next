import { Router } from 'express';

import { FolderController } from './folder.controller.ts';

export const createFolderRouter = (controller = new FolderController()) => {
  const router = Router();

  router.post('/', controller.createFolder);
  router.patch('/:id', controller.updateFolder);
  router.patch('/:id/move', controller.moveFolder);
  router.delete('/:id', controller.deleteFolder);

  return router;
};

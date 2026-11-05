import { Router } from 'express';

import { createFolderRouter } from '../folder/folder.routes.ts';
import { createTaskRouter } from '../task/task.routes.ts';
import { BoardController } from './board.controller.ts';

export const createBoardRouter = (
  controller = new BoardController(),
  folderRouter = createFolderRouter(),
  taskRouter = createTaskRouter()
) => {
  const router = Router();

  router.get('/', controller.getBoard);
  router.use('/folders', folderRouter);
  router.use('/tasks', taskRouter);

  return router;
};

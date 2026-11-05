import { Router } from 'express';

import { TaskController } from './task.controller.ts';

export const createTaskRouter = (controller = new TaskController()) => {
  const router = Router();

  router.post('/', controller.createTask);
  router.patch('/:id', controller.updateTask);
  router.patch('/:id/move', controller.moveTask);
  router.delete('/:id', controller.deleteTask);

  return router;
};

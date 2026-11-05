import type { Request, Response } from 'express';

import type { AuthenticatedRequest } from '../../shared/auth/session.ts';
import {
  createTaskSchema,
  moveTaskSchema,
  taskIdParamsSchema,
  updateTaskSchema,
} from './task.schemas.ts';
import { TaskService } from './task.service.ts';

export class TaskController {
  private readonly service: TaskService;

  constructor(service = new TaskService()) {
    this.service = service;
  }

  createTask = async (req: Request, res: Response) => {
    const task = await this.service.createTask(
      userId(req),
      createTaskSchema.parse(req.body)
    );
    res.status(201).json(task);
  };

  updateTask = async (req: Request, res: Response) => {
    const { id } = taskIdParamsSchema.parse(req.params);
    res.json(
      await this.service.updateTask(
        userId(req),
        id,
        updateTaskSchema.parse(req.body)
      )
    );
  };

  moveTask = async (req: Request, res: Response) => {
    const { id } = taskIdParamsSchema.parse(req.params);
    res.json(
      await this.service.moveTask(
        userId(req),
        id,
        moveTaskSchema.parse(req.body)
      )
    );
  };

  deleteTask = async (req: Request, res: Response) => {
    const { id } = taskIdParamsSchema.parse(req.params);
    await this.service.deleteTask(userId(req), id);
    res.sendStatus(204);
  };
}

const userId = (req: Request) => (req as AuthenticatedRequest).user.id;

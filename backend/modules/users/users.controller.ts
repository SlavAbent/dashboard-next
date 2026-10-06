import type { Request, Response } from 'express';

import { validate } from '@/backend/utils/validate';

import {
  createUserSchema,
  updateUserSchema,
  userIdParamsSchema,
} from './users.schemas';
import * as service from './users.service';

export async function getUsers(req: Request, res: Response) {
  res.json(await service.getUsers());
}

export async function getUser(req: Request, res: Response) {
  const { params } = validate(userIdParamsSchema, req);
  res.json(await service.getUser(params.id));
}

export async function createUser(req: Request, res: Response) {
  const { body } = validate(createUserSchema, req);
  res.status(201).json(await service.createUser(body));
}

export async function updateUser(req: Request, res: Response) {
  const { params, body } = validate(updateUserSchema, req);
  res.json(await service.updateUser(params.id, body));
}

export async function deleteUser(req: Request, res: Response) {
  const { params } = validate(userIdParamsSchema, req);
  await service.deleteUser(params.id);
  res.status(204).send();
}

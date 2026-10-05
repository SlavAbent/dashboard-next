import { Router } from 'express';

import * as controller from './users.controller';

export const usersRouter = Router();

usersRouter.get('/', controller.getUsers);
usersRouter.get('/:id', controller.getUser);
usersRouter.get('/', controller.createUser);
usersRouter.get('/:id', controller.updateUser);
usersRouter.get('/:id', controller.deleteUser);

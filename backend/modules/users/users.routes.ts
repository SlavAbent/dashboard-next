import { Router } from 'express';

import * as controller from './users.controller';

export const usersRouter = Router();

usersRouter.get('/', controller.getUsers);
usersRouter.get('/:id', controller.getUser);
usersRouter.post('/', controller.createUser);
usersRouter.patch('/:id', controller.updateUser);
usersRouter.delete('/:id', controller.deleteUser);

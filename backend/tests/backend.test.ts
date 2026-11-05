import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { test } from 'node:test';

import { Router } from 'express';

import { createApp } from '../app.ts';
import { createBoardRouter } from '../modules/board/board.routes.ts';
import { BoardService } from '../modules/board/board.service.ts';
import type { BoardSnapshot } from '../modules/board/board.types.ts';
import { ChatService } from '../modules/chat/chat.service.ts';
import { FolderService } from '../modules/folder/folder.service.ts';
import { TaskService } from '../modules/task/task.service.ts';

const emptyBoard: BoardSnapshot = { columns: [], folders: [], tasks: [] };

test('BoardService bootstraps a missing board exactly once', async () => {
  let snapshot: BoardSnapshot | null = null;
  let bootstrapCalls = 0;
  const repository = boardRepository({
    findSnapshot: async () => snapshot,
    createDefaultBoard: async () => {
      bootstrapCalls += 1;
      snapshot = emptyBoard;
    },
  });

  const board = await new BoardService(repository).getBoard('user-1');

  assert.deepEqual(board, emptyBoard);
  assert.equal(bootstrapCalls, 1);
});

test('FolderService hides missing and foreign resources behind NOT_FOUND', async () => {
  const service = new FolderService({
    create: async () => null,
    update: async () => null,
    move: async () => null,
    delete: async () => false,
  });

  await assert.rejects(
    () => service.deleteFolder('user-1', 'foreign-folder'),
    (error: unknown) =>
      error instanceof Error && 'code' in error && error.code === 'NOT_FOUND'
  );
});

test('TaskService hides missing and foreign resources behind NOT_FOUND', async () => {
  const service = new TaskService({
    create: async () => null,
    update: async () => null,
    move: async () => null,
    delete: async () => false,
  });

  await assert.rejects(
    () => service.deleteTask('user-1', 'foreign-task'),
    (error: unknown) =>
      error instanceof Error && 'code' in error && error.code === 'NOT_FOUND'
  );
});

test('ChatService trims and validates message text before persistence', async () => {
  let persistedText = '';
  const service = new ChatService({
    findAll: async () => [],
    create: async (userId, text) => {
      persistedText = text;
      return {
        id: 'message-1',
        userId,
        text,
        createdAt: new Date(0).toISOString(),
        author: { id: userId, firstName: 'Test', lastName: 'User' },
      };
    },
  });

  await service.createMessage('user-1', { text: '  hello  ' });
  assert.equal(persistedText, 'hello');
  assert.throws(() => service.createMessage('user-1', { text: '   ' }));
});

test('Express API authenticates protected routes and leaves health public', async () => {
  const boardRouter = Router();
  boardRouter.get('/', (req, res) => {
    res.json({
      userId: (req as typeof req & { user: { id: string } }).user.id,
    });
  });
  const chatRouter = Router();
  const app = createApp({
    resolveSession: async (cookie) =>
      cookie ? { id: 'user-1', name: 'Test User' } : null,
    boardRouter,
    chatRouter,
  });
  const server = createServer(app);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  assert(address && typeof address === 'object');
  const origin = `http://127.0.0.1:${address.port}`;

  try {
    const health = await fetch(`${origin}/health`);
    assert.equal(health.status, 200);

    const unauthorized = await fetch(`${origin}/api/v1/board`);
    assert.equal(unauthorized.status, 401);

    const authorized = await fetch(`${origin}/api/v1/board`, {
      headers: { cookie: 'session=test' },
    });
    assert.equal(authorized.status, 200);
    assert.deepEqual(await authorized.json(), { userId: 'user-1' });
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
});

test('Board router preserves folder and task API prefixes', async () => {
  const folderRouter = Router();
  folderRouter.get('/route-check', (_req, res) => res.sendStatus(204));
  const taskRouter = Router();
  taskRouter.get('/route-check', (_req, res) => res.sendStatus(204));
  const app = createApp({
    resolveSession: async () => ({ id: 'user-1', name: 'Test User' }),
    boardRouter: createBoardRouter(undefined, folderRouter, taskRouter),
    chatRouter: Router(),
  });
  const server = createServer(app);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  assert(address && typeof address === 'object');
  const origin = `http://127.0.0.1:${address.port}`;

  try {
    const folderResponse = await fetch(
      `${origin}/api/v1/board/folders/route-check`
    );
    const taskResponse = await fetch(
      `${origin}/api/v1/board/tasks/route-check`
    );

    assert.equal(folderResponse.status, 204);
    assert.equal(taskResponse.status, 204);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
});

const boardRepository = (
  overrides: Partial<ConstructorParameters<typeof BoardService>[0]> = {}
): NonNullable<ConstructorParameters<typeof BoardService>[0]> => ({
  findSnapshot: async () => emptyBoard,
  createDefaultBoard: async () => undefined,
  ...overrides,
});

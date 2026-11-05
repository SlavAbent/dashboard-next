import { cookies } from 'next/headers';
import { cache } from 'react';

import type { Column } from '@/entities/column';
import type { TaskFolder } from '@/entities/folder';
import type { Task } from '@/entities/task';

export type BoardSnapshot = {
  columns: Column[];
  folders: TaskFolder[];
  tasks: Task[];
};

export const getBoard = cache(async (): Promise<BoardSnapshot> => {
  const cookieStore = await cookies();
  const port = process.env.PORT ?? '3000';
  const origin = process.env.APP_ORIGIN ?? `http://localhost:${port}`;
  const response = await fetch(`${origin}/api/v1/board`, {
    headers: { cookie: cookieStore.toString() },
    cache: 'no-store',
  });

  if (!response.ok)
    throw new Error(`Failed to fetch board: ${response.status}`);
  return response.json();
});

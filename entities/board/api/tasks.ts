'use server';

import type { Task } from '@/entities/board/model/types';
import { getNextColumn } from '@/entities/board/lib/get-next-column';
import { tasksApi } from '@/shared/_api/instances';
import { patchTask } from '@/shared/_api/patchTask';

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(tasksApi, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed fetch tasks data');
  }

  return response.json();
}

export async function updateTask(id: number, currentColumn: string) {
  return patchTask(id, getNextColumn(currentColumn));
}

export async function updateTaskColumn(id: number, column: string) {
  return patchTask(id, column);
}

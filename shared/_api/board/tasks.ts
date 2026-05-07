'use server';

import { Task } from '@/widgets/Board/types';
import { getNextColumn } from '@/widgets/Board/shared/getNextColumn';
import { tasksApi } from '@/shared/_api/instances';
import { patchTask } from '@/shared/_api/patchTask';

export async function getTasks(): Promise<Task[]> {
  const tasks = await fetch(tasksApi, {
    next: {
      revalidate: 0,
    },
  });

  if (!tasks.ok) {
    throw new Error('Failed fetch tasks data');
  }

  return tasks.json();
}

export async function updateTask(id: number, currentColumn: string) {
  return patchTask(id, getNextColumn(currentColumn));
}

export async function updateTaskColumn(id: number, column: string) {
  return patchTask(id, column);
}

'use server';

import { Task } from '@/widgets/Board/types';
import { getNextColumn } from '@/widgets/Board/shared/getNextColumn';
import { revalidatePath } from 'next/cache';

export async function getTasks(): Promise<Task[]> {
  const tasks = await fetch('http://localhost:4001/tasks', {
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
  const nextColumn = getNextColumn(currentColumn);

  await fetch(`http://localhost:4001/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      column: nextColumn,
      completed: nextColumn === 'completed',
    }),
  });

  revalidatePath('/tasks');
}

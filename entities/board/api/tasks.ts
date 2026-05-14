'use server';

import type { Task } from '@/entities/board/model/types/list-types';
import { getNextColumn } from '@/entities/board/lib/get-next-column';
import { tasksApi } from '@/shared/_api/instances';
import { patchTask } from '@/shared/_api/tasks/patchTask';

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

export async function addTask(task: Task) {
  const response = await fetch(tasksApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('Failed adding task');
  }

  return response.json();
}

export async function deleteTask(id: number) {
  const response = await fetch(`${tasksApi}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }

  return true;
}

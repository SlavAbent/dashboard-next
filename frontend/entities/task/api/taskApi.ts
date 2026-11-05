import type { EntityId } from '@lib/sameId';

import { CreateTask, Task } from '@/entities/task/model/task.types';
import { tasksApi } from '@/shared/api/instances';

export async function createTask(task: CreateTask): Promise<Task> {
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

export async function updateTask(
  id: EntityId,
  data: Partial<Pick<Task, 'text' | 'completed' | 'taskFolderId' | 'tags'>>
): Promise<Task> {
  const response = await fetch(`${tasksApi}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }

  return response.json();
}

export async function moveTask(
  id: EntityId,
  data: Pick<Task, 'taskFolderId' | 'order'>
): Promise<Task> {
  const response = await fetch(`${tasksApi}/${id}/move`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Failed to move task');
  return response.json();
}

export async function deleteTask(id: EntityId) {
  const response = await fetch(`${tasksApi}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }

  return true;
}

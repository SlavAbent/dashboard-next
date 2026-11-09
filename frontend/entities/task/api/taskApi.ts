import type { EntityId } from '@lib/sameId';

import { CreateTask, Task } from '@/entities/task/model/task.types';
import { tasksApi } from '@/shared/api/instances';

export class TaskNameConflictError extends Error {
  constructor() {
    super('A task with this name already exists');
    this.name = 'TaskNameConflictError';
  }
}

const throwTaskApiError = async (response: Response, fallback: string) => {
  const body = await response.json().catch(() => null);

  if (response.status === 409 && body?.error?.code === 'TASK_NAME_CONFLICT') {
    throw new TaskNameConflictError();
  }

  throw new Error(fallback);
};

export async function createTask(task: CreateTask): Promise<Task> {
  const response = await fetch(tasksApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    await throwTaskApiError(response, 'Failed adding task');
  }

  return response.json();
}

export async function updateTask(
  id: EntityId,
  data: Partial<
    Pick<
      Task,
      | 'text'
      | 'completed'
      | 'taskFolderId'
      | 'tags'
      | 'startDate'
      | 'endDate'
      | 'priority'
    >
  >
): Promise<Task> {
  const response = await fetch(`${tasksApi}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    await throwTaskApiError(response, 'Failed to update task');
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

import { CreateTask, Task } from '@/entities/task/model/task.types';
import { tasksApi } from '@/shared/api/instances';
import type { EntityId } from '@/shared/lib/sameId';

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(tasksApi, {
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    throw new Error('Failed fetch tasks');
  }

  return response.json();
}

export async function createTask(task: CreateTask): Promise<Task> {
  const response = await fetch(tasksApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...task,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
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
    body: JSON.stringify({
      ...data,
      updatedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }

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

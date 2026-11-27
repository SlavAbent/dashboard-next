import { CreateTask, Task } from '@/entities/task/model/task.types';
import { tasksApi } from '@/shared/api/instances';
import { request, requestJson } from '@/shared/api/request';

export class TaskNameConflictError extends Error {
  constructor() {
    super('A task with this name already exists');
    this.name = 'TaskNameConflictError';
  }
}

const getTaskApiError = async (response: Response, fallback: string) => {
  const body = await response.json().catch(() => null);

  if (response.status === 409 && body?.error?.code === 'TASK_NAME_CONFLICT') {
    return new TaskNameConflictError();
  }

  return new Error(fallback);
};

export async function createTask(task: CreateTask): Promise<Task> {
  return requestJson<Task>(tasksApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
    errorMessage: 'Failed adding task',
    mapError: (response) => getTaskApiError(response, 'Failed adding task'),
  });
}

export async function updateTask(
  id: string,
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
  return requestJson<Task>(`${tasksApi}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    errorMessage: 'Failed to update task',
    mapError: (response) => getTaskApiError(response, 'Failed to update task'),
  });
}

export async function moveTask(
  id: string,
  data: Pick<Task, 'taskFolderId' | 'order'>
): Promise<Task> {
  return requestJson<Task>(`${tasksApi}/${id}/move`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    errorMessage: 'Failed to move task',
  });
}

export async function deleteTask(id: string) {
  await request(`${tasksApi}/${id}`, {
    method: 'DELETE',
    errorMessage: 'Failed to delete task',
  });

  return true;
}

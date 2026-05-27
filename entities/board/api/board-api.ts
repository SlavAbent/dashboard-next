import {
  Column,
  CreateFolder,
  CreateTask,
  Task,
  TasksFolder,
  UpdateFolderPayload,
} from '@/entities/board/model/types/list-types';
import { getNextColumn } from '@/entities/board/lib/get-next-column';
import { updateFolders } from '@/entities/board/api/update-folder';
import { columnsApi, tasksApi, tasksFolderApi } from '@/shared/_api/instances';
import type { EntityId } from '@/shared/lib/same-id';

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(tasksApi, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed fetch tasks');
  }

  return response.json();
}

export async function getColumns(): Promise<Column[]> {
  const response = await fetch(columnsApi, {
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new Error('No columns found.');
  }

  return response.json();
}

export async function getTasksFolders(): Promise<TasksFolder[]> {
  const response = await fetch(tasksFolderApi, {
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new Error('No task folders found.');
  }

  return response.json();
}

export async function updateFolder(id: EntityId, currentColumn: string) {
  return updateFolders(id, { columnId: getNextColumn(currentColumn) });
}

export async function updateFolderColumn(id: EntityId, column: string) {
  return updateFolders(id, { columnId: column });
}

export async function updateFolderDetails(
  id: EntityId,
  data: UpdateFolderPayload
) {
  return updateFolders(id, data);
}

export async function createFolderTask(
  tasksFolder: CreateFolder
): Promise<TasksFolder> {
  const response = await fetch(tasksFolderApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tasksFolder),
  });

  if (!response.ok) {
    throw new Error('Failed to add folder');
  }

  return response.json();
}

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
  data: Partial<Pick<Task, 'text' | 'completed' | 'tasksFolderId' | 'tags'>>
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

export async function deleteTask(id: EntityId) {
  const response = await fetch(`${tasksApi}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }

  return true;
}

export async function deleteFolder(id: EntityId) {
  const response = await fetch(`${tasksFolderApi}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete folder');
  }

  return true;
}

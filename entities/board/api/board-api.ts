import {
  Column,
  CreateFolder,
  CreateTask,
  Task,
  TaskFolder,
  UpdateFolderPayload,
} from '@/entities/board/model/types/list-types';
import { getNextColumn } from '@/entities/board/lib/get-next-column';
import { updateFolders } from '@/entities/board/api/update-folder';
import {
  columnsApi,
  tasksApi,
  taskFoldersApi,
} from '@/shared/_api/instances';
import type { EntityId } from '@/shared/lib/same-id';

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(tasksApi, {
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    throw new Error('Failed fetch tasks');
  }

  return response.json();
}

export async function getColumns(): Promise<Column[]> {
  const response = await fetch(columnsApi, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('No columns found.');
  }

  return response.json();
}

export async function getTaskFolders(): Promise<TaskFolder[]> {
  const response = await fetch(taskFoldersApi, {
    next: { revalidate: 30 },
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
  taskFolder: CreateFolder
): Promise<TaskFolder> {
  const response = await fetch(taskFoldersApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskFolder),
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

export async function deleteFolder(id: EntityId) {
  const response = await fetch(`${taskFoldersApi}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete folder');
  }

  return true;
}

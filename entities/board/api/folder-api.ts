import {
  Column,
  CreateFolder,
  CreateTask,
  Task,
  TaskFolder,
  UpdateFolderPayload,
} from '@/entities/board/model/types/list-types';
import { columnsApi, taskFoldersApi, tasksApi } from '@/shared/_api/instances';
import type { EntityId } from '@/shared/lib/same-id';
import { getNextColumn } from '@/entities/board/lib/get-next-column';

export async function updateFolders(id: EntityId, data: UpdateFolderPayload) {
  const response = await fetch(`${taskFoldersApi}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update folder');
  }

  return response.json();
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

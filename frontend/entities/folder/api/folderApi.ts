import {
  CreateFolder,
  TaskFolder,
  UpdateFolderPayload,
} from '@/entities/folder/model/folder.types';
import { taskFoldersApi } from '@/shared/api/instances';
import type { EntityId } from '@/shared/lib/sameId';

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

export async function getTaskFolders(): Promise<TaskFolder[]> {
  const response = await fetch(taskFoldersApi, {
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    throw new Error('No task folders found.');
  }

  return response.json();
}

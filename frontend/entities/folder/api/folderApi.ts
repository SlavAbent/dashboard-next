import {
  CreateFolder,
  TaskFolder,
  UpdateFolderPayload,
} from '@/entities/folder/model/folder.types';
import { taskFoldersApi } from '@/shared/api/instances';
import { request, requestJson } from '@/shared/api/request';

export async function updateFolders(
  id: string,
  data: UpdateFolderPayload
): Promise<TaskFolder> {
  const endpoint = data.columnId
    ? `${taskFoldersApi}/${id}/move`
    : `${taskFoldersApi}/${id}`;
  return requestJson<TaskFolder>(endpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    errorMessage: 'Failed to update folder',
  });
}

export async function deleteFolder(id: string) {
  await request(`${taskFoldersApi}/${id}`, {
    method: 'DELETE',
    errorMessage: 'Failed to delete folder',
  });

  return true;
}

export async function updateFolderColumn(id: string, column: string) {
  return updateFolders(id, { columnId: column });
}

export async function updateFolderDetails(
  id: string,
  data: UpdateFolderPayload
) {
  const details: UpdateFolderPayload = {
    title: data.title,
    order: data.order,
    startDate: data.startDate,
    endDate: data.endDate,
    priority: data.priority,
  };
  return requestJson<TaskFolder>(`${taskFoldersApi}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
    errorMessage: 'Failed to update folder details',
  });
}

export async function createFolderTask(
  taskFolder: CreateFolder
): Promise<TaskFolder> {
  return requestJson<TaskFolder>(taskFoldersApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskFolder),
    errorMessage: 'Failed to add folder',
  });
}

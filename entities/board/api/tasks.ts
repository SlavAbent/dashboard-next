'use server';

import {
  CreateFolder,
  Task,
  TasksFolder,
} from '@/entities/board/model/types/list-types';
import { getNextColumn } from '@/entities/board/lib/get-next-column';
import { tasksApi, tasksFolderApi } from '@/shared/_api/instances';
import { updateFolders } from '@/shared/_api/folder/updateFolders';

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(tasksApi, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed fetch folder data');
  }

  return response.json();
}

export async function updateFolder(id: number, currentColumn: string) {
  return await updateFolders(id, getNextColumn(currentColumn));
}

export async function updateFolderColumn(id: number, column: string) {
  return updateFolders(id, column);
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
    throw new Error('Failed to add folder for folder');
  }

  return response.json();
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

export async function deleteFolder(id: number) {
  const response = await fetch(`${tasksFolderApi}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete folder');
  }

  return true;
}

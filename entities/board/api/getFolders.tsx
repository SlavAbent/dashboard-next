import type { TasksFolder } from '@/entities/board/model/types/list-types';
import { tasksFolderApi } from '@/shared/_api/instances';

export async function getFolders(): Promise<TasksFolder[]> {
  const columns = await fetch(tasksFolderApi, {
    cache: 'no-cache',
  });

  if (!columns.ok) {
    throw new Error('No folders found.');
  }

  return columns.json();
}

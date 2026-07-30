import type { BoardColumn, Column } from '@/entities/column';
import type { BoardFolder, TaskFolder } from '@/entities/folder';
import type { Task } from '@/entities/task';
import { toIdString } from '@/shared/lib/sameId';

export const groupTasksToFolders = (
  tasks: Task[],
  columns: Column[],
  taskFolders: TaskFolder[]
): BoardColumn[] => {
  const columnsMap: Record<string, BoardColumn> = {};
  const foldersMap: Record<string, BoardFolder> = {};

  for (const column of columns) {
    columnsMap[column.id] = {
      ...column,
      folders: [],
    };
  }

  for (const folder of taskFolders) {
    const folderData: BoardFolder = {
      ...folder,
      tasks: [],
    };

    foldersMap[toIdString(folder.id)] = folderData;

    if (columnsMap[folder.columnId]) {
      columnsMap[folder.columnId].folders.push(folderData);
    }
  }

  for (const task of tasks) {
    const folder = foldersMap[toIdString(task.taskFolderId)];

    if (folder) {
      folder.tasks.push(task);
    }
  }

  return Object.values(columnsMap).sort((a, b) => a.order - b.order);
};

'use client';

import {
  BoardColumn,
  BoardFolder,
  Column,
  Task,
  TasksFolder,
} from '@/entities/board/model/types/list-types';

export function groupTasksToFolders(
  tasks: Task[],
  columns: Column[],
  tasksFolders: TasksFolder[]
): BoardColumn[] {
  const columnsMap: Record<string, BoardColumn> = {};
  const foldersMap: Record<number, BoardFolder> = {};

  for (const column of columns) {
    columnsMap[column.id] = {
      ...column,
      folders: [],
    };
  }

  for (const folder of tasksFolders) {
    const folderData: BoardFolder = {
      ...folder,
      tasks: [],
    };

    foldersMap[folder.id] = folderData;

    if (columnsMap[folder.columnId]) {
      columnsMap[folder.columnId].folders.push(folderData);
    }
  }

  for (const task of tasks) {
    const folder = foldersMap[task.tasksFolderId];

    if (folder) {
      folder.tasks.push(task);
    }
  }

  return Object.values(columnsMap).sort((a, b) => a.order - b.order);
}

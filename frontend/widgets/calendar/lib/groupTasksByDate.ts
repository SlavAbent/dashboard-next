import { addDays, format, isValid, parseISO } from 'date-fns';

import type { TaskFolder } from '@/entities/folder';
import type { Task } from '@/entities/task';
import type { Schedule } from '@/shared/model/schedule';

const groupScheduledItemsByDate = <T extends Schedule>(items: T[]) => {
  const grouped = new Map<string, T[]>();

  items.forEach((item) => {
    if (!item.startDate || !item.endDate) return;

    const start = parseISO(item.startDate);
    const end = parseISO(item.endDate);

    if (!isValid(start) || !isValid(end) || start > end) return;

    for (let day = start; day <= end; day = addDays(day, 1)) {
      const key = format(day, 'yyyy-MM-dd');
      grouped.set(key, [...(grouped.get(key) ?? []), item]);
    }
  });

  return grouped;
};

export const groupTasksByDate = (tasks: Task[]) =>
  groupScheduledItemsByDate(tasks);

export const groupFoldersByDate = (
  folders: TaskFolder[],
  tasksByDate: Map<string, Task[]> = new Map()
) => {
  const grouped = groupScheduledItemsByDate(folders);
  const foldersById = new Map(folders.map((folder) => [folder.id, folder]));

  tasksByDate.forEach((tasks, date) => {
    const foldersForDate = grouped.get(date) ?? [];
    const folderIds = new Set(foldersForDate.map((folder) => folder.id));

    tasks.forEach((task) => {
      const folder = foldersById.get(task.taskFolderId);
      if (!folder || folderIds.has(folder.id)) return;

      foldersForDate.push(folder);
      folderIds.add(folder.id);
    });

    if (foldersForDate.length > 0) grouped.set(date, foldersForDate);
  });

  return grouped;
};

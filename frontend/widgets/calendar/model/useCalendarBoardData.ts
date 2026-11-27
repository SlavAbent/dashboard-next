import { useEffect, useMemo, useRef } from 'react';

import { useBoardStore } from '@/entities/board';
import { useCalendarStore } from '@/entities/calendar';
import type { Column } from '@/entities/column';
import type { TaskFolder } from '@/entities/folder';
import type { Task } from '@/entities/task';
import { filterCalendarTasks } from '@/widgets/calendar/lib/calendarTasks';
import {
  groupFoldersByDate,
  groupTasksByDate,
} from '@/widgets/calendar/lib/groupTasksByDate';

type UseCalendarBoardDataOptions = {
  tasks: Task[];
  columns: Column[];
  folders: TaskFolder[];
};

export const useCalendarBoardData = ({
  tasks,
  columns,
  folders,
}: UseCalendarBoardDataOptions) => {
  const hydratedRef = useRef(false);
  const currentMonth = useCalendarStore((state) => state.currentMonth);
  const viewMode = useCalendarStore((state) => state.viewMode);
  const filters = useCalendarStore((state) => state.filters);
  const storeTasks = useBoardStore((state) => state.tasks);
  const storeFolders = useBoardStore((state) => state.taskFolders);
  const storeColumns = useBoardStore((state) => state.columns);
  const setBoardData = useBoardStore((state) => state.setBoardData);

  useEffect(() => {
    if (hydratedRef.current) return;

    setBoardData(tasks, columns, folders);
    hydratedRef.current = true;
  }, [columns, folders, setBoardData, tasks]);

  const filteredTasks = useMemo(
    () => filterCalendarTasks(storeTasks, storeFolders, filters),
    [filters, storeFolders, storeTasks]
  );
  const filteredFolders = useMemo(
    () =>
      storeFolders.filter(
        (folder) =>
          (filters.folderId === 'all' || folder.id === filters.folderId) &&
          (filters.columnId === 'all' || folder.columnId === filters.columnId)
      ),
    [filters.columnId, filters.folderId, storeFolders]
  );
  const tasksByDate = useMemo(
    () => groupTasksByDate(filteredTasks),
    [filteredTasks]
  );
  const foldersByDate = useMemo(
    () => groupFoldersByDate(filteredFolders, tasksByDate),
    [filteredFolders, tasksByDate]
  );

  return {
    currentMonth,
    viewMode,
    storeTasks,
    storeFolders,
    storeColumns,
    tasksByDate,
    foldersByDate,
  };
};

'use client';

import { useEffect, useMemo, useRef } from 'react';

import { useBoardStore } from '@/entities/board';
import { useCalendarStore } from '@/entities/calendar';
import type { Column } from '@/entities/column';
import type { TaskFolder } from '@/entities/folder';
import type { Task } from '@/entities/task';
import { BoardModals, useBoardModalStore } from '@/features/boardModal';
import { notifications } from '@/shared/lib/notifications';
import {
  filterCalendarTasks,
  moveTaskScheduleToDate,
} from '@/widgets/calendar/lib/calendarTasks';
import {
  groupFoldersByDate,
  groupTasksByDate,
} from '@/widgets/calendar/lib/groupTasksByDate';
import { CalendarToolbar } from '@/widgets/calendar/ui/calendarToolbar';
import { MonthCalendarGrid } from '@/widgets/calendar/ui/monthCalendarGrid';

type CalendarHydratorProps = {
  tasks: Task[];
  columns: Column[];
  folders: TaskFolder[];
};

export const CalendarHydrator = ({
  tasks,
  columns,
  folders,
}: CalendarHydratorProps) => {
  const hydratedRef = useRef(false);
  const currentMonth = useCalendarStore((state) => state.currentMonth);
  const viewMode = useCalendarStore((state) => state.viewMode);
  const filters = useCalendarStore((state) => state.filters);
  const storeTasks = useBoardStore((state) => state.tasks);
  const storeFolders = useBoardStore((state) => state.taskFolders);
  const storeColumns = useBoardStore((state) => state.columns);
  const setBoardData = useBoardStore((state) => state.setBoardData);
  const addTask = useBoardStore((state) => state.addTask);
  const editTask = useBoardStore((state) => state.editTask);
  const toggleTask = useBoardStore((state) => state.toggleTask);
  const removeTask = useBoardStore((state) => state.removeTask);
  const openCreateTask = useBoardModalStore((state) => state.openCreateTask);
  const openEditTask = useBoardModalStore((state) => state.openEditTask);
  const openEditFolder = useBoardModalStore((state) => state.openEditFolder);

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

  const moveTaskToDate = async (taskId: string, date: string) => {
    const task = storeTasks.find((item) => item.id === taskId);
    if (!task) return;

    try {
      await notifications.task.run('move', () =>
        editTask(task.id, moveTaskScheduleToDate(task, date))
      );
    } catch {
      // The error notification is handled by the notification factory.
    }
  };

  const moveTaskToFolder = async (taskId: string, folderId: string) => {
    try {
      await notifications.task.run('move', () =>
        editTask(taskId, { taskFolderId: folderId })
      );
    } catch {
      // The error notification is handled by the notification factory.
    }
  };

  const toggleCalendarTask = async (taskId: string) => {
    const task = storeTasks.find((item) => item.id === taskId);
    if (!task) return;

    try {
      await notifications.task.run(task.completed ? 'reopen' : 'complete', () =>
        toggleTask(taskId)
      );
    } catch {
      // The store has already restored the previous task state.
    }
  };

  const deleteCalendarTask = async (taskId: string) => {
    try {
      await notifications.task.run('delete', () => removeTask(taskId));
    } catch {
      // The error notification is handled by the notification factory.
    }
  };

  const quickCreateTask = async (date: string, text: string) => {
    const folder =
      storeFolders.find((item) => item.columnId === 'planning') ??
      storeFolders[0];
    if (!folder) return;

    const nextOrder =
      Math.max(
        0,
        ...storeTasks
          .filter((task) => task.taskFolderId === folder.id)
          .map((task) => task.order)
      ) + 1;

    try {
      await notifications.task.run('create', () =>
        addTask({
          text,
          tags: [],
          taskFolderId: folder.id,
          completed: false,
          order: nextOrder,
          startDate: date,
          endDate: date,
          priority: 'none',
        })
      );
    } catch {
      // The error notification is handled by the notification factory.
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col p-3 sm:p-4 md:p-6">
      <CalendarToolbar columns={storeColumns} folders={storeFolders} />
      <div className="min-h-0 flex-1 overflow-auto">
        <div className="flex min-h-full min-w-[56rem]">
          <MonthCalendarGrid
            currentMonth={currentMonth}
            viewMode={viewMode}
            tasksByDate={tasksByDate}
            foldersByDate={foldersByDate}
            onCreateTask={(date, folderId) => openCreateTask(folderId, date)}
            onEditTask={openEditTask}
            onEditFolder={(folderId, columnId) =>
              openEditFolder(folderId, columnId)
            }
            onMoveTaskToDate={(taskId, date) =>
              void moveTaskToDate(taskId, date)
            }
            onMoveTaskToFolder={(taskId, folderId) =>
              void moveTaskToFolder(taskId, folderId)
            }
            onToggleTask={(taskId) => void toggleCalendarTask(taskId)}
            onDeleteTask={(taskId) => void deleteCalendarTask(taskId)}
            onQuickCreateTask={(date, text) => void quickCreateTask(date, text)}
          />
        </div>
      </div>
      <BoardModals defaultNewFolderColumnId="planning" />
    </div>
  );
};

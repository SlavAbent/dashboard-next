import { differenceInCalendarDays, format, parseISO } from 'date-fns';

import type { CalendarFilters } from '@/entities/calendar';
import type { TaskFolder } from '@/entities/folder';
import type { Task } from '@/entities/task';

export const filterCalendarTasks = (
  tasks: Task[],
  folders: TaskFolder[],
  filters: CalendarFilters
) => {
  const foldersById = new Map(folders.map((folder) => [folder.id, folder]));

  return tasks.filter((task) => {
    const folder = foldersById.get(task.taskFolderId);

    if (filters.hideCompleted && task.completed) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false;
    }
    if (filters.folderId !== 'all' && task.taskFolderId !== filters.folderId) {
      return false;
    }
    if (filters.columnId !== 'all' && folder?.columnId !== filters.columnId) {
      return false;
    }

    return true;
  });
};

export const moveTaskScheduleToDate = (task: Task, targetDate: string) => {
  if (!task.startDate || !task.endDate) {
    return { startDate: targetDate, endDate: targetDate };
  }

  const duration = differenceInCalendarDays(
    parseISO(task.endDate),
    parseISO(task.startDate)
  );
  const target = parseISO(targetDate);
  const end = new Date(target);
  end.setDate(end.getDate() + Math.max(0, duration));

  return {
    startDate: targetDate,
    endDate: format(end, 'yyyy-MM-dd'),
  };
};

export const isTaskOverdue = (task: Task, today = new Date()) => {
  if (task.completed || !task.endDate) return false;
  return task.endDate < format(today, 'yyyy-MM-dd');
};

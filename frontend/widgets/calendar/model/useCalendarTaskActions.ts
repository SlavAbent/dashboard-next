import { getNextOrder, useBoardStore } from '@/entities/board';
import type { TaskFolder } from '@/entities/folder';
import type { Task } from '@/entities/task';
import { useBoardModalStore } from '@/features/boardModal';
import { notifications } from '@/shared/lib/notifications';
import { moveTaskScheduleToDate } from '@/widgets/calendar/lib/calendarTasks';

type UseCalendarTaskActionsOptions = {
  tasks: Task[];
  folders: TaskFolder[];
};

export const useCalendarTaskActions = ({
  tasks,
  folders,
}: UseCalendarTaskActionsOptions) => {
  const addTask = useBoardStore((state) => state.addTask);
  const editTask = useBoardStore((state) => state.editTask);
  const toggleTask = useBoardStore((state) => state.toggleTask);
  const removeTask = useBoardStore((state) => state.removeTask);
  const openCreateTask = useBoardModalStore((state) => state.openCreateTask);
  const openEditTask = useBoardModalStore((state) => state.openEditTask);
  const openEditFolder = useBoardModalStore((state) => state.openEditFolder);

  const moveTaskToDate = async (taskId: string, date: string) => {
    const task = tasks.find((item) => item.id === taskId);
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
    const task = tasks.find((item) => item.id === taskId);
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
      folders.find((item) => item.columnId === 'planning') ?? folders[0];
    if (!folder) return;

    const nextOrder = getNextOrder(
      tasks.filter((task) => task.taskFolderId === folder.id)
    );

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

  return {
    openCreateTask,
    openEditTask,
    openEditFolder,
    moveTaskToDate,
    moveTaskToFolder,
    toggleCalendarTask,
    deleteCalendarTask,
    quickCreateTask,
  };
};

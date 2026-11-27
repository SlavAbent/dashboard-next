import { getNextOrder, useBoardStore } from '@/entities/board';
import { useBoardModalStore } from '@/features/boardModal';
import { TaskFormValues } from '@/features/boardModal/schema/taskSchema';
import { notifications } from '@/shared/lib/notifications';

export const useCreateTask = () => {
  const { addTask, tasks } = useBoardStore();
  const { closeModal } = useBoardModalStore();

  return async (data: TaskFormValues) => {
    const nextOrder = getNextOrder(
      tasks.filter((task) => task.taskFolderId === data.folderId)
    );

    await notifications.task.run('create', () =>
      addTask({
        text: data.taskValue,
        tags: [],
        taskFolderId: data.folderId,
        completed: false,
        order: nextOrder,
        startDate: data.startDate ?? null,
        endDate: data.endDate ?? null,
        priority: data.priority,
      })
    );

    closeModal();
  };
};

import { useBoardStore } from '@/entities/board';
import { useBoardModalStore } from '@/features/board-modal';
import { TaskFormValues } from '@/features/board-modal/schema/task-schema';
import { sameId } from '@/shared/lib/same-id';

export const useCreateTask = () => {
  const { addTask, tasks } = useBoardStore();
  const { closeModal } = useBoardModalStore();

  return async (data: TaskFormValues) => {
    const nextOrder =
      tasks.filter((task) => sameId(task.taskFolderId, data.folderId)).length +
      1;

    await addTask({
      text: data.taskValue,
      tags: [],
      taskFolderId: String(data.folderId),
      completed: false,
      order: nextOrder,
    });

    closeModal();
  };
};

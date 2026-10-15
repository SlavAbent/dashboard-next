import { useBoardStore } from '@/entities/board';
import { useBoardModalStore } from '@/features/boardModal';
import { TaskFormValues } from '@/features/boardModal/schema/taskSchema';

import { sameId } from '../../../../lib/sameId';

export const useCreateTask = () => {
  const { addTask, tasks } = useBoardStore();
  const { closeModal } = useBoardModalStore();

  return async (data: TaskFormValues) => {
    const nextOrder =
      Math.max(
        0,
        ...tasks
          .filter((task) => sameId(task.taskFolderId, data.folderId))
          .map((task) => task.order)
      ) + 1;

    await addTask({
      text: data.taskValue,
      tags: [],
      taskFolderId: data.folderId,
      completed: false,
      order: nextOrder,
    });

    closeModal();
  };
};

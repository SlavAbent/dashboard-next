import { EntityId } from '@lib/sameId';

import { useBoardStore } from '@/entities/board';
import { useBoardModalStore } from '@/features/boardModal';
import { TaskFormValues } from '@/features/boardModal/schema/taskSchema';
import { notifications } from '@/shared/lib/notifications';

export const useEditTask = () => {
  const { editTask } = useBoardStore();
  const { closeModal } = useBoardModalStore();

  return async (taskId: EntityId, data: TaskFormValues) => {
    await notifications.task.run('update', () =>
      editTask(taskId, {
        text: data.taskValue,
        taskFolderId: data.folderId,
        completed: data.completed,
        startDate: data.startDate ?? null,
        endDate: data.endDate ?? null,
        priority: data.priority,
      })
    );

    closeModal();
  };
};

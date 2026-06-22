import { useBoardStore } from '@/entities/board';
import { useBoardModalStore } from '@/features/board-modal';
import { EntityId } from '@/shared/lib/same-id';
import { TaskFormValues } from '@/shared/schema/task-schema';

export const useEditTask = () => {
  const { editTask } = useBoardStore();
  const { closeModal } = useBoardModalStore();

  return async (taskId: EntityId, data: TaskFormValues) => {
    await editTask(taskId, {
      text: data.taskValue,
      taskFolderId: data.folderId,
      completed: data.completed,
    });

    closeModal();
  };
};

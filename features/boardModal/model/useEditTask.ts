import { useBoardStore } from '@/entities/board';
import { useBoardModalStore } from '@/features/boardModal';
import { TaskFormValues } from '@/features/boardModal/schema/taskSchema';
import { EntityId } from '@/shared/lib/sameId';

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

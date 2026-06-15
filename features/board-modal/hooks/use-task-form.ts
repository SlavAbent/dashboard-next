import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type TaskFormValues,
  taskSchema,
} from '@/features/board-modal/schema/task-schema';
import { findTaskById } from '@/features/board-modal/lib/findTaskById';
import { useBoardStore } from '@/entities/board';
import { useBoardModalStore } from '@/features/board-modal';
import { useCreateTask } from '@/features/board-modal/hooks/use-create-task';
import { useEditTask } from '@/features/board-modal/hooks/use-edit-task';

export const useTaskForm = () => {
  const { tasks, taskFolders } = useBoardStore();
  const { isOpen, mode, editingTaskId, editingFolderId } = useBoardModalStore();

  const createTask = useCreateTask();
  const updateTask = useEditTask();

  const isEditMode = mode === 'edit-task';

  const editingTask = findTaskById(tasks, editingTaskId);

  const defaultValues = useMemo<TaskFormValues>(() => {
    if (isEditMode && editingTask) {
      return {
        taskValue: editingTask.text,
        folderId: editingTask.taskFolderId,
        completed: editingTask.completed,
      };
    }

    return {
      taskValue: '',
      folderId: editingFolderId ?? taskFolders[0]?.id ?? '',
      completed: false,
    };
  }, [isEditMode, editingTask, editingFolderId, taskFolders]);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues,
  });

  const submit = form.handleSubmit(async (data) => {
    if (isEditMode && editingTask) {
      await updateTask(editingTask.id, data);
      return;
    }

    await createTask(data);
  });

  return {
    form,
    submit,
    isEditMode,
  };
};

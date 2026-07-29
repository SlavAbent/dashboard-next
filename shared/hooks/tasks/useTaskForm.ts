import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { useBoardStore } from '@/entities/board';
import { useBoardModalStore } from '@/features/boardModal';
import { findTaskById } from '@/shared/config/findTaskById';
import { useCreateTask } from '@/shared/hooks/tasks/useCreateTask';
import { useEditTask } from '@/shared/hooks/tasks/useEditTask';
import { toIdString } from '@/shared/lib/sameId';
import { type TaskFormValues, taskSchema } from '@/shared/schema/taskSchema';

export const useTaskForm = () => {
  const { tasks, taskFolders } = useBoardStore();
  const { mode, editingTaskId, editingFolderId } = useBoardModalStore();

  const createTask = useCreateTask();
  const updateTask = useEditTask();

  const isEditTaskMode = mode === 'edit-task';

  const editingTask = findTaskById(tasks, editingTaskId);

  const firstFolderId = toIdString(taskFolders[0]?.id ?? '');

  const defaultValues = useMemo<TaskFormValues>(() => {
    if (isEditTaskMode && editingTask) {
      return {
        taskValue: editingTask.text,
        folderId: toIdString(editingTask.taskFolderId),
        completed: editingTask.completed,
      };
    }

    return {
      taskValue: '',
      folderId: toIdString(editingFolderId ?? firstFolderId),
      completed: false,
    };
  }, [
    isEditTaskMode,
    editingTask?.text,
    editingTask?.taskFolderId,
    editingTask?.completed,
    editingTask?.id,
    editingFolderId,
    firstFolderId,
  ]);

  const taskForm = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues,
  });

  useEffect(() => {
    taskForm.reset(defaultValues);
  }, [defaultValues, taskForm]);

  const submitTask = taskForm.handleSubmit(async (data) => {
    if (isEditTaskMode && editingTask) {
      await updateTask(editingTask.id, data);
      return;
    }

    await createTask(data);
  });

  return {
    taskForm,
    submitTask,
    isEditTaskMode,
  };
};

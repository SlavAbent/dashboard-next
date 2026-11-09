import { zodResolver } from '@hookform/resolvers/zod';
import { toIdString } from '@lib/sameId';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { useBoardStore } from '@/entities/board';
import {
  findTaskById,
  isTaskNameTaken,
  TaskNameConflictError,
} from '@/entities/task';
import { useBoardModalStore } from '@/features/boardModal';
import { useCreateTask } from '@/features/boardModal/model/useCreateTask';
import { useEditTask } from '@/features/boardModal/model/useEditTask';
import {
  type TaskFormValues,
  taskSchema,
} from '@/features/boardModal/schema/taskSchema';

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
        startDate: editingTask.startDate,
        endDate: editingTask.endDate,
        priority: editingTask.priority,
      };
    }

    return {
      taskValue: '',
      folderId: toIdString(editingFolderId ?? firstFolderId),
      completed: false,
      startDate: null,
      endDate: null,
      priority: 'none',
    };
  }, [isEditTaskMode, editingTask, editingFolderId, firstFolderId]);

  const taskForm = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues,
  });

  useEffect(() => {
    taskForm.reset(defaultValues);
  }, [defaultValues, taskForm]);

  const submitTask = taskForm.handleSubmit(async (data) => {
    const editingTaskId = isEditTaskMode ? editingTask?.id : undefined;

    if (isTaskNameTaken(tasks, data.taskValue, editingTaskId)) {
      taskForm.setError('taskValue', {
        type: 'validate',
        message: 'A task with this name already exists',
      });
      return;
    }

    try {
      if (isEditTaskMode && editingTask) {
        await updateTask(editingTask.id, data);
        return;
      }

      await createTask(data);
    } catch (error) {
      if (error instanceof TaskNameConflictError) {
        taskForm.setError('taskValue', {
          type: 'validate',
          message: error.message,
        });
        return;
      }

      throw error;
    }
  });

  return {
    taskForm,
    submitTask,
    isEditTaskMode,
  };
};

'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useBoardModalStore } from '@/features/board-modal/model/modal.store';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { TypographySmall } from '@/shared/ui/Typography/TypographySmall';
import { Input } from '@/shared/ui/input';
import { Checkbox } from '@/shared/ui/checkbox';
import FolderSelect from '@/features/board-modal/ui/FolderSelect';
import type { Task } from '@/entities/board/model/types/list-types';
import { sameId, type EntityId } from '@/shared/lib/same-id';

const findTaskById = (tasks: Task[], taskId: EntityId | null) => {
  if (taskId == null) return undefined;

  return tasks.find((task) => sameId(task.id, taskId));
};

const ModalTask = () => {
  const [taskValue, setTaskValue] = useState('');
  const [folderId, setFolderId] = useState<EntityId | ''>('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tasks = useBoardStore((state) => state.tasks);
  const tasksFolder = useBoardStore((state) => state.tasksFolder);
  const addTask = useBoardStore((state) => state.addTask);
  const editTask = useBoardStore((state) => state.editTask);

  const isOpen = useBoardModalStore((state) => state.isOpen);
  const mode = useBoardModalStore((state) => state.mode);
  const closeModal = useBoardModalStore((state) => state.closeModal);
  const editingFolderId = useBoardModalStore((state) => state.editingFolderId);
  const editingTaskId = useBoardModalStore((state) => state.editingTaskId);

  const isEditMode = mode === 'edit-task';
  const isTaskModal = mode === 'create-task' || isEditMode;
  const isVisible = isOpen && isTaskModal;

  const editingTask = findTaskById(tasks, editingTaskId);

  useEffect(() => {
    if (!isVisible) {
      setTaskValue('');
      setFolderId('');
      setCompleted(false);
      setError(null);
      return;
    }

    if (isEditMode && editingTask) {
      setTaskValue(editingTask.text);
      setFolderId(editingTask.tasksFolderId);
      setCompleted(editingTask.completed);
      return;
    }

    setTaskValue('');
    setCompleted(false);
    setFolderId(editingFolderId ?? tasksFolder[0]?.id ?? '');
  }, [isVisible, isEditMode, editingTask, editingFolderId, tasksFolder]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!taskValue.trim() || folderId === '') {
      setError('What is your folder name?');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditMode && editingTaskId != null) {
        await editTask(editingTaskId, {
          text: taskValue.trim(),
          tasksFolderId: folderId,
          completed,
        });
      } else {
        await addTask({
          text: taskValue.trim(),
          tags: [],
          completed: false,
          tasksFolderId: folderId,
        });
      }

      closeModal();
    } catch {
      setError(
        'Не удалось сохранить задачу. Проверьте, что json-server запущен.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root
      open={isVisible}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-10 w-[min(100%-2rem,400px)] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg">
          <Dialog.Title className="mb-4 text-black">
            {isEditMode ? 'Edit task' : 'New task'}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              value={taskValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTaskValue(e.target.value)
              }
              placeholder="Name task"
              className="!w-full"
              autoFocus
              disabled={isSubmitting}
            />

            {isEditMode && tasksFolder.length > 0 && (
              <div className="flex flex-col gap-1">
                <span className="text-neutral-80 text-sm">Folder</span>
                <FolderSelect
                  value={folderId}
                  onChange={(id) => setFolderId(id)}
                />
              </div>
            )}

            {isEditMode && (
              <label className="flex cursor-pointer items-center gap-3">
                <Checkbox
                  checked={completed}
                  onCheckedChange={(checked) => setCompleted(checked)}
                />
                <span className="text-neutral-80 text-sm">Check</span>
              </label>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex !h-[40px] w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-[rgba(114,114,114,0.2)] disabled:opacity-50">
              <PlusIcon size={iconSize(16)} className="text-neutral-80" />
              <TypographySmall
                text={isSubmitting ? 'Save...' : isEditMode ? 'Save' : 'Create'}
                className="text-neutral-80"
              />
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalTask;

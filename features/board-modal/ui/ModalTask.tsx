'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useBoardModalStore } from '../model/modal.store';
import { useTaskForm } from '@/features/board-modal/hooks/use-task-form';
import { TaskForm } from '@/features/board-modal/ui/TaskForm';

const ModalTask = () => {
  const { closeModal, isOpen, mode } = useBoardModalStore();
  const { isEditMode } = useTaskForm();

  const isTaskMode = mode === 'create-task' || mode === 'edit-task';

  const isVisibleMode = isOpen && isTaskMode;

  if (!isOpen || !isVisibleMode) {
    return null;
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="bg-card text-card-foreground fixed top-1/2 left-1/2 z-10 w-[min(100%-2rem,400px)] -translate-x-1/2 -translate-y-1/2 rounded-md p-6 shadow-lg">
          <Dialog.Title className="mb-4">
            {isEditMode ? 'Edit task' : 'New task'}
          </Dialog.Title>
          <TaskForm />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalTask;

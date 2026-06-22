'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { TaskForm } from '@/features/board-modal/ui/forms/TaskForm';
import { useBoardModalStore } from '@/features/board-modal';

const ModalTask = () => {
  const { closeModal, isOpen, mode } = useBoardModalStore();

  const isEditTaskMode = mode === 'edit-task';
  const isTaskMode = mode === 'create-task' || isEditTaskMode;

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
            {isEditTaskMode ? 'Edit task' : 'New task'}
          </Dialog.Title>
          <TaskForm />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalTask;

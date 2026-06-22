'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useBoardModalStore } from '@/features/board-modal/model/modal.store';
import { useFolderForm } from '@/features/board-modal/hooks/folder/use-folder-form';
import { FolderForm } from '@/features/board-modal/ui/forms/FolderForm';

const ModalFolder = () => {
  const { isOpen, mode, closeModal } = useBoardModalStore();
  const { isEditFolderMode } = useFolderForm();

  const isFolderModal = mode === 'create-folder' || isEditFolderMode;
  const isVisible = isOpen && isFolderModal;

  if (!isOpen && !isVisible) {
    return null;
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="bg-card text-card-foreground fixed top-1/2 left-1/2 z-10 w-[min(100%-2rem,400px)] -translate-x-1/2 -translate-y-1/2 rounded-md p-6 shadow-lg">
          <Dialog.Title className="mb-4">
            {isEditFolderMode ? 'Edit folder' : 'Add new folder'}
          </Dialog.Title>
          <FolderForm />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalFolder;

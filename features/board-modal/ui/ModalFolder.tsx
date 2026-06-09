'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useBoardModalStore } from '@/features/board-modal/model/modal.store';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { Input } from '@/shared/components/Input/input';
import ColumnSelect from '@/features/board-modal/ui/ColumnSelect';
import { sameId } from '@/shared/lib/same-id';

const ModalFolder = () => {
  const [folderValue, setFolderValue] = useState('');
  const [columnId, setColumnId] = useState('');

  const addFolder = useBoardStore((state) => state.addFolder);
  const updateFolder = useBoardStore((state) => state.updateFolder);
  const taskFolders = useBoardStore((state) => state.taskFolders);

  const isOpen = useBoardModalStore((state) => state.isOpen);
  const mode = useBoardModalStore((state) => state.mode);
  const closeModal = useBoardModalStore((state) => state.closeModal);
  const selectedColumnId = useBoardModalStore(
    (state) => state.selectedColumnId
  );
  const editingFolderId = useBoardModalStore((state) => state.editingFolderId);

  const isEditMode = mode === 'edit-folder';
  const isFolderModal = mode === 'create-folder' || isEditMode;
  const isVisible = isOpen && isFolderModal;

  useEffect(() => {
    if (!isVisible) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFolderValue('');
      setColumnId('');
      return;
    }

    if (isEditMode && editingFolderId) {
      const folder = taskFolders.find((item) =>
        sameId(item.id, editingFolderId)
      );

      if (folder) {
        setFolderValue(folder.title);
        setColumnId(folder.columnId);
      }

      return;
    }

    setFolderValue('');
    setColumnId(selectedColumnId ?? '');
  }, [isVisible, isEditMode, editingFolderId, selectedColumnId, taskFolders]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!folderValue.trim() || !columnId) return;

    try {
      if (isEditMode && editingFolderId) {
        await updateFolder(editingFolderId, {
          title: folderValue.trim(),
          columnId,
        });
      } else {
        const nextOrder =
          taskFolders.filter((folder) => folder.columnId === columnId).length +
          1;

        await addFolder({
          title: folderValue.trim(),
          columnId,
          order: nextOrder,
        });
      }

      closeModal();
    } catch {
      console.log(e);
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
        <Dialog.Content className="bg-card text-card-foreground fixed top-1/2 left-1/2 z-10 w-[min(100%-2rem,400px)] -translate-x-1/2 -translate-y-1/2 rounded-md p-6 shadow-lg">
          <Dialog.Title className="mb-4">
            {isEditMode ? 'Edit folder' : 'Add new folder'}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              value={folderValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFolderValue(e.target.value)
              }
              placeholder="Folder name"
              className="!w-full"
            />

            <ColumnSelect value={columnId} onChange={setColumnId} />

            <button
              type="submit"
              className="bg-secondary text-secondary-foreground flex !h-[40px] w-full cursor-pointer items-center justify-center gap-2 rounded-sm">
              <PlusIcon size={iconSize(16)} className="text-muted-foreground" />
              <TypographySmall
                text={isEditMode ? 'Save folder' : 'Create folder'}
                className="text-muted-foreground"
              />
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalFolder;

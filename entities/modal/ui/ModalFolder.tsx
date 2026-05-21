'use client';

import React, {
  ChangeEvent,
  SubmitEventHandler,
  useEffect,
  useState,
} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useModalStore } from '@/entities/modal/model/modal.store';
import { useBoardStore } from '@/entities/board/model/useDataStore';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { TypographySmall } from '@/shared/ui/Typography/TypographySmall';
import { Input } from '@/shared/ui/input';

const ModalFolder = () => {
  const [folderValue, setFolderValue] = useState('');

  const addFolder = useBoardStore((state) => state.addFolder);

  const isOpenModal = useModalStore((state) => state.isOpenModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const selectedColumnId = useModalStore((state) => state.selectedColumnId);

  const handleAddFolder: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!folderValue.trim() || !selectedColumnId) return;

    addFolder({
      title: folderValue,
      columnId: selectedColumnId,
    });

    setFolderValue('');
    closeModal();
  };

  return (
    <Dialog.Root
      open={isOpenModal}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg">
          <Dialog.Title className="text-black">Add new folder</Dialog.Title>
          <form onSubmit={handleAddFolder}>
            <Input
              value={folderValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFolderValue(e.target.value)
              }
              placeholder="Add folder"
            />

            <button
              role="button"
              type="submit"
              className="flex !h-[40] w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-[rgba(114,114,114,0.2)]">
              <PlusIcon size={iconSize(16)} className="text-neutral-80" />
              <TypographySmall
                text="Create Folder"
                className="text-neutral-80"
              />
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalFolder;

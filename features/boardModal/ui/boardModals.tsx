'use client';

import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';

import { useBoardModalStore } from '@/features/boardModal';
import { MODAL_CONFIG } from '@/shared/config/modalConfig';

export const BoardModals = () => {
  const { isOpen, mode, closeModal } = useBoardModalStore();

  if (!isOpen || !mode) return null;

  const config = MODAL_CONFIG[mode];

  if (!config) return null;

  const { title, Component } = config;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="bg-background text-card-foreground dark:muted-foreground fixed top-1/2 left-1/2 z-10 w-[min(100%-2rem,400px)] -translate-x-1/2 -translate-y-1/2 rounded-md p-6 shadow-lg">
          <Dialog.Title className="mb-4">{title}</Dialog.Title>
          <Component />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

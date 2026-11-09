'use client';

import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@dashboard/ui';
import React from 'react';

import { useBoardModalStore } from '@/features/boardModal';
import { MODAL_CONFIG } from '@/features/boardModal/config/modalConfig';

export const BoardModals = () => {
  const { isOpen, mode, closeModal } = useBoardModalStore();

  if (!isOpen || !mode) return null;

  const config = MODAL_CONFIG[mode];

  if (!config) return null;

  const { title, Component } = config;

  return (
    <Drawer
      open={isOpen}
      swipeDirection="right"
      onOpenChange={(open) => !open && closeModal()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>
            Enter a name, due date, and priority.
          </DrawerDescription>
          <DrawerCloseButton />
        </DrawerHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <Component />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

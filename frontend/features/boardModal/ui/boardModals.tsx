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
import { useSelectFieldStore } from '@/features/boardModal/model/selectField.store';
import { TaskForm } from '@/features/boardModal/ui/taskForm';

type BoardModalsProps = {
  defaultNewFolderColumnId?: string;
};

export const BoardModals = ({ defaultNewFolderColumnId }: BoardModalsProps) => {
  const { isOpen, mode, closeModal } = useBoardModalStore();
  const resetSelectField = useSelectFieldStore((state) => state.reset);

  if (!isOpen || !mode) return null;

  const config = MODAL_CONFIG[mode];

  if (!config) return null;

  const { title, Component } = config;

  return (
    <Drawer
      open={isOpen}
      swipeDirection="right"
      onOpenChange={(open) => {
        if (open) return;
        resetSelectField();
        closeModal();
      }}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>
            Enter a name, due date, and priority.
          </DrawerDescription>
          <DrawerCloseButton />
        </DrawerHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {mode === 'create-task' || mode === 'edit-task' ? (
            <TaskForm defaultNewFolderColumnId={defaultNewFolderColumnId} />
          ) : (
            <Component />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

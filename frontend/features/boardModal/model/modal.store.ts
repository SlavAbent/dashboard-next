'use client';

import { create } from 'zustand';

import { ModalStore } from '@/features/boardModal/types/modal.types';

const initialState = {
  isOpen: false,
  mode: null as ModalStore['mode'],
  selectedColumnId: null,
  initialTaskDate: null,
  editingFolderId: null,
  editingTaskId: null,
};

export const useBoardModalStore = create<ModalStore>((set) => ({
  ...initialState,

  openCreateFolder: (columnId) =>
    set({
      isOpen: true,
      mode: 'create-folder',
      selectedColumnId: columnId,
      initialTaskDate: null,
      editingFolderId: null,
      editingTaskId: null,
    }),

  openEditFolder: (folderId, columnId) =>
    set({
      isOpen: true,
      mode: 'edit-folder',
      selectedColumnId: columnId,
      initialTaskDate: null,
      editingFolderId: folderId,
      editingTaskId: null,
    }),

  openCreateTask: (folderId, initialDate) =>
    set({
      isOpen: true,
      mode: 'create-task',
      editingFolderId: folderId ?? null,
      editingTaskId: null,
      selectedColumnId: null,
      initialTaskDate: initialDate ?? null,
    }),

  openEditTask: (taskId) =>
    set({
      isOpen: true,
      mode: 'edit-task',
      editingTaskId: taskId,
      editingFolderId: null,
      selectedColumnId: null,
      initialTaskDate: null,
    }),

  closeModal: () => set(initialState),
}));

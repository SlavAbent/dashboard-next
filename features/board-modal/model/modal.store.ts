'use client';

import { create } from 'zustand';

import { ModalStore } from '@/features/board-modal/types/modal.types';

const initialState = {
  isOpen: false,
  mode: null as ModalStore['mode'],
  selectedColumnId: null,
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
      editingFolderId: null,
      editingTaskId: null,
    }),

  openEditFolder: (folderId, columnId) =>
    set({
      isOpen: true,
      mode: 'edit-folder',
      selectedColumnId: columnId,
      editingFolderId: folderId,
      editingTaskId: null,
    }),

  openCreateTask: (folderId) =>
    set({
      isOpen: true,
      mode: 'create-task',
      editingFolderId: folderId,
      editingTaskId: null,
      selectedColumnId: null,
    }),

  openEditTask: (taskId) =>
    set({
      isOpen: true,
      mode: 'edit-task',
      editingTaskId: taskId,
      editingFolderId: null,
      selectedColumnId: null,
    }),

  closeModal: () => set(initialState),
}));

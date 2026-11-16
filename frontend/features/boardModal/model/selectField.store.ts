'use client';

import { create } from 'zustand';

type SelectFieldState = {
  showCreateFolder: boolean;
  folderName: string;
  newFolderColumnId: string;
  folderError: string | null;
  isCreatingFolder: boolean;
};

type SelectFieldActions = {
  openCreateFolder: (columnId: string) => void;
  closeCreateFolder: () => void;
  setFolderName: (folderName: string) => void;
  setNewFolderColumnId: (columnId: string) => void;
  setFolderError: (folderError: string | null) => void;
  setIsCreatingFolder: (isCreatingFolder: boolean) => void;
  finishCreatingFolder: () => void;
  reset: () => void;
};

const initialState: SelectFieldState = {
  showCreateFolder: false,
  folderName: '',
  newFolderColumnId: '',
  folderError: null,
  isCreatingFolder: false,
};

export const useSelectFieldStore = create<
  SelectFieldState & SelectFieldActions
>((set) => ({
  ...initialState,
  openCreateFolder: (newFolderColumnId) =>
    set({
      showCreateFolder: true,
      newFolderColumnId,
      folderError: null,
    }),
  closeCreateFolder: () => set(initialState),
  setFolderName: (folderName) => set({ folderName, folderError: null }),
  setNewFolderColumnId: (newFolderColumnId) =>
    set({ newFolderColumnId, folderError: null }),
  setFolderError: (folderError) => set({ folderError }),
  setIsCreatingFolder: (isCreatingFolder) => set({ isCreatingFolder }),
  finishCreatingFolder: () => set(initialState),
  reset: () => set(initialState),
}));

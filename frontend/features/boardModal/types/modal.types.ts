import type { EntityId } from '@lib/sameId';

export type ModalMode =
  'create-folder' | 'edit-folder' | 'create-task' | 'edit-task' | null;

export type ModalStore = {
  isOpen: boolean;
  mode: ModalMode;
  selectedColumnId: string | null;
  initialTaskDate: string | null;
  editingFolderId: EntityId | null;
  editingTaskId: EntityId | null;

  openCreateFolder: (columnId: string) => void;
  openEditFolder: (folderId: EntityId, columnId: string) => void;
  openCreateTask: (folderId?: EntityId, initialDate?: string) => void;
  openEditTask: (taskId: EntityId) => void;
  closeModal: () => void;
};

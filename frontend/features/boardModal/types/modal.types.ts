export type ModalMode =
  'create-folder' | 'edit-folder' | 'create-task' | 'edit-task' | null;

export type ModalStore = {
  isOpen: boolean;
  mode: ModalMode;
  selectedColumnId: string | null;
  initialTaskDate: string | null;
  editingFolderId: string | null;
  editingTaskId: string | null;

  openCreateFolder: (columnId: string) => void;
  openEditFolder: (folderId: string, columnId: string) => void;
  openCreateTask: (folderId?: string, initialDate?: string) => void;
  openEditTask: (taskId: string) => void;
  closeModal: () => void;
};

import { FolderForm } from '@/entities/board/forms/folderForm';
import { TaskForm } from '@/entities/board/forms/taskForm';

export const MODAL_CONFIG = {
  'create-folder': {
    title: 'Add new folder',
    Component: FolderForm,
  },
  'edit-folder': {
    title: 'Edit folder',
    Component: FolderForm,
  },
  'create-task': {
    title: 'New task',
    Component: TaskForm,
  },
  'edit-task': {
    title: 'Edit task',
    Component: TaskForm,
  },
} as const;

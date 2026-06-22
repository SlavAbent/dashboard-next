import { FolderForm } from '@/shared/components/forms/FolderForm';
import { TaskForm } from '@/shared/components/forms/TaskForm';

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

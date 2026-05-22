import type { EntityId } from '@/shared/lib/same-id';

export type Task = {
  id: EntityId;
  text: string;
  tags: string[];
  completed: boolean;
  tasksFolderId: EntityId;
};

export type TasksFolder = {
  id: EntityId;
  columnId: string;
  title: string;
  completed: boolean;
};

export type Column = {
  id: string;
  title: string;
  order: number;
  color: string;
};

export type BoardTask = Task;
export type CreateFolder = Omit<TasksFolder, 'id' | 'completed'>;
export type CreateTask = Omit<Task, 'id'>;
export type UpdateFolderPayload = {
  title?: string;
  columnId?: string;
};

export type BoardFolder = TasksFolder & {
  tasks: BoardTask[];
};

export type BoardColumn = Column & {
  folders: BoardFolder[];
};

export type BoardViewMode = 'List' | 'Kanban';

export type Task = {
  id: string;
  text: string;
  tags: string[];
  completed: boolean;
  taskFolderId: string;
  order: number;
  createdAt: string;
  updatedAt?: string;
};

export type TaskFolder = {
  id: string;
  columnId: string;
  title: string;
  order: number;
};

export type Column = {
  id: string;
  title: string;
  order: number;
  color: string;
};

export type BoardTask = Task;
export type CreateFolder = Omit<TaskFolder, 'id'>;
export type CreateTask = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateFolderPayload = {
  title?: string;
  columnId?: string;
};

export type BoardFolder = TaskFolder & {
  tasks: BoardTask[];
};

export type BoardColumn = Column & {
  folders: BoardFolder[];
};

export type BoardViewMode = 'List' | 'Kanban';

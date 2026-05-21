export type Task = {
  id: number;
  text: string;
  tags: string[];
  completed: boolean;
  tasksFolderId: number;
};

export type TasksFolder = {
  id: number;
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

export type BoardFolder = TasksFolder & {
  tasks: BoardTask[];
};

export type BoardColumn = Column & {
  folders: BoardFolder[];
};

export type BoardViewMode = 'List' | 'Kanban';

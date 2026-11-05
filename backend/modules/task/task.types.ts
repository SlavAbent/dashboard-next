export type TaskDto = {
  id: string;
  text: string;
  tags: string[];
  completed: boolean;
  taskFolderId: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = {
  taskFolderId: string;
  text: string;
  tags: string[];
  completed: boolean;
  order: number;
};

export type UpdateTaskInput = {
  text?: string;
  tags?: string[];
  completed?: boolean;
  taskFolderId?: string;
};

export type MoveTaskInput = {
  taskFolderId: string;
  order: number;
};

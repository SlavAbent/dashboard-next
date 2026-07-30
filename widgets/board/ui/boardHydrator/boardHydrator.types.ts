import { Column } from '@/entities/column';
import { TaskFolder } from '@/entities/folder';
import { Task } from '@/entities/task';

export type BoardHydratorType = {
  tasks: Task[];
  columns: Column[];
  folders: TaskFolder[];
  taskId?: string;
};

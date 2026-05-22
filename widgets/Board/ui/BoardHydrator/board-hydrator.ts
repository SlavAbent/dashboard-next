import {
  Column,
  Task,
  TasksFolder,
} from '@/entities/board/model/types/list-types';

export type BoardHydratorType = {
  tasks: Task[];
  columns: Column[];
  folders: TasksFolder[];
};

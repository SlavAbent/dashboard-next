import Task from '@/widgets/Task/Task';
import { Column } from '@/entities/board/model/types/list-types';

export type BoardHydratorType = {
  tasks: Task[];
  columns: Column[];
};

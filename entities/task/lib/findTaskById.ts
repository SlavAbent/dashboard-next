import { Task } from '@/entities/task';
import { EntityId, sameId } from '@/shared/lib/sameId';

export const findTaskById = (tasks: Task[], taskId: EntityId | null) => {
  if (taskId == null) return undefined;

  return tasks.find((task) => sameId(task.id, taskId));
};

import { Task } from '@/entities/board';
import { EntityId, sameId } from '@/shared/lib/same-id';

export const findTaskById = (tasks: Task[], taskId: EntityId | null) => {
  if (taskId == null) return undefined;

  return tasks.find((task) => sameId(task.id, taskId));
};

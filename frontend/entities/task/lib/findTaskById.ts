import { EntityId, sameId } from '@lib/sameId';

import { Task } from '@/entities/task';

export const findTaskById = (tasks: Task[], taskId: EntityId | null) => {
  if (taskId == null) return undefined;

  return tasks.find((task) => sameId(task.id, taskId));
};

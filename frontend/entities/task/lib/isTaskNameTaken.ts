import type { EntityId } from '@lib/sameId';
import { sameId } from '@lib/sameId';

import type { Task } from '@/entities/task/model/task.types';

const normalizeTaskName = (name: string) => name.trim().toLocaleLowerCase();

export const isTaskNameTaken = (
  tasks: Task[],
  name: string,
  excludeId?: EntityId
) => {
  const normalizedName = normalizeTaskName(name);

  return tasks.some(
    (task) =>
      (!excludeId || !sameId(task.id, excludeId)) &&
      normalizeTaskName(task.text) === normalizedName
  );
};

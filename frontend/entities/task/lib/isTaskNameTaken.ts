import type { Task } from '@/entities/task/model/task.types';

const normalizeTaskName = (name: string) => name.trim().toLocaleLowerCase();

export const isTaskNameTaken = (
  tasks: Task[],
  name: string,
  excludeId?: string
) => {
  const normalizedName = normalizeTaskName(name);

  return tasks.some(
    (task) =>
      (!excludeId || task.id !== excludeId) &&
      normalizeTaskName(task.text) === normalizedName
  );
};

import type { BoardColumn } from '@/entities/board/model/types/list-types';

export function countIncompleteTasksInColumn(column: BoardColumn): number {
  return column.folders.reduce(
    (sum, folder) =>
      sum + folder.tasks.filter((task) => !task.completed).length,
    0
  );
}

export function countCompletedTasksInColumn(column: BoardColumn): number {
  return column.folders.reduce(
    (sum, folder) => sum + folder.tasks.filter((task) => task.completed).length,
    0
  );
}

export function getColumnTasksLabel(
  columnId: string,
  incompleteCount: number,
  completedCount: number
): string {
  const count = columnId === 'completed' ? completedCount : incompleteCount;
  const suffix = columnId === 'completed' ? 'completed' : 'open';

  return `${count} ${suffix} tasks`;
}

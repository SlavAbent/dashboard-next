export function getColumnTasksLabel(
  columnId: string,
  incompleteCount: number,
  completedCount: number
): string {
  const count = columnId === 'completed' ? incompleteCount : completedCount;
  const suffix = columnId === 'completed' ? 'completed' : 'open';

  return `${count} ${suffix} tasks`;
}

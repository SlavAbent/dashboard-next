import { useMemo } from 'react';

type CountableColumn = {
  folders: Array<{
    tasks: Array<{ completed: boolean }>;
  }>;
};

const countTasks = (
  column: CountableColumn,
  type: 'completed' | 'incomplete'
) => {
  const isComplete = type === 'completed';

  return column.folders.reduce(
    (sum, folder) =>
      sum + folder.tasks.filter((task) => task.completed === isComplete).length,
    0
  );
};

export const useCountHook = (column: CountableColumn) => {
  const completed = useMemo(() => countTasks(column, 'completed'), [column]);
  const incomplete = useMemo(() => countTasks(column, 'incomplete'), [column]);

  return {
    completed,
    incomplete,
  };
};

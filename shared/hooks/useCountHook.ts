import { useMemo } from 'react';

import { BoardColumn } from '@/entities/board';

const countTasks = (column: BoardColumn, type: 'completed' | 'incomplete') => {
  const isComplete = type === 'completed';

  return column.folders.reduce(
    (sum, folder) =>
      sum + folder.tasks.filter((task) => task.completed === isComplete).length,
    0
  );
};

export const useCountHook = (column: BoardColumn) => {
  const completed = useMemo(() => countTasks(column, 'completed'), [column]);
  const incomplete = useMemo(() => countTasks(column, 'incomplete'), [column]);

  return {
    completed,
    incomplete,
  };
};

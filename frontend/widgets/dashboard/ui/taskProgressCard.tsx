import { getTasks } from '@/entities/task';

import { TaskProgressCardClient } from './taskProgressCardClient';

export const TaskProgressCard = async () => {
  const tasks = await getTasks();

  const totalCount = tasks.length;
  const doneCount = tasks.filter((task) => task.completed).length;
  const undoneCount = totalCount - doneCount;

  const donePercent = totalCount
    ? Math.round((doneCount / totalCount) * 100)
    : 0;
  const undonePercent = totalCount
    ? Math.round((undoneCount / totalCount) * 100)
    : 0;

  return (
    <TaskProgressCardClient
      doneCount={doneCount}
      undoneCount={undoneCount}
      donePercent={donePercent}
      undonePercent={undonePercent}
    />
  );
};

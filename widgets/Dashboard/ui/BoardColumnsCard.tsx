import {
  getColumns,
  getTaskFolders,
  getTasks,
  groupTasksToFolders,
} from '@/entities/board';

import { BoardColumnRow } from './BoardColumnRow';
import { DashboardCard } from './DashboardCard';

export const BoardColumnsCard = async () => {
  const [tasks, columns, folders] = await Promise.all([
    getTasks(),
    getColumns(),
    getTaskFolders(),
  ]);

  const boardColumns = groupTasksToFolders(tasks, columns, folders);

  return (
    <DashboardCard title="Board overview">
      <div className="flex flex-col gap-4">
        {boardColumns.map((column) => (
          <BoardColumnRow key={column.id} column={column} />
        ))}
      </div>
    </DashboardCard>
  );
};

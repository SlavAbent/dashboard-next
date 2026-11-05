import { groupTasksToFolders } from '@/entities/board';
import { getBoard } from '@/entities/board/api/getBoard';

import { BoardColumnRow } from './boardColumnRow';
import { DashboardCard } from './dashboardCard';

export const BoardColumnsCard = async () => {
  const { tasks, columns, folders } = await getBoard();

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

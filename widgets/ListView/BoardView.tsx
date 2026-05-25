'use client';

import React, { useMemo } from 'react';
import BoardColumns from '@/widgets/ListView/BoardColumns';
import { BoardModals } from '@/features/board-modal';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import { useFilteredTasks } from '@/entities/board/model/use-filtered-tasks';
import { groupTasksToFolders } from '@/entities/board/lib/group-tasks-to-folders';

const BoardView = () => {
  const filteredTasks = useFilteredTasks();
  const columns = useBoardStore((state) => state.columns);
  const tasksFolders = useBoardStore((state) => state.tasksFolder);

  const boardData = useMemo(() => {
    return groupTasksToFolders(filteredTasks, columns, tasksFolders);
  }, [filteredTasks, columns, tasksFolders]);

  return (
    <>
      <BoardModals />
      {boardData.map((column) => (
        <div key={column.id} className="mb-8 flex flex-col">
          <BoardColumns column={column} />
        </div>
      ))}
    </>
  );
};

export default BoardView;

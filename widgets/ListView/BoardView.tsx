'use client';

import React, { useMemo } from 'react';

import { useFilteredTasks } from '@/entities/board/hooks/use-filtered-tasks';
import { groupTasksToFolders } from '@/entities/board/lib/group-tasks-to-folders';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import { BoardModals } from '@/features/board-modal';
import BoardColumns from '@/widgets/ListView/BoardColumns';

const BoardView = () => {
  const filteredTasks = useFilteredTasks();
  const columns = useBoardStore((state) => state.columns);
  const taskFolders = useBoardStore((state) => state.taskFolders);

  const boardData = useMemo(() => {
    return groupTasksToFolders(filteredTasks, columns, taskFolders);
  }, [filteredTasks, columns, taskFolders]);

  return (
    <>
      <BoardModals />
      {boardData.map((column) => (
        <div key={column.id} className="mb-8 flex flex-col gap-4">
          <BoardColumns column={column} />
        </div>
      ))}
    </>
  );
};

export default BoardView;

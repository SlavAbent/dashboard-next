'use client';

import React, { useMemo } from 'react';

import {
  groupTasksToFolders,
  useBoardStore,
  useFilteredTasks,
} from '@/entities/board';
import { BoardModals } from '@/features/boardModal';
import BoardColumns from '@/widgets/board/ui/listView/boardColumns';

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

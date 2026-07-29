'use client';

import React, { useMemo } from 'react';

import { groupTasksToFolders } from '@/entities/board/lib/groupTasksToFolders';
import { useBoardStore } from '@/entities/board/model/useData.store';
import { useFilteredTasks } from '@/entities/board/model/useFilteredTasks';
import { BoardModals } from '@/features/boardModal';
import BoardColumns from '@/widgets/listView/ui/boardColumns';

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

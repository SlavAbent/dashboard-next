'use client';

import React, { useMemo } from 'react';
import BoardColumns from '@/widgets/ListView/BoardColumns';
import { BoardModals } from '@/features/board-modal';
import { useBoardStore } from '@/entities/board/model/useDataStore';
import { groupTasksToFolders } from '@/entities/board/lib/group-tasks-to-folders';

const BoardView = () => {
  const tasks = useBoardStore((state) => state.tasks);
  const columns = useBoardStore((state) => state.columns);
  const tasksFolders = useBoardStore((state) => state.tasksFolder);

  const boardData = useMemo(() => {
    return groupTasksToFolders(tasks, columns, tasksFolders);
  }, [tasks, columns, tasksFolders]);

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

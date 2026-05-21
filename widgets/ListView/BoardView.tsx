'use client';

import React, { useMemo } from 'react';
import BoardColumns from '@/widgets/ListView/BoardColumns';
import { useBoardStore } from '@/entities/board/model/useDataStore';
import { groupTasksToFolders } from '@/shared/lib/groupTasksToFolders';

const BoardView = () => {
  const tasks = useBoardStore((state) => state.tasks);
  const columns = useBoardStore((state) => state.columns);
  const tasksFolders = useBoardStore((state) => state.tasksFolder);

  const boardData = useMemo(() => {
    return groupTasksToFolders(tasks, columns, tasksFolders);
  }, [tasks, columns]);

  return (
    <>
      {boardData.map((column) => (
        <div key={column.id} className="mb-8 flex flex-col">
          <BoardColumns column={column} />
        </div>
      ))}
    </>
  );
};

export default BoardView;

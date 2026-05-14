'use client';

import React, { useMemo } from 'react';
import BoardColumns from '@/widgets/ListView/BoardColumns';
import { useBoardStore } from '@/entities/board/model/useDataStore';
import { groupTasks } from '@/shared/lib/groupTasks';

const BoardView = () => {
  const tasks = useBoardStore((state) => state.tasks);
  const columns = useBoardStore((state) => state.columns);

  const boardData = useMemo(() => {
    return groupTasks(tasks, columns);
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

'use client';

import React, { useState } from 'react';
import ColumnCreate from '@/widgets/ColumnCreate/ColumnCreate';
import TaskCreate from '@/widgets/TaskCreate/TaskCreate';
import type { BoardColumn } from '@/entities/board/model/types';

const BoardListColumn = ({ column }: { column: BoardColumn }) => {
  const [closedFolders, setClosedFolders] = useState<Set<string>>(new Set());
  const isOpen = !closedFolders.has(column.id);

  return (
    <>
      <ColumnCreate
        column={column}
        isOpen={isOpen}
        setClosedFolders={setClosedFolders}
      />
      {isOpen && <TaskCreate column={column} />}
    </>
  );
};

export default BoardListColumn;

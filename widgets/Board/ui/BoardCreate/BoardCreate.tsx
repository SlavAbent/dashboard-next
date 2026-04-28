'use client';

import React, { useState } from 'react';
import { BoardColumn } from '@/widgets/Board/types';
import TaskCreate from '@/widgets/Board/ui/List/TaskCreate/TaskCreate';
import ColumnCreate from '@/widgets/Board/ui/List/ColumnCreate/ColumnCreate';

const BoardCreate = ({ boardData }: { boardData: BoardColumn[] }) => {
  const [closedFolders, setClosedFolders] = useState<Set<string>>(new Set());
  return (
    <>
      {boardData.map((column) => {
        const isOpen = !closedFolders.has(column.id);
        return (
          <div key={column.id} className="mb-8 flex flex-col">
            <ColumnCreate
              column={column}
              isOpen={isOpen}
              setClosedFolders={setClosedFolders}
            />
            {isOpen && <TaskCreate column={column} />}
          </div>
        );
      })}
    </>
  );
};

export default BoardCreate;

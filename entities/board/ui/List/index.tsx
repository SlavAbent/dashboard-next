import React, { useState } from 'react';
import ColumnCreate from '@/entities/board/ui/List/ColumnCreate/ColumnCreate';
import TaskCreate from '@/entities/board/ui/List/TaskCreate/TaskCreate';
import { BoardColumn } from '@/widgets/Board/types';

const List = ({ column }: { column: BoardColumn }) => {
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

export default List;

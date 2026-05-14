'use client';

import React from 'react';
import ColumnCreate from '@/widgets/ColumnCreate/ui/ColumnCreate';
import Task from '@/widgets/Task/Task';
import { useBoardStore } from '@/entities/board/model/useDataStore';
import { BoardColumnsType } from '@/widgets/ListView/types/board-columns';

const BoardColumns = ({ column }: BoardColumnsType) => {
  const closedColumns = useBoardStore((state) => state.closedColumns);

  const isOpen = !closedColumns.includes(column.id);

  return (
    <>
      <ColumnCreate column={column} isOpen={isOpen} />

      {isOpen && <Task columnId={column.id} />}
    </>
  );
};

export default React.memo(BoardColumns);

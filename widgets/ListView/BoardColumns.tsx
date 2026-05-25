'use client';

import React from 'react';
import ColumnCreate from '@/widgets/ColumnCreate/ui/ColumnCreate';
import Folder from '@/widgets/Folder/Folder';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import { BoardColumnsType } from '@/widgets/ListView/types/board-columns';

const BoardColumns = ({ column }: BoardColumnsType) => {
  const closedColumns = useBoardStore((state) => state.closedColumns);

  const isOpen = !closedColumns.includes(column.id);

  return (
    <>
      <ColumnCreate column={column} isOpen={isOpen} />

      {isOpen && <Folder columnId={column.id} />}
    </>
  );
};

export default React.memo(BoardColumns);

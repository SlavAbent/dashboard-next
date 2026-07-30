'use client';

import React from 'react';

import { useBoardStore } from '@/entities/board/model/useData.store';
import ColumnCreate from '@/widgets/board/ui/columnCreate/columnCreate';
import Folder from '@/widgets/board/ui/folder/folder';
import { BoardColumnsType } from '@/widgets/board/ui/listView/boardColumns.types';

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

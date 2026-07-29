'use client';

import React from 'react';

import { useBoardStore } from '@/entities/board/model/useData.store';
import ColumnCreate from '@/widgets/columnCreate/ui/columnCreate';
import Folder from '@/widgets/folder/ui/folder';
import { BoardColumnsType } from '@/widgets/listView/types/boardColumns.types';

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

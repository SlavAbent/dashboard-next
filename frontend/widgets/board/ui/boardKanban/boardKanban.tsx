'use client';

import React from 'react';

import ColumnHeader from '@/features/columnHeader/ui/columnHeader';
import KanbanItem from '@/features/kanbanItem/ui/kanbanItem';
import { toIdString } from '@/shared/lib/sameId';
import { BoardKanbanType } from '@/widgets/board/ui/boardKanban/boardKanban.types';

const BoardKanban = ({ column, itemIds, tasksMap }: BoardKanbanType) => {
  return (
    <>
      <ColumnHeader column={column} />
      <div className="flex flex-col gap-4">
        {itemIds.map((id, index) => {
          const folder = tasksMap[toIdString(id)];

          if (!folder) return null;

          return (
            <KanbanItem
              key={toIdString(id)}
              id={id}
              folder={folder}
              index={index}
            />
          );
        })}
      </div>
    </>
  );
};

export default BoardKanban;

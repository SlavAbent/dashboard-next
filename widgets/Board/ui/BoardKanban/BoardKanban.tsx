'use client';

import React from 'react';

import ColumnHeader from '@/features/ColumnHeader/ui/ColumnHeader';
import KanbanItem from '@/features/KanbanItem/ui/KanbanItem';
import { toIdString } from '@/shared/lib/same-id';
import { BoardKanbanType } from '@/widgets/Board/ui/BoardKanban/board-kanban.types';

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

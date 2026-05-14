'use client';

import React from 'react';
import KanbanItem from '@/features/KanbanItem/ui/KanbanItem';
import { BoardKanbanType } from '@/widgets/Board/ui/BoardKanban/board-kanban.types';
import ColumnHeader from '@/features/ColumnHeader/ui/ColumnHeader';

const BoardKanban = ({ column, itemIds, tasksMap }: BoardKanbanType) => {
  return (
    <>
      <ColumnHeader column={column} tasksLength={itemIds.length} />
      <div className="flex flex-col gap-4 overflow-auto">
        {itemIds.map((id, index) => {
          return (
            <KanbanItem key={id} id={id} task={tasksMap[id]} index={index} />
          );
        })}
      </div>
    </>
  );
};

export default BoardKanban;

'use client';

import React from 'react';
import KanbanItem from '@/features/KanbanItem/ui';
import { KanbanType } from '@/entities/board/ui/Kanban/types';
import ColumnHeader from '@/features/ColumnHeader/ui';

const Kanban = ({ column, itemIds, tasksMap }: KanbanType) => {
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

export default Kanban;

'use client';

import React, { useState } from 'react';
import { BoardColumn, Task } from '@/widgets/Board/types';
import Kanban from '@/entities/board/ui/Kanban';
import { DragDropProvider } from '@dnd-kit/react';
import KanbanColumn from '@/entities/board/ui/Kanban/KanbanColumn/ui';
import { move } from '@dnd-kit/helpers';
import { KanbanViewType } from '@/entities/board/ui/Kanban/KanbanView/types';

const KanbanView = ({ boardData }: KanbanViewType) => {
  const columns = boardData.reduce(
    (acc, col) => {
      acc[col.id] = col;

      return acc;
    },
    {} as Record<string, BoardColumn>
  );

  const [items, setItems] = useState<Record<string, number[]>>(
    boardData.reduce(
      (acc, col) => {
        acc[col.id] = col.tasks.map((task) => task.id);
        return acc;
      },
      {} as Record<string, number[]>
    )
  );

  const tasksMap = boardData.reduce(
    (acc, col) => {
      col.tasks.forEach((task) => (acc[task.id] = task));

      return acc;
    },
    {} as Record<string, Task>
  );

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        setItems((prev) => move(prev, event));
      }}>
      <div className="flex h-full items-start gap-6">
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <KanbanColumn
              key={columnId}
              id={columnId}
              className="mb-8 flex h-full flex-col rounded-xl border p-5">
              <Kanban
                column={column}
                itemIds={items[columnId]}
                tasksMap={tasksMap}
              />
            </KanbanColumn>
          );
        })}
      </div>
    </DragDropProvider>
  );
};

export default KanbanView;

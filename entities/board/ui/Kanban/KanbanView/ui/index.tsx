'use client';

import React, { useMemo, useState } from 'react';
import Kanban from '@/entities/board/ui/Kanban';
import { DragDropProvider } from '@dnd-kit/react';
import KanbanColumn from '@/entities/board/ui/Kanban/KanbanColumn/ui';
import { move } from '@dnd-kit/helpers';
import { KanbanViewType } from '@/entities/board/ui/Kanban/KanbanView/types';
import { updateTaskColumn } from '@/shared/_api/board/tasks';
import { normalizeBoardData } from '@/entities/board/ui/Kanban/config';

const KanbanView = ({ boardData }: KanbanViewType) => {
  const {
    columns,
    tasksMap,
    items: initialItems,
    taskToColumn: initialMap,
  } = useMemo(() => normalizeBoardData(boardData), [boardData]);

  const [items, setItems] = useState(initialItems);
  const [taskToColumn, setTaskToColumn] = useState(initialMap);

  const handleDragEnd = (e: any) => {
    if (e.canceled) return;

    const { source, target } = e.operation;
    if (!target) return;

    const taskId = Number(source?.id);
    if (!taskId) return;

    const oldColumnId = taskToColumn[taskId];

    const next = move(items, e);

    const newColumnId = Object.keys(next).find((colId) =>
      next[colId].includes(taskId)
    );

    setItems(next);

    const columnChanged = newColumnId && oldColumnId !== newColumnId;

    if (columnChanged) {
      setTaskToColumn((prev) => ({
        ...prev,
        [taskId]: newColumnId,
      }));

      updateTaskColumn(taskId, newColumnId);
    }
  };

  return (
    <DragDropProvider onDragEnd={(e) => handleDragEnd(e)}>
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

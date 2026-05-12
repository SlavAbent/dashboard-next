'use client';

import React, { useMemo, useState } from 'react';
import Kanban from '@/entities/board/ui/Kanban';
import { DragDropProvider } from '@dnd-kit/react';
import KanbanColumn from '@/features/KanbanColumn/ui';
import { move } from '@dnd-kit/helpers';
import { KanbanViewType } from '@/widgets/KanbanView/types';
import { updateTaskColumn } from '@/shared/_api/board/tasks';
import { normalizeBoardData } from '@/entities/board/ui/Kanban/config';
import type { DragEndEvent } from '@dnd-kit/react';

const KanbanView = ({ boardData }: KanbanViewType) => {
  const {
    columns,
    tasksMap,
    items: initialItems,
  } = useMemo(() => normalizeBoardData(boardData), [boardData]);

  const [items, setItems] = useState(initialItems);

  const findColumnByTaskId = (
    data: Record<string, number[]>,
    taskId: string
  ) => {
    return Object.keys(data).find((columnId) =>
      data[columnId].some((id) => String(id) === taskId)
    );
  };

  const handleDragEnd = async (e: DragEndEvent) => {
    if (e.canceled) return;

    const { source, target } = e.operation;
    if (!source || !target) return;
    const taskId = String(source.id);

    const prevItems = items;
    const next = move(items, e);

    const oldColumnId = findColumnByTaskId(prevItems, taskId);
    const newColumnId = findColumnByTaskId(next, taskId);

    if (!newColumnId || oldColumnId === newColumnId) return;

    setItems(next);

    try {
      await updateTaskColumn(Number(taskId), newColumnId);
    } catch (error) {
      console.error(error);

      setItems(prevItems);
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
              className="mb-8 flex h-full flex-1 flex-col rounded-xl border p-5">
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

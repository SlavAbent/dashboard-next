'use client';

import React, { useEffect, useMemo, useState } from 'react';
import BoardKanban from '@/widgets/Board/ui/BoardKanban/BoardKanban';
import { DragDropProvider } from '@dnd-kit/react';
import KanbanColumn from '@/features/KanbanColumn/ui/KanbanColumn';
import { move } from '@dnd-kit/helpers';
import { normalizeBoardData } from '@/entities/board/lib/normalize-board-data';
import type { DragEndEvent } from '@dnd-kit/react';
import { useBoardStore } from '@/entities/board/model/useDataStore';
import { groupTasksToFolders } from '@/shared/lib/groupTasksToFolders';
import { updateFolderColumn } from '@/entities/board/api/tasks';

const KanbanView = () => {
  const tasks = useBoardStore((state) => state.tasks);
  const columns = useBoardStore((state) => state.columns);
  const tasksFolders = useBoardStore((state) => state.tasksFolder);

  const boardData = useMemo(
    () => groupTasksToFolders(tasks, columns, tasksFolders),
    [tasks, columns]
  );

  const normalized = useMemo(() => normalizeBoardData(boardData), [boardData]);
  const { columns: columnMap, tasksMap, items: derivedItems } = normalized;

  const [items, setItems] = useState(derivedItems);

  useEffect(() => {
    setItems(derivedItems);
  }, [derivedItems]);

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

    if (!newColumnId) return;

    setItems(next);

    if (oldColumnId === newColumnId) return;

    try {
      await updateFolderColumn(Number(taskId), newColumnId);
    } catch (error) {
      console.error(error);

      setItems(prevItems);
    }
  };

  return (
    <DragDropProvider onDragEnd={(e) => handleDragEnd(e)}>
      <div className="flex h-full items-start gap-6">
        {Object.entries(columnMap).map(([columnId, column]) => {
          return (
            <KanbanColumn
              key={columnId}
              id={columnId}
              className="mb-8 flex h-full flex-1 flex-col rounded-xl border p-5">
              <BoardKanban
                column={column}
                itemIds={items[columnId] ?? []}
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

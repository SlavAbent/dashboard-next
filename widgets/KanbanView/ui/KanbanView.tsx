'use client';

import { move } from '@dnd-kit/helpers';
import type { DragEndEvent } from '@dnd-kit/react';
import { DragDropProvider } from '@dnd-kit/react';
import React, { useMemo } from 'react';

import { useFilteredTasks } from '@/entities/board/hooks/use-filtered-tasks';
import { groupTasksToFolders } from '@/entities/board/lib/group-tasks-to-folders';
import { normalizeBoardData } from '@/entities/board/lib/normalize-board-data';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import { BoardModals } from '@/features/board-modal';
import KanbanColumn from '@/features/KanbanColumn/ui/KanbanColumn';
import type { EntityId } from '@/shared/lib/same-id';
import { toIdString } from '@/shared/lib/same-id';
import BoardKanban from '@/widgets/Board/ui/BoardKanban/BoardKanban';

const KanbanView = () => {
  const filteredTasks = useFilteredTasks();

  const columns = useBoardStore((state) => state.columns);
  const taskFolders = useBoardStore((state) => state.taskFolders);
  const updateFolder = useBoardStore((state) => state.updateFolder);

  const boardData = useMemo(() => {
    return groupTasksToFolders(filteredTasks, columns, taskFolders);
  }, [filteredTasks, columns, taskFolders]);

  const normalizedData = useMemo(() => {
    return normalizeBoardData(boardData);
  }, [boardData]);

  const { columns: columnMap, tasksMap, items: derivedItems } = normalizedData;
  const items = derivedItems;

  const findColumnByFolderId = (
    data: Record<string, EntityId[]>,
    folderId: string
  ) => {
    return Object.keys(data).find((columnId) =>
      data[columnId].some((id) => toIdString(id) === folderId)
    );
  };

  const handleDragEnd = async (e: DragEndEvent) => {
    if (e.canceled) return;

    const { source, target } = e.operation;
    if (!source || !target) return;

    const folderId = String(source.id);

    const prevItems = items;
    const nextItems = move(items, e);

    const oldColumnId = findColumnByFolderId(prevItems, folderId);
    const newColumnId = findColumnByFolderId(nextItems, folderId);

    if (!newColumnId) return;

    if (oldColumnId !== newColumnId) {
      try {
        await updateFolder(folderId, { columnId: newColumnId });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <BoardModals />

      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="flex h-full items-start gap-6">
          {Object.entries(columnMap).map(([columnId, column]) => (
            <KanbanColumn
              key={columnId}
              id={columnId}
              className="mb-8 flex h-full flex-1 flex-col overflow-auto rounded-xl border p-5">
              <BoardKanban
                column={column}
                itemIds={items[columnId] ?? []}
                tasksMap={tasksMap}
              />
            </KanbanColumn>
          ))}
        </div>
      </DragDropProvider>
    </>
  );
};

export default KanbanView;

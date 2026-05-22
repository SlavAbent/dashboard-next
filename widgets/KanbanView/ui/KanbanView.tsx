'use client';

import React, { useEffect, useMemo, useState } from 'react';
import BoardKanban from '@/widgets/Board/ui/BoardKanban/BoardKanban';
import { DragDropProvider } from '@dnd-kit/react';
import KanbanColumn from '@/features/KanbanColumn/ui/KanbanColumn';
import { move } from '@dnd-kit/helpers';
import { normalizeBoardData } from '@/entities/board/lib/normalize-board-data';
import type { DragEndEvent } from '@dnd-kit/react';
import { useBoardStore } from '@/entities/board/model/useDataStore';
import { useFilteredTasks } from '@/entities/board/model/use-filtered-tasks';
import { groupTasksToFolders } from '@/entities/board/lib/group-tasks-to-folders';
import { BoardModals } from '@/features/board-modal';
import type { EntityId } from '@/shared/lib/same-id';
import { toIdString } from '@/shared/lib/same-id';

const KanbanView = () => {
  const filteredTasks = useFilteredTasks();
  const columns = useBoardStore((state) => state.columns);
  const tasksFolders = useBoardStore((state) => state.tasksFolder);
  const updateFolder = useBoardStore((state) => state.updateFolder);

  const boardData = useMemo(
    () => groupTasksToFolders(filteredTasks, columns, tasksFolders),
    [filteredTasks, columns, tasksFolders]
  );

  const normalized = useMemo(() => normalizeBoardData(boardData), [boardData]);
  const { columns: columnMap, tasksMap, items: derivedItems } = normalized;

  const [items, setItems] = useState(derivedItems);

  useEffect(() => {
    setItems(derivedItems);
  }, [derivedItems]);

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
    const next = move(items, e);

    const oldColumnId = findColumnByFolderId(prevItems, folderId);
    const newColumnId = findColumnByFolderId(next, folderId);

    if (!newColumnId) return;

    setItems(next);

    if (oldColumnId === newColumnId) return;

    try {
      await updateFolder(folderId, { columnId: newColumnId });
    } catch (error) {
      console.error(error);
      setItems(prevItems);
    }
  };

  return (
    <>
      <BoardModals />
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
    </>
  );
};

export default KanbanView;

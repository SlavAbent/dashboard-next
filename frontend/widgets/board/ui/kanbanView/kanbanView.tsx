'use client';

import { move } from '@dnd-kit/helpers';
import type { DragEndEvent } from '@dnd-kit/react';
import { DragDropProvider } from '@dnd-kit/react';
import React, { useMemo } from 'react';

import {
  groupTasksToFolders,
  normalizeBoardData,
  useBoardStore,
  useFilteredTasks,
} from '@/entities/board';
import { BoardModals } from '@/features/boardModal';
import KanbanColumn from '@/features/kanbanColumn/ui/kanbanColumn';
import { notifications } from '@/shared/lib/notifications';
import {
  findColumnByFolderId,
  getFolderOrder,
} from '@/widgets/board/lib/folderOrdering';
import BoardKanban from '@/widgets/board/ui/boardKanban/boardKanban';

const KanbanView = () => {
  const filteredTasks = useFilteredTasks();

  const columns = useBoardStore((state) => state.columns);
  const taskFolders = useBoardStore((state) => state.taskFolders);
  const reorderFolder = useBoardStore((state) => state.reorderFolder);

  const boardData = useMemo(() => {
    return groupTasksToFolders(filteredTasks, columns, taskFolders);
  }, [filteredTasks, columns, taskFolders]);

  const normalizedData = useMemo(() => {
    return normalizeBoardData(boardData);
  }, [boardData]);

  const { columns: columnMap, tasksMap, items: derivedItems } = normalizedData;
  const items = derivedItems;

  const handleDragEnd = async (e: DragEndEvent) => {
    if (e.canceled) return;

    const { source, target } = e.operation;
    if (!source || !target) return;

    const folderId = String(source.id);

    const nextItems = move(items, e);

    const newColumnId = findColumnByFolderId(nextItems, folderId);

    if (!newColumnId) return;

    const folder = taskFolders.find((item) => item.id === folderId);
    const nextOrder = getFolderOrder(
      nextItems[newColumnId] ?? [],
      folderId,
      taskFolders
    );

    if (!folder || nextOrder === null) return;
    if (folder.columnId === newColumnId && folder.order === nextOrder) return;

    try {
      await notifications.folder.run('move', () =>
        reorderFolder(folder.id, {
          columnId: newColumnId,
          order: nextOrder,
        })
      );
    } catch {
      // The store rolls back the folder and the factory reports the error.
    }
  };

  return (
    <>
      <BoardModals />

      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="flex h-full min-w-max items-start gap-3 sm:gap-4 md:gap-5 xl:min-w-full xl:gap-6">
          {Object.entries(columnMap).map(([columnId, column]) => (
            <KanbanColumn
              key={columnId}
              id={columnId}
              className="mb-8 flex h-full w-[min(84vw,22rem)] shrink-0 flex-col overflow-auto rounded-xl border p-3 sm:w-80 sm:p-4 md:p-5 xl:w-auto xl:min-w-96 xl:flex-1">
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

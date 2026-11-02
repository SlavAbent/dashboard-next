'use client';

import { move } from '@dnd-kit/helpers';
import type { DragEndEvent } from '@dnd-kit/react';
import { DragDropProvider } from '@dnd-kit/react';
import type { EntityId } from '@lib/sameId';
import { sameId, toIdString } from '@lib/sameId';
import React, { useMemo } from 'react';

import {
  groupTasksToFolders,
  normalizeBoardData,
  useBoardStore,
  useFilteredTasks,
} from '@/entities/board';
import { BoardModals } from '@/features/boardModal';
import KanbanColumn from '@/features/kanbanColumn/ui/kanbanColumn';
import BoardKanban from '@/widgets/board/ui/boardKanban/boardKanban';

export const getFolderOrder = (
  ids: EntityId[],
  folderId: EntityId,
  folders: Array<{ id: EntityId; order: number }>
) => {
  const folderIndex = ids.findIndex((id) => sameId(id, folderId));

  if (folderIndex < 0) return null;

  const previousId = ids[folderIndex - 1];
  const nextId = ids[folderIndex + 1];
  const previousFolder = folders.find((folder) =>
    sameId(folder.id, previousId)
  );
  const nextFolder = folders.find((folder) => sameId(folder.id, nextId));

  if (previousFolder && nextFolder) {
    return (previousFolder.order + nextFolder.order) / 2;
  }

  if (previousFolder) return previousFolder.order + 1;
  if (nextFolder) return nextFolder.order - 1;

  return 1;
};

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

    const nextItems = move(items, e);

    const newColumnId = findColumnByFolderId(nextItems, folderId);

    if (!newColumnId) return;

    const folder = taskFolders.find((item) => sameId(item.id, folderId));
    const nextOrder = getFolderOrder(
      nextItems[newColumnId] ?? [],
      folderId,
      taskFolders
    );

    if (!folder || nextOrder === null) return;
    if (folder.columnId === newColumnId && folder.order === nextOrder) return;

    try {
      await reorderFolder(folder.id, {
        columnId: newColumnId,
        order: nextOrder,
      });
    } catch (error) {
      console.error(error);
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

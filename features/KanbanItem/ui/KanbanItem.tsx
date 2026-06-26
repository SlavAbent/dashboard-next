'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/react/sortable';
import { KanbanItemType } from '@/features/KanbanItem/types/kanban-item.types';
import { FolderContent } from '@/features/board-folder';
import { toIdString } from '@/shared/lib/same-id';

const KanbanItem = (props: KanbanItemType) => {
  const { id, index, folder } = props;
  const { ref, handleRef, isDragging } = useSortable({
    id: toIdString(id),
    index,
  });

  return (
    <div ref={ref} data-dragging={isDragging} data-folder-id={folder.id}>
      <FolderContent
        folderId={folder.id}
        columnId={folder.columnId}
        title={folder.title}
        dragHandleRef={handleRef}
        isDragging={isDragging}
      />
    </div>
  );
};

export default KanbanItem;

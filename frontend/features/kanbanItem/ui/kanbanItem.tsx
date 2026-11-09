'use client';

import { useSortable } from '@dnd-kit/react/sortable';
import { toIdString } from '@lib/sameId';
import React from 'react';

import { FolderContent } from '@/features/boardFolder';
import { KanbanItemType } from '@/features/kanbanItem/types/kanbanItem.types';

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
        startDate={folder.startDate}
        endDate={folder.endDate}
        priority={folder.priority}
        dragHandleRef={handleRef}
        isDragging={isDragging}
      />
    </div>
  );
};

export default KanbanItem;

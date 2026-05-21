'use client';

import React from 'react';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import { useSortable } from '@dnd-kit/react/sortable';
import { KanbanItemType } from '@/features/KanbanItem/types/kanban-item.types';
import { toIdString } from '@/shared/lib/same-id';
import cn from 'clsx';

const KanbanItem = (props: KanbanItemType) => {
  const { id, index, folder } = props;
  const { ref, isDragging } = useSortable({
    id: toIdString(id),
    index,
  });

  const styledCardOnMove = isDragging ? 'bg-neutral-20' : 'bg-white';

  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      className={cn('rounded-sm border p-[18px]', styledCardOnMove)}>
      <TypographyP text={folder.title} />
    </div>
  );
};

export default KanbanItem;

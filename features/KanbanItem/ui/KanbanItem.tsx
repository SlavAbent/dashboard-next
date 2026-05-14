'use client';

import React from 'react';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import { useSortable } from '@dnd-kit/react/sortable';
import { KanbanItemType } from '@/features/KanbanItem/types/kanban-item.types';
import cn from 'clsx';

const KanbanItem = (props: KanbanItemType) => {
  const { id, index, task } = props;
  const { ref, isDragging } = useSortable({
    id: String(id),
    index,
  });

  const styledCardOnMove = isDragging ? 'bg-neutral-20' : 'bg-white';

  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      className={cn('rounded-sm border p-[18px]', styledCardOnMove)}>
      <TypographyP text={task.text} />
    </div>
  );
};

export default KanbanItem;

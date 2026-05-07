'use client';

import React from 'react';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import { useSortable } from '@dnd-kit/react/sortable';
import { KanbanItemType } from '@/features/KanbanItem/types';

const KanbanItem = (props: KanbanItemType) => {
  const { id, index, task } = props;
  const { ref, isDragging } = useSortable({
    id: String(id),
    index,
  });

  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      className="rounded-sm border bg-white p-[18px]">
      <TypographyP text={task.text} />
    </div>
  );
};

export default KanbanItem;

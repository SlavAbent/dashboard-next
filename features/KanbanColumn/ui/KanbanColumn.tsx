'use client';

import { useDroppable } from '@dnd-kit/react';
import React from 'react';

import { KanbanColumnType } from '@/features/KanbanColumn/types/kanban-column.types';

const KanbanColumn = (props: KanbanColumnType) => {
  const { children, id, className } = props;
  const { ref } = useDroppable({ id });

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default KanbanColumn;

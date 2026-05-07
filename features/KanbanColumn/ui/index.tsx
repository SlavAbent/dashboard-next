'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/react';
import { KanbanColumnType } from '@/features/KanbanColumn/types';

const KanbanColumn = (props: KanbanColumnType) => {
  const { children, id, className } = props;
  const { isDropTarget, ref } = useDroppable({ id });

  return (
    <div
      className={className}
      ref={ref}
      style={isDropTarget ? { background: '#00000030' } : undefined}>
      {children}
    </div>
  );
};

export default KanbanColumn;

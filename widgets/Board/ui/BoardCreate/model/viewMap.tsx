'use client';

import type { BoardViewMode } from '@/entities/board/model/types/list-types';
import React from 'react';
import BoardView from '@/widgets/ListView/BoardView';
import KanbanView from '@/widgets/KanbanView/ui/KanbanView';

export const viewMap: Record<BoardViewMode, React.FC<any>> = {
  List: BoardView,
  Kanban: KanbanView,
};

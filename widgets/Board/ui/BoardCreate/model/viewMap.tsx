import { BoardColumn } from '@/widgets/Board/types';
import React from 'react';
import Index from '@/widgets/ListView';
import { ViewType } from '@/entities/board/types';
import KanbanView from '@/widgets/KanbanView/ui';

type ViewProps = {
  boardData: BoardColumn[];
};

export const viewMap: Record<ViewType, React.FC<ViewProps>> = {
  List: Index,
  Kanban: KanbanView,
};

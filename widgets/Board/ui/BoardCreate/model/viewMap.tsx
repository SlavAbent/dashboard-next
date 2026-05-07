import { BoardColumn } from '@/widgets/Board/types';
import React from 'react';
import Index from '@/entities/board/ui/List/ListView';
import Table from '@/entities/board/ui/Table';
import { ViewType } from '@/entities/board/types';
import KanbanView from '@/entities/board/ui/Kanban/KanbanView/ui';

type ViewProps = {
  boardData: BoardColumn[];
};

export const viewMap: Record<ViewType, React.FC<ViewProps>> = {
  List: Index,
  Kanban: KanbanView,
  Table: Table,
};

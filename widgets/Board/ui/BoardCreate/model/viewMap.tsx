import type {
  BoardColumn,
  BoardViewMode,
} from '@/entities/board/model/types';
import React from 'react';
import BoardListView from '@/widgets/ListView/BoardListView';
import KanbanView from '@/widgets/KanbanView/ui/KanbanView';

type ViewProps = {
  boardData: BoardColumn[];
};

export const viewMap: Record<BoardViewMode, React.FC<ViewProps>> = {
  List: BoardListView,
  Kanban: KanbanView,
};

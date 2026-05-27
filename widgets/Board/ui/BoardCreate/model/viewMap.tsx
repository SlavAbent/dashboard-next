'use client';

import type { BoardViewMode } from '@/entities/board/model/types/list-types';
import { ComponentType } from 'react';
import BoardView from '@/widgets/ListView/BoardView';
import KanbanView from '@/widgets/KanbanView/ui/KanbanView';

type ViewComponent = ComponentType;

export const viewMap = {
  List: BoardView,
  Kanban: KanbanView,
} satisfies Record<BoardViewMode, ViewComponent>;

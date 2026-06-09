'use client';

import type { BoardViewMode } from '@/entities/board/model/types/list-types';
import { ComponentType } from 'react';
import BoardView from '@/widgets/ListView/BoardView';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/shared/components/Skeleton/skeleton';

const KanbanView = dynamic(() => import('@/widgets/KanbanView/ui/KanbanView'), {
  loading: () => <Skeleton mode="shimmer" />,
  ssr: false,
});

type ViewComponent = ComponentType;

export const viewMap = {
  List: BoardView,
  Kanban: KanbanView,
} satisfies Record<BoardViewMode, ViewComponent>;

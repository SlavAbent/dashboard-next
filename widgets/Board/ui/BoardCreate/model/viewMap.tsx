'use client';

import type { BoardViewMode } from '@/entities/board/model/types/list-types';
import { ComponentType } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/shared/components/Skeleton/skeleton';

const KanbanView = dynamic(() => import('@/widgets/KanbanView/ui/KanbanView'), {
  loading: () => <Skeleton mode="shimmer" className="h-screen w-full" />,
  ssr: false,
});

const BoardView = dynamic(() => import('@/widgets/ListView/BoardView'), {
  loading: () => <Skeleton mode="shimmer" className="h-screen w-full" />,
  ssr: false,
});

type ViewComponent = ComponentType;

export const viewMap = {
  List: BoardView,
  Kanban: KanbanView,
} satisfies Record<BoardViewMode, ViewComponent>;

'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

import type { BoardViewMode } from '@/entities/board/model/types/list.types';
import { Skeleton } from '@/shared/components/skeleton/skeleton';

const KanbanView = dynamic(() => import('@/widgets/kanbanView/ui/kanbanView'), {
  loading: () => <Skeleton mode="shimmer" className="h-screen w-full" />,
  ssr: false,
});

const BoardView = dynamic(() => import('@/widgets/listView/ui/boardView'), {
  loading: () => <Skeleton mode="shimmer" className="h-screen w-full" />,
  ssr: false,
});

type ViewComponent = ComponentType;

export const viewMap = {
  List: BoardView,
  Kanban: KanbanView,
} satisfies Record<BoardViewMode, ViewComponent>;

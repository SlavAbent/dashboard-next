'use client';

import React from 'react';
import type { BoardColumn } from '@/entities/board/model/types';
import { useListStore } from '@/entities/board/model/list.store';
import { viewMap } from '@/widgets/Board/ui/BoardCreate/model/viewMap';

const BoardCreate = ({ boardData }: { boardData: BoardColumn[] }) => {
  const { view } = useListStore();

  const ViewComponents = viewMap[view];

  return <ViewComponents boardData={boardData} />;
};

export default BoardCreate;

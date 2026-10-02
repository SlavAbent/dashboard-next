'use client';

import React from 'react';

import { useViewStore } from '@/entities/board/model/list.store';
import { viewMap } from '@/widgets/board/ui/boardCreate/model/viewMap';

const BoardCreate = () => {
  const view = useViewStore((state) => state.view);

  const ViewComponents = viewMap[view];

  return <ViewComponents />;
};

export default BoardCreate;

'use client';

import BoardCreate from '@/widgets/Board/ui/BoardCreate/BoardCreate';
import { BoardHydratorType } from '@/widgets/Board/ui/BoardHydrator/board-hydrator';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import { useEffect } from 'react';

const BoardHydrator = ({ tasks, columns, folders }: BoardHydratorType) => {
  const setBoardData = useBoardStore((state) => state.setBoardData);

  useEffect(() => {
    setBoardData(tasks, columns, folders);
  }, [tasks, columns, folders]);

  return <BoardCreate />;
};

export default BoardHydrator;

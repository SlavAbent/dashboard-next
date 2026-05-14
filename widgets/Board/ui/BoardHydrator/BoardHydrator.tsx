'use client';

import BoardCreate from '@/widgets/Board/ui/BoardCreate/BoardCreate';
import { BoardHydratorType } from '@/widgets/Board/ui/BoardHydrator/board-hydrator';
import { useBoardStore } from '@/entities/board/model/useDataStore';
import { useEffect } from 'react';

const BoardHydrator = ({ tasks, columns }: BoardHydratorType) => {
  const setBoardData = useBoardStore((state) => state.setBoardData);

  useEffect(() => {
    setBoardData(tasks, columns);
  }, [tasks, columns]);

  return <BoardCreate />;
};

export default BoardHydrator;

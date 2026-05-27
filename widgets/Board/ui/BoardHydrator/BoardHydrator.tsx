'use client';

import BoardCreate from '@/widgets/Board/ui/BoardCreate/BoardCreate';
import { BoardHydratorType } from '@/widgets/Board/ui/BoardHydrator/board-hydrator';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import { useEffect, useRef } from 'react';

const BoardHydrator = ({ tasks, columns, folders }: BoardHydratorType) => {
  const hydratedRef = useRef(false);
  const setBoardData = useBoardStore((state) => state.setBoardData);

  useEffect(() => {
    if (hydratedRef.current) return;

    setBoardData(tasks, columns, folders);

    hydratedRef.current = true;
  }, []);

  return <BoardCreate />;
};

export default BoardHydrator;

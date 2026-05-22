'use client';

import BoardCreate from '@/widgets/Board/ui/BoardCreate/BoardCreate';
import { BoardHydratorType } from '@/widgets/Board/ui/BoardHydrator/board-hydrator';
import { useBoardStore } from '@/entities/board/model/useDataStore';
import { useEffect } from 'react';

const BoardHydrator = ({ tasks, columns, folders }: BoardHydratorType) => {
  const setBoardData = useBoardStore((state) => state.setBoardData);
  const setFolders = useBoardStore((state) => state.setFolders);

  useEffect(() => {
    setBoardData(tasks, columns);
  }, [tasks, columns]);

  useEffect(() => {
    setFolders(folders);
  }, [folders]);

  return <BoardCreate />;
};

export default BoardHydrator;

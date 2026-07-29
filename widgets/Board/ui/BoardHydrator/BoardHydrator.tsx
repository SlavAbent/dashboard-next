'use client';

import { useEffect, useRef } from 'react';

import { useBoardStore } from '@/entities/board/model/use-data.store';
import { useScrollHighlight } from '@/shared/hooks/useScrollHighlight';
import BoardCreate from '@/widgets/Board/ui/BoardCreate/BoardCreate';
import { BoardHydratorType } from '@/widgets/Board/ui/BoardHydrator/board-hydrator';

const BoardHydrator = ({
  tasks,
  columns,
  folders,
  taskId,
}: BoardHydratorType) => {
  const hydratedRef = useRef(false);
  const setBoardData = useBoardStore((state) => state.setBoardData);
  const toggleColumn = useBoardStore((state) => state.toggleColumn);
  const closedColumns = useBoardStore((state) => state.closedColumns);

  useEffect(() => {
    if (hydratedRef.current) return;

    setBoardData(tasks, columns, folders);

    hydratedRef.current = true;
  }, [columns, folders, setBoardData, tasks]);

  useEffect(() => {
    if (!taskId) return;

    const task = tasks.find((item) => String(item.id) === taskId);
    const folder = task
      ? folders.find((item) => String(item.id) === String(task.taskFolderId))
      : undefined;

    if (folder && closedColumns.includes(folder.columnId)) {
      toggleColumn(folder.columnId);
    }
  }, [taskId, tasks, folders, closedColumns, toggleColumn]);

  useScrollHighlight(taskId, 'data-task-id');

  return <BoardCreate />;
};

export default BoardHydrator;

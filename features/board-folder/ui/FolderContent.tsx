'use client';

import React, { useMemo, type Ref } from 'react';
import { TypographyP } from '@/shared/components/Typography/TypographyP';
import { Checkbox } from '@/shared/components/checkbox';
import { FolderDropdown } from '@/features/folder-actions';
import { FolderTaskList } from '@/features/folder-task';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import { useFilteredTasks } from '@/entities/board/model/use-filtered-tasks';
import { useBoardModalStore } from '@/features/board-modal';
import { sameId, type EntityId } from '@/shared/lib/same-id';
import { cn } from '@/shared/lib/cn';

type FolderContentProps = {
  folderId: EntityId;
  columnId: string;
  title: string;
  dragHandleRef?: Ref<HTMLDivElement>;
  isDragging?: boolean;
};

const FolderContent = ({
  folderId,
  columnId,
  title,
  dragHandleRef,
  isDragging,
}: FolderContentProps) => {
  const moveFolder = useBoardStore((state) => state.moveFolder);
  const filteredTasks = useFilteredTasks();
  const openCreateTask = useBoardModalStore((state) => state.openCreateTask);
  const openEditTask = useBoardModalStore((state) => state.openEditTask);

  const folderTasks = useMemo(
    () =>
      filteredTasks.filter(
        (task) =>
          task.tasksFolderId != null && sameId(task.tasksFolderId, folderId)
      ),
    [filteredTasks, folderId]
  );

  return (
    <div
      className={cn(
        'flex flex-col rounded-sm border bg-white',
        isDragging && 'opacity-60'
      )}>
      <div
        ref={dragHandleRef}
        className={cn(
          'flex cursor-grab items-center px-5 py-[18px] active:cursor-grabbing'
        )}>
        <div className="flex grow items-center gap-4">
          <Checkbox
            checked={columnId === 'completed'}
            onCheckedChange={() => moveFolder(folderId, columnId)}
          />
          <TypographyP text={title} />
        </div>
        <FolderDropdown folderId={folderId} columnId={columnId} />
      </div>
      <FolderTaskList
        folderId={folderId}
        tasks={folderTasks}
        onAddTask={openCreateTask}
        onEditTask={openEditTask}
      />
    </div>
  );
};

export default FolderContent;

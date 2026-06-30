'use client';

import React, { type Ref, useMemo } from 'react';

import { useFilteredTasks } from '@/entities/board/hooks/use-filtered-tasks';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import { FolderDropdown } from '@/features/folder-actions';
import { FolderTaskList } from '@/features/folder-task';
import { Checkbox } from '@/shared/components/Checkbox/checkbox';
import { TypographyP } from '@/shared/components/Typography/TypographyP';
import { cn } from '@/shared/lib/cn';
import { type EntityId, sameId } from '@/shared/lib/same-id';

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

  const folderTasks = useMemo(
    () => filteredTasks.filter((task) => sameId(task.taskFolderId, folderId)),
    [filteredTasks, folderId]
  );

  return (
    <div
      data-folder-id={folderId}
      className={cn(
        'flex flex-col rounded-sm border',
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
      <FolderTaskList folderId={folderId} tasks={folderTasks} />
    </div>
  );
};

export default FolderContent;

'use client';

import { TypographyP } from '@dashboard/ui';
import { ScheduleMeta } from '@dashboard/ui';
import { cn } from '@lib/cn';
import { type EntityId, sameId } from '@lib/sameId';
import React, { type Ref, useMemo } from 'react';

import { useFilteredTasks } from '@/entities/board/model/useFilteredTasks';
import { FolderDropdown } from '@/features/folderActions';
import { FolderTaskList } from '@/features/folderTask';
import { type Priority, priorityConfig } from '@/shared/model/schedule';

type FolderContentProps = {
  folderId: EntityId;
  columnId: string;
  title: string;
  startDate: string | null;
  endDate: string | null;
  priority: Priority;
  dragHandleRef?: Ref<HTMLDivElement>;
  isDragging?: boolean;
};

const FolderContent = ({
  folderId,
  columnId,
  title,
  startDate,
  endDate,
  priority,
  dragHandleRef,
  isDragging,
}: FolderContentProps) => {
  const filteredTasks = useFilteredTasks();

  const folderTasks = useMemo(
    () => filteredTasks.filter((task) => sameId(task.taskFolderId, folderId)),
    [filteredTasks, folderId]
  );

  return (
    <div
      data-folder-id={folderId}
      className={cn(
        'relative flex flex-col rounded-sm border',
        priorityConfig[priority].cardBorderClassName,
        isDragging && 'opacity-60'
      )}>
      <span
        className={cn(
          'absolute top-0 left-5 z-10 -translate-y-1/2 rounded-sm border px-1.5 py-0.5 text-[10px] leading-none font-medium',
          priorityConfig[priority].cardBadgeClassName
        )}>
        {priorityConfig[priority].label}
      </span>
      <div className="flex items-center px-5 py-[18px]">
        <div
          ref={dragHandleRef}
          className="flex min-w-0 grow cursor-grab items-center active:cursor-grabbing">
          <div className="min-w-0">
            <TypographyP text={title} />
            <ScheduleMeta
              startDate={startDate}
              endDate={endDate}
              priority={priority}
              showPriority={false}
            />
          </div>
        </div>
        <FolderDropdown folderId={folderId} columnId={columnId} />
      </div>
      <FolderTaskList folderId={folderId} tasks={folderTasks} />
    </div>
  );
};

export default FolderContent;

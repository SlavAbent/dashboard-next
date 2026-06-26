'use client';

import React from 'react';
import FolderTaskItem from '@/features/folder-task/ui/FolderTaskItem';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import type { Task } from '@/entities/board/model/types/list-types';
import { EntityId } from '@/shared/lib/same-id';
import { useBoardModalStore } from '@/features/board-modal';

type FolderTaskListProps = {
  folderId: EntityId;
  tasks: Task[];
};

const FolderTaskList = ({ folderId, tasks }: FolderTaskListProps) => {
  const onAddTask = useBoardModalStore((state) => state.openCreateTask);
  const onEditTask = useBoardModalStore((state) => state.openEditTask);

  return (
    <div className="border-border flex flex-col gap-1 border-t px-5 pt-3 pb-4">
      <div className="flex flex-col gap-1">
        {tasks.length === 0 ? (
          <TypographySmall text="No tasks found." />
        ) : (
          tasks.map((task) => (
            <FolderTaskItem
              key={String(task.id)}
              task={task}
              onEdit={() => onEditTask(task.id)}
            />
          ))
        )}
      </div>
      <button
        type="button"
        onClick={() => onAddTask(folderId)}
        className="bg-secondary text-secondary-foreground mt-2 flex !h-[32px] w-full cursor-pointer items-center justify-center gap-2 rounded-sm">
        <PlusIcon size={iconSize(14)} className="text-muted-foreground" />
        <TypographySmall text="Add task" className="text-muted-foreground" />
      </button>
    </div>
  );
};

export default FolderTaskList;

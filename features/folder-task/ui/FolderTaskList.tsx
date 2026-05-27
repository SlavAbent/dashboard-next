'use client';

import React from 'react';
import FolderTaskItem from '@/features/folder-task/ui/FolderTaskItem';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { TypographySmall } from '@/shared/ui/Typography/TypographySmall';
import type { Task } from '@/entities/board/model/types/list-types';
import type { EntityId } from '@/shared/lib/same-id';

type FolderTaskListProps = {
  folderId: EntityId;
  tasks: Task[];
  onAddTask: (folderId: EntityId) => void;
  onEditTask: (taskId: EntityId) => void;
};

const FolderTaskList = ({
  folderId,
  tasks,
  onAddTask,
  onEditTask,
}: FolderTaskListProps) => {
  return (
    <div className="flex flex-col gap-1 border-t border-[#E8E8E8] px-5 pt-3 pb-4">
      <div className="flex flex-col gap-1">
        {tasks.length === 0 ? (
          <p className="text-neutral-80 py-2 text-sm">Нет задач</p>
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
        className="mt-2 flex !h-[32px] w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-[rgba(114,114,114,0.12)]">
        <PlusIcon size={iconSize(14)} className="text-neutral-80" />
        <TypographySmall text="Add task" className="text-neutral-80" />
      </button>
    </div>
  );
};

export default FolderTaskList;

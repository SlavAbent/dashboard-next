'use client';

import React, { useMemo } from 'react';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import { Checkbox } from '@/shared/ui/checkbox';
import { FolderDropdown } from '@/features/folder-actions';
import { FolderTaskList } from '@/features/folder-task';
import { useBoardStore } from '@/entities/board/model/useDataStore';
import { useBoardModalStore } from '@/features/board-modal';
import { sameId, type EntityId } from '@/shared/lib/same-id';

type FolderContentProps = {
  folderId: EntityId;
  columnId: string;
  title: string;
};

const FolderContent = ({ folderId, columnId, title }: FolderContentProps) => {
  const moveFolder = useBoardStore((state) => state.moveFolder);
  const tasks = useBoardStore((state) => state.tasks);
  const openCreateTask = useBoardModalStore((state) => state.openCreateTask);
  const openEditTask = useBoardModalStore((state) => state.openEditTask);

  const folderTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.tasksFolderId != null && sameId(task.tasksFolderId, folderId)
      ),
    [tasks, folderId]
  );

  return (
    <div className="flex flex-col rounded-sm border">
      <div className="flex items-center px-5 py-[18px]">
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

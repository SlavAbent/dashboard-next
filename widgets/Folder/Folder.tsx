'use client';

import React, { useMemo } from 'react';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import { TasksFolder } from '@/entities/board/model/types/list-types';
import { FolderContent } from '@/features/board-folder';

const Folder = ({ columnId }: { columnId: string }) => {
  const allFolders = useBoardStore((state) => state.tasksFolder);

  const folders = useMemo(
    () => allFolders.filter((folder) => folder.columnId === columnId),
    [allFolders, columnId]
  );

  return (
    <div className="flex flex-col gap-5">
      {folders.map((folder: TasksFolder) => {
        const { id, columnId: folderColumnId, title } = folder;

        return (
          <FolderContent
            key={String(id)}
            folderId={id}
            columnId={folderColumnId}
            title={title}
          />
        );
      })}
    </div>
  );
};

export default Folder;

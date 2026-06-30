'use client';

import React, { useMemo } from 'react';

import { TaskFolder } from '@/entities/board/model/types/list-types';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import { FolderContent } from '@/features/board-folder';

const Folder = ({ columnId }: { columnId: string }) => {
  const allFolders = useBoardStore((state) => state.taskFolders);

  const folders = useMemo(
    () => allFolders.filter((folder) => folder.columnId === columnId),
    [allFolders, columnId]
  );

  return (
    <>
      {folders.map((folder: TaskFolder) => {
        return (
          <FolderContent
            key={folder.id}
            folderId={folder.id}
            columnId={folder.columnId}
            title={folder.title}
          />
        );
      })}
    </>
  );
};

export default Folder;

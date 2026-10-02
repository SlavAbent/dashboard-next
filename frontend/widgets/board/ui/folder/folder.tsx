'use client';

import React, { useMemo } from 'react';

import { useBoardStore } from '@/entities/board/model/useData.store';
import { TaskFolder } from '@/entities/folder';
import { FolderContent } from '@/features/boardFolder';

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

'use client';

import React, { useMemo } from 'react';
import { useBoardStore } from '@/entities/board/model/useDataStore';
import { TasksFolder } from '@/entities/board/model/types/list-types';
import FolderContent from '@/widgets/Folder/FolderContent';
import ModalFolder from '@/entities/modal/ui/ModalFolder';

const Folder = ({ columnId }: { columnId: string }) => {
  const allFolders = useBoardStore((state) => state.tasksFolder);

  const folders = useMemo(
    () => allFolders.filter((folder) => folder.columnId === columnId),
    [allFolders, columnId]
  );

  return (
    <div className="flex flex-col gap-5">
      {folders.map((folder: TasksFolder) => {
        const { id, columnId, title } = folder;

        return (
          <FolderContent
            key={id}
            folderId={id}
            columnId={columnId}
            title={title}
          />
        );
      })}
      <ModalFolder />
    </div>
  );
};

export default Folder;

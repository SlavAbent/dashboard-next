import type { EntityId } from '@lib/sameId';

import { useBoardStore } from '@/entities/board';

type EditFolderType = {
  title: string;
  columnId: string;
  folderId: EntityId;
};

export const useEditFolder = () => {
  const { updateFolder } = useBoardStore();

  return async ({ title, columnId, folderId }: EditFolderType) => {
    await updateFolder(folderId, {
      title,
      columnId,
    });
  };
};

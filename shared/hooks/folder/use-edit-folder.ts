import { useBoardStore } from '@/entities/board';
import type { EntityId } from '@/shared/lib/same-id';

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

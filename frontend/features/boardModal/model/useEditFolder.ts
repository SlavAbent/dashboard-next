import type { EntityId } from '@lib/sameId';

import { useBoardStore } from '@/entities/board';

type EditFolderType = {
  title: string;
  columnId: string;
  folderId: EntityId;
  startDate?: string | null;
  endDate?: string | null;
  priority: 'none' | 'low' | 'medium' | 'high' | 'critical';
};

export const useEditFolder = () => {
  const { updateFolder } = useBoardStore();

  return async ({
    title,
    columnId,
    folderId,
    startDate,
    endDate,
    priority,
  }: EditFolderType) => {
    await updateFolder(folderId, {
      title,
      columnId,
      startDate: startDate ?? null,
      endDate: endDate ?? null,
      priority,
    });
  };
};

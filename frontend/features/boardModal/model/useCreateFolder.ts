import { useBoardStore } from '@/entities/board';

type CreateFolderType = {
  title: string;
  columnId: string;
  startDate?: string | null;
  endDate?: string | null;
  priority: 'none' | 'low' | 'medium' | 'high' | 'critical';
};

export const useCreateFolder = () => {
  const { addFolder, taskFolders } = useBoardStore();
  return async ({
    title,
    columnId,
    startDate,
    endDate,
    priority,
  }: CreateFolderType) => {
    const order =
      Math.max(
        0,
        ...taskFolders
          .filter((folder) => folder.columnId === columnId)
          .map((folder) => folder.order)
      ) + 1;

    await addFolder({
      title,
      columnId,
      order,
      startDate: startDate ?? null,
      endDate: endDate ?? null,
      priority,
    });
  };
};

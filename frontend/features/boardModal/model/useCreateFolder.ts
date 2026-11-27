import { getNextOrder, useBoardStore } from '@/entities/board';

type CreateFolderType = {
  title: string;
  columnId: string;
  startDate?: string | null;
  endDate?: string | null;
  priority: 'none' | 'low' | 'medium' | 'high' | 'critical';
};

export const useCreateFolder = () => {
  const addFolder = useBoardStore((state) => state.addFolder);
  const taskFolders = useBoardStore((state) => state.taskFolders);

  return async ({
    title,
    columnId,
    startDate,
    endDate,
    priority,
  }: CreateFolderType) => {
    const order = getNextOrder(
      taskFolders.filter((folder) => folder.columnId === columnId)
    );

    return addFolder({
      title,
      columnId,
      order,
      startDate: startDate ?? null,
      endDate: endDate ?? null,
      priority,
    });
  };
};

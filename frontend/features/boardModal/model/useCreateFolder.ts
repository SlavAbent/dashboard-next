import { useBoardStore } from '@/entities/board';

type CreateFolderType = {
  title: string;
  columnId: string;
};

export const useCreateFolder = () => {
  const { addFolder, taskFolders } = useBoardStore();
  return async ({ title, columnId }: CreateFolderType) => {
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
    });
  };
};

import { useBoardStore } from '@/entities/board';

type CreateFolderType = {
  title: string;
  columnId: string;
};

export const useCreateFolder = () => {
  const { addFolder, taskFolders } = useBoardStore();
  return async ({ title, columnId }: CreateFolderType) => {
    const order =
      taskFolders.filter((folder) => folder.columnId === columnId).length + 1;

    await addFolder({
      title,
      columnId,
      order,
    });
  };
};

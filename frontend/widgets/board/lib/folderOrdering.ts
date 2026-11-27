type OrderedFolder = {
  id: string;
  order: number;
};

export const findColumnByFolderId = (
  items: Record<string, string[]>,
  folderId: string
) =>
  Object.keys(items).find((columnId) =>
    items[columnId].some((id) => id === folderId)
  );

export const getFolderOrder = (
  ids: string[],
  folderId: string,
  folders: OrderedFolder[]
) => {
  const folderIndex = ids.findIndex((id) => id === folderId);

  if (folderIndex < 0) return null;

  const previousId = ids[folderIndex - 1];
  const nextId = ids[folderIndex + 1];
  const previousFolder = folders.find((folder) => folder.id === previousId);
  const nextFolder = folders.find((folder) => folder.id === nextId);

  if (previousFolder && nextFolder) {
    return (previousFolder.order + nextFolder.order) / 2;
  }

  if (previousFolder) return previousFolder.order + 1;
  if (nextFolder) return nextFolder.order - 1;

  return 1;
};

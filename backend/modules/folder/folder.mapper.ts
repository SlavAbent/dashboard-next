import type { FolderDto } from './folder.types.ts';

export const toFolderDto = (
  folder: { id: string; title: string; order: number },
  columnId: string
): FolderDto => ({
  id: folder.id,
  columnId,
  title: folder.title,
  order: folder.order,
});

export type FolderDto = {
  id: string;
  columnId: string;
  title: string;
  order: number;
};

export type CreateFolderInput = {
  columnId: string;
  title: string;
  order: number;
};

export type UpdateFolderInput = {
  title?: string;
  order?: number;
};

export type MoveFolderInput = {
  columnId: string;
  order?: number;
};

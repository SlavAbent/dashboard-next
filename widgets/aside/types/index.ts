export type Folder = {
  id: string | number;
  name: string;
  colorId: string;
  icon: string;
};

export type FolderCreateType = {
  data: {
    menu: Folder[];
  };
};

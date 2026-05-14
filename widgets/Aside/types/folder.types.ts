export type SubHeaderType = {
  filters: boolean;
  grid: boolean;
};

export type Folder = {
  id: string | number;
  name: string;
  colorId: string;
  icon: string;
  subheader: SubHeaderType;
};

export type FolderCreateType = {
  data: {
    menu: Folder[];
  };
};

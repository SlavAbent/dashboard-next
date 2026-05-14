import type { Folder } from '@/widgets/Aside/types/folder.types';

export type FilterType = {
  id: string | number;
  name: string;
  icon: string;
};

export type SubHeaderCreateType = {
  subheaderData: {
    page: {
      name: string;
      view: FilterType[];
    };
  };
  foldersData: {
    menu: Folder[];
  };
};

export type SubHeaderViewControlType = {
  filter: FilterType;
  isActive: boolean;
  handleFilterClick: (id: number) => void;
};

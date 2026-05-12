import { Folder } from '@/widgets/Aside/types';

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

export type ViewType = {
  filter: FilterType;
  isActive: boolean;
  handleFilterClick: (id: number) => void;
};

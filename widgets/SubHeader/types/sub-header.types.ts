import type { NavigationMenuItem } from '@/entities/navigation';

export type FilterType = {
  id: string | number;
  name: string;
  icon: string;
};

export type SubHeaderCreateType = {
  foldersData: { menu: NavigationMenuItem[] };
  subheaderData: {
    page: {
      name: string;
      view: FilterType[];
    };
  };
};

export type SubHeaderViewControlType = {
  filter: FilterType;
  isActive: boolean;
  handleFilterClick: () => void;
};

import type { NavigationMenu } from '@/entities/navigation';

export type FilterType = {
  id: string;
  name: string;
  icon: string;
};

export type SubHeaderCreateType = {
  navigation: NavigationMenu;
};

export type SubHeaderViewControlType = {
  filter: FilterType;
  isActive: boolean;
  handleFilterClick: () => void;
};

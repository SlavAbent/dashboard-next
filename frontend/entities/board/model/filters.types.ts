import type {
  TaskFilterOption,
  TaskSortOption,
} from '@/entities/task/model/filter.types';

export type {
  TaskFilterOption,
  TaskSortOption,
} from '@/entities/task/model/filter.types';

export type FiltersStore = {
  activeMenu: 'filter' | 'sort' | null;

  sortBy: TaskSortOption;
  filterBy: TaskFilterOption;

  openMenu: (menu: 'filter' | 'sort') => void;
  closeAll: () => void;

  setSortBy: (sort: TaskSortOption) => void;
  setFilterBy: (filter: TaskFilterOption) => void;
};

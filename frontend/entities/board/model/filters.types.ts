export type TaskSortOption = 'default' | 'asc' | 'desc';

export type TaskFilterOption = 'all' | 'open' | 'completed';

export type FiltersStore = {
  activeMenu: 'filter' | 'sort' | null;

  sortBy: TaskSortOption;
  filterBy: TaskFilterOption;

  openMenu: (menu: 'filter' | 'sort') => void;
  closeAll: () => void;

  setSortBy: (sort: TaskSortOption) => void;
  setFilterBy: (filter: TaskFilterOption) => void;
};

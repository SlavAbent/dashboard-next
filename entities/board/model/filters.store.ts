'use client';

import { create } from 'zustand';
import type {
  TaskFilterOption,
  TaskSortOption,
} from '@/entities/board/model/types/filters.types';

type FiltersStore = {
  isOpenSort: boolean;
  isOpenFilter: boolean;
  sortBy: TaskSortOption;
  filterBy: TaskFilterOption;

  setOpenSort: (value: boolean) => void;
  setOpenFilter: (value: boolean) => void;
  setSortBy: (sort: TaskSortOption) => void;
  setFilterBy: (filter: TaskFilterOption) => void;
  closeAll: () => void;
};

export const useFiltersStore = create<FiltersStore>((set) => ({
  isOpenSort: false,
  isOpenFilter: false,
  sortBy: 'default',
  filterBy: 'all',

  setOpenSort: (value) => set({ isOpenSort: value }),
  setOpenFilter: (value) => set({ isOpenFilter: value }),
  setSortBy: (sort) => set({ sortBy: sort, isOpenSort: false }),
  setFilterBy: (filter) => set({ filterBy: filter, isOpenFilter: false }),

  closeAll: () =>
    set({
      isOpenSort: false,
      isOpenFilter: false,
    }),
}));

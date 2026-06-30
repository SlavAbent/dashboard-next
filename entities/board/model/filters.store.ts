'use client';

import { create } from 'zustand';

import { FiltersStore } from '@/entities/board/model/types/filters.types';

export const useFiltersStore = create<FiltersStore>((set) => ({
  activeMenu: null,

  sortBy: 'default',
  filterBy: 'all',

  openMenu: (menu) =>
    set({
      activeMenu: menu,
    }),

  closeAll: () =>
    set({
      activeMenu: null,
    }),
  setSortBy: (sortBy) => set({ sortBy, activeMenu: null }),
  setFilterBy: (filterBy) => set({ filterBy, activeMenu: null }),
}));

import { create } from 'zustand';
import { ViewType } from '@/entities/board/types';

const DEFAULT_FILTER_ID: number = 1;

type ListStore = {
  view: ViewType;
  activeFilterId: number | null;
  setView: (view: ViewType) => void;
  setActiveFilterId: (id: number | null) => void;
};

export const useListStore = create<ListStore>((set) => ({
  view: 'List',
  activeFilterId: DEFAULT_FILTER_ID,

  setView: (view: ViewType) =>
    set(() => ({
      view,
    })),

  setActiveFilterId: (id: number | null) =>
    set(() => ({
      activeFilterId: id,
    })),
}));

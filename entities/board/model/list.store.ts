import { create } from 'zustand';
import type { BoardViewMode } from '@/entities/board/model/types';

const DEFAULT_FILTER_ID: number = 1;

type ListStore = {
  view: BoardViewMode;
  activeFilterId: number | null;
  setView: (view: BoardViewMode) => void;
  setActiveFilterId: (id: number | null) => void;
};

export const useListStore = create<ListStore>((set) => ({
  view: 'List',
  activeFilterId: DEFAULT_FILTER_ID,

  setView: (view: BoardViewMode) =>
    set(() => ({
      view,
    })),

  setActiveFilterId: (id: number | null) =>
    set(() => ({
      activeFilterId: id,
    })),
}));

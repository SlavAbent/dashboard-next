import { create } from 'zustand';

import type { BoardViewMode } from '@/entities/board/model/types/list-types';

const DEFAULT_FILTER_ID = 'list';

type ViewStore = {
  view: BoardViewMode;
  activeFilterId: string | null;
  setView: (view: BoardViewMode) => void;
  setActiveFilterId: (id: string | null) => void;
};

export const useViewStore = create<ViewStore>((set) => ({
  view: 'List',
  activeFilterId: DEFAULT_FILTER_ID,

  setView: (view: BoardViewMode) =>
    set(() => ({
      view,
    })),

  setActiveFilterId: (id: string | null) =>
    set(() => ({
      activeFilterId: id,
    })),
}));

import { create } from 'zustand';

type AsideStore = {
  collapsed: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

export const useAsideStore = create<AsideStore>((set) => ({
  collapsed: true,

  toggle: () =>
    set((state) => ({
      collapsed: !state.collapsed,
    })),

  open: () =>
    set({
      collapsed: false,
    }),

  close: () =>
    set({
      collapsed: true,
    }),
}));

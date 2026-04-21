import { create } from 'zustand';

type FiltersType = {
  isOpenSort: boolean;
  isOpenFilter: boolean;

  setOpenSort: (value: boolean) => void;
  setOpenFilter: (value: boolean) => void;

  closeAll: () => void;
};

export const useFiltersStore = create<FiltersType>((set) => ({
  isOpenSort: false,
  isOpenFilter: false,

  setOpenSort: (value) =>
    set({
      isOpenSort: value,
    }),
  setOpenFilter: (value) =>
    set({
      isOpenFilter: value,
    }),

  closeAll: () =>
    set({
      isOpenSort: false,
      isOpenFilter: false,
    }),
}));

'use client';

import { create } from 'zustand';
import { ModalStore } from '@/entities/modal/types/modal.types';

export const useModalStore = create<ModalStore>((set) => ({
  isOpenModal: false,
  selectedColumnId: null,

  openModal: (columnId) =>
    set({
      isOpenModal: true,
      selectedColumnId: columnId,
    }),

  closeModal: () =>
    set({
      isOpenModal: false,
      selectedColumnId: null,
    }),
}));

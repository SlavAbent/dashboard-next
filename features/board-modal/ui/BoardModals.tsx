'use client';

import React from 'react';
import ModalFolder from '@/features/board-modal/ui/modals/ModalFolder';
import ModalTask from '@/features/board-modal/ui/modals/ModalTask';

export const BoardModals = () => {
  return (
    <>
      <ModalFolder />
      <ModalTask />
    </>
  );
};

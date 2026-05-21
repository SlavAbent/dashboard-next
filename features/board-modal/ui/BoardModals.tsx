'use client';

import React from 'react';
import ModalFolder from '@/features/board-modal/ui/ModalFolder';
import ModalTask from '@/features/board-modal/ui/ModalTask';

const BoardModals = () => {
  return (
    <>
      <ModalFolder />
      <ModalTask />
    </>
  );
};

export default BoardModals;

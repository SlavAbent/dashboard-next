'use server';

import React from 'react';
import { getFolders } from '@/shared/_api/folders/foldersApi';
import FoldersCreate from '@/widgets/Aside/ui/FoldersCreate';

const AsideFolders = async () => {
  const foldersData = await getFolders();

  return <FoldersCreate data={foldersData} />;
};

export default AsideFolders;

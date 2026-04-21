'use server';

import React from 'react';
import { getFolders } from '@/widgets/Aside/_api';
import FoldersCreate from '@/widgets/Aside/ui/FoldersCreate';

const AsideFolders = async () => {
  const foldersData = await getFolders();

  return <FoldersCreate data={foldersData} />;
};

export default AsideFolders;

'use server';

import React from 'react';
import { getFolders } from '@/widgets/aside/_api';
import FoldersCreate from '@/widgets/aside/ui/FoldersCreate';

const AsideFolders = async () => {
  const foldersData = await getFolders();

  return <FoldersCreate data={foldersData} />;
};

export default AsideFolders;

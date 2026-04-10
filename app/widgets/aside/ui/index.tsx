'use server';

import React from 'react';
import { getFolders } from '@/app/widgets/aside/_api';
import FoldersCreate from '@/app/widgets/aside/ui/FoldersCreate';

const AsideFolders = async () => {
  const foldersData = await getFolders();

  return <FoldersCreate data={foldersData} />;
};

export default AsideFolders;

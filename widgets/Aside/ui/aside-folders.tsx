import React from 'react';
import { getNavigationMenu } from '@/entities/navigation';
import FoldersCreate from '@/widgets/Folders/folders-create';

const AsideFolders = async () => {
  const foldersData = await getNavigationMenu();

  return <FoldersCreate data={foldersData} />;
};

export default AsideFolders;

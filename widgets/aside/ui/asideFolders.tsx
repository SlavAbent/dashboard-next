import React from 'react';

import { getNavigationMenu } from '@/entities/navigation';
import { FoldersCreate } from '@/widgets/folders/ui/foldersCreate';

export const AsideFolders = async () => {
  const foldersData = await getNavigationMenu();

  return <FoldersCreate data={foldersData} />;
};

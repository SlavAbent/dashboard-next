import React from 'react';

import { getNavigationMenu } from '@/entities/navigation';
import { FoldersCreate } from '@/widgets/aside/ui/folders/foldersCreate';

export const AsideFolders = async () => {
  const foldersData = await getNavigationMenu();

  return <FoldersCreate data={foldersData} />;
};

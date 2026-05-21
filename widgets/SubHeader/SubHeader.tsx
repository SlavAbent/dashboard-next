import React from 'react';
import SubHeaderCreate from '@/widgets/SubHeader/SubHeaderCreate';
import { getSubHeaderData } from '@/shared/_api/subheader/subheaderApi';
import { getNavigationMenu } from '@/entities/navigation';

const SubHeader = async () => {
  const foldersData = await getNavigationMenu();
  const subheaderData = await getSubHeaderData();

  return (
    <SubHeaderCreate foldersData={foldersData} subheaderData={subheaderData} />
  );
};

export default SubHeader;

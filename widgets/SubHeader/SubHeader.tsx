'use server';

import React from 'react';
import SubHeaderCreate from '@/widgets/SubHeader/SubHeaderCreate';
import { getSubHeaderData } from '@/shared/_api/subheaderApi';
import { getFolders } from '@/shared/_api/foldersApi';

const SubHeader = async () => {
  const foldersData = await getFolders();
  const subheaderData = await getSubHeaderData();

  return (
    <SubHeaderCreate foldersData={foldersData} subheaderData={subheaderData} />
  );
};

export default SubHeader;

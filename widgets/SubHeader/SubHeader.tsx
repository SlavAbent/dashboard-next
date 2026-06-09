import React from 'react';
import SubHeaderCreate from '@/widgets/SubHeader/SubHeaderCreate';
import { getNavigationMenu } from '@/entities/navigation';

const SubHeader = async () => {
  const navigation = await getNavigationMenu();

  return <SubHeaderCreate navigation={navigation} />;
};

export default SubHeader;

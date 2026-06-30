import React from 'react';

import { getNavigationMenu } from '@/entities/navigation';
import SubHeaderCreate from '@/widgets/SubHeader/SubHeaderCreate';

const SubHeader = async () => {
  const navigation = await getNavigationMenu();

  return <SubHeaderCreate navigation={navigation} />;
};

export default SubHeader;

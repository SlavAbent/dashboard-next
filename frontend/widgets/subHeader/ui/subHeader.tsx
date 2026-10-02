import React from 'react';

import { getNavigationMenu } from '@/entities/navigation';
import SubHeaderCreate from '@/widgets/subHeader/ui/subHeaderCreate';

const SubHeader = async () => {
  const navigation = await getNavigationMenu();

  return <SubHeaderCreate navigation={navigation} />;
};

export default SubHeader;

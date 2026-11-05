import { cache } from 'react';

import { navigationMenu } from '@/entities/navigation/model/navigation.config';
import type { NavigationMenu } from '@/entities/navigation/model/types';

export const getNavigationMenu = cache(async (): Promise<NavigationMenu> => {
  return navigationMenu;
});

import { cache } from 'react';
import type { NavigationMenu } from '@/entities/navigation/model/types';
import { navigationApi } from '@/shared/_api/instances';

export const getNavigationMenu = cache(async (): Promise<NavigationMenu> => {
  const response = await fetch(navigationApi, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch navigation menu');
  }

  return response.json();
});

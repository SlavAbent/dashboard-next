import type { NavigationMenu } from '@/entities/navigation/model/types';
import { foldersApi } from '@/shared/_api/instances';

export async function getNavigationMenu(): Promise<NavigationMenu> {
  const response = await fetch(foldersApi, {
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch navigation menu');
  }

  return response.json();
}

import { cache } from 'react';
import { subHeaderApi } from '@/shared/_api/instances';

export const getSubHeaderData = cache(async () => {
  const filters = await fetch(subHeaderApi, {
    next: { revalidate: 60 },
  });

  if (!filters.ok) {
    throw new Error('No subheader data found.');
  }

  return filters.json();
});

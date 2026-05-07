import { subHeaderApi } from '@/shared/_api/instances';

export async function getSubHeaderData() {
  const filters = await fetch(subHeaderApi, {
    cache: 'no-cache',
  });

  if (!filters.ok) {
    throw new Error('No subheader data found.');
  }

  return filters.json();
}

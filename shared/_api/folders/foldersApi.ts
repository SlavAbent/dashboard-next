import { foldersApi } from '@/shared/_api/instances';

export async function getFolders() {
  const folders = await fetch(foldersApi, {
    cache: 'no-cache',
  });

  if (!folders.ok) {
    throw new Error('No Aside found.');
  }

  return folders.json();
}

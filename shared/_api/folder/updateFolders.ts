import { tasksFolderApi } from '@/shared/_api/instances';

export async function updateFolders(id: number, columnId: string) {
  const response = await fetch(`${tasksFolderApi}/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      columnId,
      completed: columnId === 'completed',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed update folder');
  }

  return response.json();
}

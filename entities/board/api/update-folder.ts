import { UpdateFolderPayload } from '@/entities/board/model/types/list-types';
import { taskFoldersApi } from '@/shared/_api/instances';
import type { EntityId } from '@/shared/lib/same-id';

export async function updateFolders(
  id: EntityId,
  data: UpdateFolderPayload
) {
  const response = await fetch(`${taskFoldersApi}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update folder');
  }

  return response.json();
}

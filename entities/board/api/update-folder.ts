import type { UpdateFolderPayload } from '@/entities/board/model/types/list-types';
import { tasksFolderApi } from '@/shared/_api/instances';
import type { EntityId } from '@/shared/lib/same-id';

export async function updateFolders(
  id: EntityId,
  data: UpdateFolderPayload
) {
  const body: UpdateFolderPayload & { completed?: boolean } = { ...data };

  if (data.columnId) {
    body.completed = data.columnId === 'completed';
  }

  const response = await fetch(`${tasksFolderApi}/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Failed update folder');
  }

  return response.json();
}

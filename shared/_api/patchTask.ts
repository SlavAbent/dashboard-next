import { tasksApi } from '@/shared/_api/instances';
import { revalidatePath } from 'next/cache';

export async function patchTask(id: number, column: string) {
  await fetch(`${tasksApi}/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      column,
      completed: column === 'completed',
    }),
  });

  revalidatePath('/tasks');
}

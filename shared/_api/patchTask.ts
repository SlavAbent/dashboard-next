import { tasksApi } from '@/shared/_api/instances';
import { revalidatePath } from 'next/cache';

export async function patchTask(id: number, column: string) {
  const response = await fetch(`${tasksApi}/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      column,
      completed: column === 'completed',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed update task');
  }

  revalidatePath('/tasks');

  return response.json();
}

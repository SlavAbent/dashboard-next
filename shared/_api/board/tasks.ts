import { Task } from '@/widgets/Board/types';

export async function getTasks(): Promise<Task[]> {
  const tasks = await fetch('http://localhost:4001/tasks', {
    cache: 'no-store',
  });

  if (!tasks.ok) {
    throw new Error('Failed fetch tasks data');
  }

  return tasks.json();
}

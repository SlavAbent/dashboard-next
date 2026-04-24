import { Column } from '@/widgets/Board/types';

export async function getColumns(): Promise<Column[]> {
  const columns = await fetch('http://localhost:4001/columns', {
    cache: 'no-cache',
  });

  if (!columns.ok) {
    throw new Error('No columns found.');
  }

  return columns.json();
}

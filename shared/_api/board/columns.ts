import { Column } from '@/widgets/Board/types';
import { columnsApi } from '@/shared/_api/instances';

export async function getColumns(): Promise<Column[]> {
  const columns = await fetch(columnsApi, {
    cache: 'no-cache',
  });

  if (!columns.ok) {
    throw new Error('No columns found.');
  }

  return columns.json();
}

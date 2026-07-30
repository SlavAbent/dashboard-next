import { Column } from '@/entities/column/model/column.types';
import { columnsApi } from '@/shared/api/instances';

export async function getColumns(): Promise<Column[]> {
  const response = await fetch(columnsApi, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('No columns found.');
  }

  return response.json();
}

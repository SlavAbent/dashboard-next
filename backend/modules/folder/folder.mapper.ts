import { toDateOnly } from '../../shared/schedule.ts';
import type { FolderDto } from './folder.types.ts';

export const toFolderDto = (
  folder: {
    id: string;
    title: string;
    order: number;
    startDate: Date | null;
    endDate: Date | null;
    priority: string;
  },
  columnId: string
): FolderDto => ({
  id: folder.id,
  columnId,
  title: folder.title,
  order: folder.order,
  startDate: toDateOnly(folder.startDate),
  endDate: toDateOnly(folder.endDate),
  priority: folder.priority.toLowerCase() as FolderDto['priority'],
});

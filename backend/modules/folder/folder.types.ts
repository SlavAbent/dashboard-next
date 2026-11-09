import type { Priority } from '../../shared/schedule.ts';

export type FolderDto = {
  id: string;
  columnId: string;
  title: string;
  order: number;
  startDate: string | null;
  endDate: string | null;
  priority: Priority;
};

export type CreateFolderInput = {
  columnId: string;
  title: string;
  order: number;
  startDate: string | null;
  endDate: string | null;
  priority: Priority;
};

export type UpdateFolderInput = {
  title?: string;
  order?: number;
  startDate?: string | null;
  endDate?: string | null;
  priority?: Priority;
};

export type MoveFolderInput = {
  columnId: string;
  order?: number;
};

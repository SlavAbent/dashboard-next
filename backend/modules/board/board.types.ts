import type { FolderDto } from '../folder/folder.types.ts';
import type { TaskDto } from '../task/task.types.ts';

export type ColumnDto = {
  id: string;
  title: string;
  order: number;
  color: string;
};

export type BoardSnapshot = {
  columns: ColumnDto[];
  folders: FolderDto[];
  tasks: TaskDto[];
};

export type BoardTemplate = {
  columns: ColumnDto[];
  folders: Array<Omit<FolderDto, 'id'> & { templateId: string }>;
  tasks: Array<
    Omit<TaskDto, 'id' | 'taskFolderId' | 'createdAt' | 'updatedAt'> & {
      folderTemplateId: string;
    }
  >;
};

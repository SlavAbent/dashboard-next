'use client';

import { Card } from '@/shared/components/Card';
import { FoldersCreateProps } from '@/widgets/Aside/types/folder-types';
import { FolderItem } from '@/widgets/Folders/folder-item';

export const FoldersCreate = ({ data }: FoldersCreateProps) => {
  return (
    <Card className="flex flex-col items-center gap-1 bg-transparent">
      {data.menu.map((folder) => (
        <FolderItem key={folder.id} {...folder} />
      ))}
    </Card>
  );
};

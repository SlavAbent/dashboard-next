'use client';

import { useAsideStore } from '@/entities/aside/model/aside.store';
import { cn } from '@/shared/lib/cn';
import { Card } from '@/shared/components/Card';
import { FoldersCreateProps } from '@/widgets/Aside/types/folder-types';
import { FolderItem } from '@/widgets/Folders/folder-item';

const FoldersCreate = ({ data }: FoldersCreateProps) => {
  const collapsed = useAsideStore((state) => state.collapsed);

  return (
    <Card className={cn(collapsed && 'px-0', 'flex flex-col gap-1')}>
      {data.menu.map((folder) => {
        return (
          <FolderItem
            key={folder.id}
            id={folder.id}
            name={folder.name}
            icon={folder.icon}
            collapsed={collapsed}
          />
        );
      })}
    </Card>
  );
};

export default FoldersCreate;

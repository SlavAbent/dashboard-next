'use client';

import cn from 'clsx';
import { usePathname } from 'next/navigation';

import { useAsideStore } from '@/entities/aside/model/aside.store';
import { Card } from '@/shared/components/card';
import { normalizePath } from '@/shared/config/normalizePath';
import { FoldersCreateProps } from '@/widgets/aside/types/folder.types';
import { FolderItem } from '@/widgets/aside/ui/folders/folderItem';

export const FoldersCreate = ({ data }: FoldersCreateProps) => {
  const pathname = usePathname();
  const collapsed = useAsideStore((state) => state.collapsed);

  return (
    <Card
      className={cn(
        'items-left flex flex-col gap-1 bg-transparent transition-[width] duration-500',
        collapsed ? 'w-[64px]' : 'w-[180px]'
      )}>
      {data.menu.map((folder) => {
        const { isActive, href } = normalizePath(pathname, folder.slug);

        return (
          <FolderItem
            key={folder.id}
            {...folder}
            isActive={isActive}
            href={href}
          />
        );
      })}
    </Card>
  );
};

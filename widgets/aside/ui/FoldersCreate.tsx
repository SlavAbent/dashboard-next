'use client';

import Card from '@/shared/ui/Card';
import CardItem from '@/shared/ui/CardItem';
import { SvgIcon } from '@/shared/ui/SvgIcon';

import { useAsideStore } from '@/entities/aside/model/aside.store';
import { FolderCreateType } from '@/widgets/aside/types';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const FoldersCreate = ({ data }: FolderCreateType) => {
  const pathname = usePathname();
  const collapsed = useAsideStore((state) => state.collapsed);

  const normalizePath = (name: string) => {
    const href = name.toLowerCase();
    const path = pathname.toLowerCase();
    const isActive = path.startsWith(`/${href}`);

    return {
      isActive,
      href,
    };
  };

  return (
    <Card className={cn(collapsed && 'px-0', 'flex flex-col gap-y-1')}>
      {data.menu.map((folder) => {
        const { isActive, href } = normalizePath(folder.name);
        return (
          <Link key={folder.id} href={href} className="block">
            <CardItem
              className={cn(
                'group flex items-center overflow-hidden transition-all duration-300 ease-in-out',
                collapsed
                  ? 'h-9 w-9 justify-center gap-0 p-0'
                  : 'w-[216px] justify-start gap-3 px-4',
                isActive && 'bg-neutral-50'
              )}>
              <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                <SvgIcon
                  icon={folder.icon}
                  className={cn(
                    'transition-colors duration-300',
                    isActive
                      ? 'text-black'
                      : 'text-[#727272] group-hover:text-black'
                  )}
                />
              </div>

              <span
                className={cn(
                  'overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out',
                  collapsed
                    ? 'ml-0 max-w-0 opacity-0'
                    : 'max-w-[150px] text-sm opacity-100',
                  isActive
                    ? 'text-black'
                    : 'text-neutral-80 group-hover:text-black'
                )}>
                {folder.name}
              </span>
            </CardItem>
          </Link>
        );
      })}
    </Card>
  );
};

export default FoldersCreate;

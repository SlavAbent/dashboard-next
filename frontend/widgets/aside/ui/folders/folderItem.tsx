import { CardItem } from '@dashboard/ui';
import { TypographySmall } from '@dashboard/ui';
import { SvgIcon } from '@dashboard/ui';
import { cn } from '@lib/cn';
import Link from 'next/link';

import { useAsideStore } from '@/entities/aside/model/aside.store';
import { FolderItemProps } from '@/entities/navigation/model/types';

const transition = 'duration-500 ease-in-out';

export const FolderItem = ({ name, href, icon, isActive }: FolderItemProps) => {
  const collapsed = useAsideStore((state) => state.collapsed);

  const activeClass = isActive
    ? 'text-black dark:text-black'
    : 'text-muted-foreground group-hover:text-black dark:group-hover:text-black';

  return (
    <Link href={href} className="flex justify-start">
      <CardItem
        className={cn(
          'group flex items-center overflow-hidden',
          collapsed ? 'w-9' : 'w-full',
          'transition-[width]',
          transition,
          isActive &&
            'bg-neutral-50 text-black hover:bg-neutral-50 hover:text-black dark:bg-neutral-50 dark:text-black dark:hover:bg-neutral-50 dark:hover:text-black'
        )}>
        <SvgIcon icon={icon} className={cn('shrink-0', activeClass)} />

        <TypographySmall
          text={name}
          className={cn(
            'shrink-0 overflow-hidden whitespace-nowrap',
            'transition-[max-width,margin-left,opacity]',
            transition,
            activeClass,
            collapsed
              ? 'pointer-events-none ml-0 max-w-0 opacity-0'
              : 'ml-3 max-w-[180px] opacity-100'
          )}
        />
      </CardItem>
    </Link>
  );
};

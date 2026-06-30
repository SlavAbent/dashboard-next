import Link from 'next/link';

import { useAsideStore } from '@/entities/aside/model/aside.store';
import { FolderItemProps } from '@/entities/navigation/model/types';
import { CardItem } from '@/shared/components/CardItem/card-item';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { SvgIcon } from '@/shared/icons/SvgIcon';
import { cn } from '@/shared/lib/cn';

const transition = 'duration-500 ease-in-out';

export const FolderItem = ({ name, href, icon, isActive }: FolderItemProps) => {
  const collapsed = useAsideStore((state) => state.collapsed);

  const activeClass = isActive
    ? 'text-primary dark:text-black'
    : 'text-muted-foreground group-hover:text-primary dark:group-hover:text-black';

  return (
    <Link href={href} className="flex justify-start">
      <CardItem
        className={cn(
          'group flex items-center overflow-hidden',
          collapsed ? 'w-9' : 'w-full',
          'transition-[width]',
          transition,
          isActive &&
            'text-primary bg-neutral-50 dark:bg-neutral-50 dark:text-black'
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

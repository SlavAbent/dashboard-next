import { Card } from '@dashboard/ui';
import { TypographyH3 } from '@dashboard/ui';
import { cn } from '@lib/cn';
import { ReactNode } from 'react';

type DashboardCardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export const DashboardCard = ({
  title,
  children,
  className,
  contentClassName,
}: DashboardCardProps) => {
  return (
    <Card
      className={cn(
        'flex h-full min-w-0 flex-col gap-3 overflow-hidden rounded-2xl border',
        className
      )}>
      <TypographyH3 text={title ?? ''} className="text-left" />
      <div className={cn('flex flex-1 flex-col', contentClassName)}>
        {children}
      </div>
    </Card>
  );
};

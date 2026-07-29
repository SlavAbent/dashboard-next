import { ReactNode } from 'react';

import { Card } from '@/shared/components/Card';
import { TypographyH3 } from '@/shared/components/Typography/TypographyH3';
import { cn } from '@/shared/lib/cn';

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
        'flex h-full flex-col gap-3 rounded-2xl border',
        className
      )}>
      <TypographyH3 text={title ?? ''} className="text-left" />
      <div className={cn('flex flex-1 flex-col', contentClassName)}>
        {children}
      </div>
    </Card>
  );
};

import { cn } from '@lib/cn';
import { CalendarDaysIcon } from 'lucide-react';

import {
  formatScheduleRange,
  type Priority,
  priorityConfig,
} from '@/shared/model/schedule';

type ScheduleMetaProps = {
  startDate: string | null;
  endDate: string | null;
  priority: Priority;
  compact?: boolean;
  showPriority?: boolean;
};

export const ScheduleMeta = ({
  startDate,
  endDate,
  priority,
  compact = false,
  showPriority = true,
}: ScheduleMetaProps) => {
  const range = formatScheduleRange(startDate, endDate);
  const config = priorityConfig[priority];

  if (!range && (!showPriority || priority === 'none')) return null;

  return (
    <div className="mt-1 flex flex-wrap items-center gap-1.5">
      {showPriority && priority !== 'none' && (
        <span
          className={cn(
            'rounded-sm border px-1.5 py-0.5 text-[10px] leading-none font-medium',
            config.badgeClassName,
            compact && 'px-1'
          )}>
          {config.label}
        </span>
      )}
      {range && (
        <span className="text-muted-foreground flex items-center gap-1 text-[11px] leading-none">
          <CalendarDaysIcon className="size-3" />
          {range}
        </span>
      )}
    </div>
  );
};

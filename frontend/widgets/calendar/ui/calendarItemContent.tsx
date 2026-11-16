import { ScheduleMeta } from '@dashboard/ui';
import { cn } from '@lib/cn';

import type { Priority } from '@/shared/model/schedule';

type CalendarItemContentProps = {
  title: string;
  startDate: string | null;
  endDate: string | null;
  priority: Priority;
  completed?: boolean;
};

export const CalendarItemContent = ({
  title,
  startDate,
  endDate,
  priority,
  completed = false,
}: CalendarItemContentProps) => (
  <>
    <span className={cn('truncate', completed && 'line-through')}>{title}</span>
    <ScheduleMeta
      startDate={startDate}
      endDate={endDate}
      priority={priority}
      compact
      showPriority={false}
    />
  </>
);

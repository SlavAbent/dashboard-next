'use client';

import { cn } from '@/shared/lib/cn';
import { useClock } from '../model/use-clock';

type ClockType = {
  className?: string;
};

export const Clock = ({ className }: ClockType) => {
  const { hours, minutes } = useClock();

  return (
    <div className={cn('flex items-center', className)}>
      <span className="text-sm !leading-5 leading-none font-medium">
        {hours}
      </span>
      <span className="animate-blink">:</span>
      <span className="text-sm !leading-5 leading-none font-medium">
        {minutes}
      </span>
    </div>
  );
};

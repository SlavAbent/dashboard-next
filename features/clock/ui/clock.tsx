'use client';

import { cn } from '@/shared/lib/cn';
import { useClock } from '../model/use-clock';
import { useClockStore } from '@/features/clock/model/clock.store';
import { Skeleton } from '@/shared/components/Skeleton/skeleton';

type ClockType = {
  className?: string;
};

export const Clock = ({ className }: ClockType) => {
  const { hours, minutes } = useClock();
  const isLoading = useClockStore((state) => state.loading);

  return (
    <div className={cn('flex h-6 w-9 items-center', className)}>
      {!isLoading ? (
        <>
          <span className="text-sm !leading-5 font-medium">{hours}</span>
          <span className="animate-blink">:</span>
          <span className="text-sm !leading-5 font-medium">{minutes}</span>
        </>
      ) : (
        <Skeleton mode="shimmer" className="h-6 w-9" />
      )}
    </div>
  );
};

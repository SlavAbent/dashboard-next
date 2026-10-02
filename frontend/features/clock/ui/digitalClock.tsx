'use client';

import { useClockStore } from '@/features/clock/model/clock.store';
import { Skeleton } from '@/shared/components/skeleton/skeleton';
import { cn } from '@/shared/lib/cn';

import { useClock } from '../model/useClock';

type DigitalClockProps = {
  className?: string;
};

export const DigitalClock = ({ className }: DigitalClockProps) => {
  const { hours, minutes } = useClock();
  const isLoading = useClockStore((state) => state.loading);

  if (isLoading) {
    return <Skeleton mode="shimmer" className={cn('h-16 w-48', className)} />;
  }

  return (
    <div
      className={cn(
        'text-foreground flex items-center gap-1 font-mono text-6xl leading-none font-bold tracking-tight tabular-nums',
        className
      )}>
      <span>{hours}</span>
      <span className="animate-blink">:</span>
      <span>{minutes}</span>
    </div>
  );
};

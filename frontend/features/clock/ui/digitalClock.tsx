'use client';

import { useEffect, useRef, useState } from 'react';

import { useClockStore } from '@/features/clock/model/clock.store';
import { Skeleton } from '@/shared/components/skeleton/skeleton';

import { cn } from '../../../../lib/cn';
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
        'text-foreground flex items-center gap-2 font-mono text-[70px] leading-none font-bold tracking-tight tabular-nums',
        className
      )}>
      <FlipGroup value={hours} />
      <span
        className="mx-[0.02em] flex h-[1.08em] flex-col justify-center gap-[0.18em]"
        aria-hidden="true">
        <span className="motion-safe:animate-flip-clock-dot size-[0.1em] rounded-full bg-white opacity-20 motion-reduce:animate-none motion-reduce:opacity-100" />
        <span
          className="motion-safe:animate-flip-clock-dot size-[0.1em] rounded-full bg-white opacity-20 motion-reduce:animate-none motion-reduce:opacity-100"
          style={{ animationDelay: '500ms' }}
        />
      </span>
      <FlipGroup value={minutes} />
    </div>
  );
};

const FlipGroup = ({ value }: { value: string }) => (
  <div className="flex gap-1">
    {value.split('').map((digit, index) => (
      <FlipDigit key={index} value={digit} />
    ))}
  </div>
);

const FlipDigit = ({ value }: { value: string }) => {
  const [displayed, setDisplayed] = useState(value);
  const [previous, setPrevious] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const displayedRef = useRef(value);

  useEffect(() => {
    if (value === displayedRef.current) return;

    setPrevious(displayedRef.current);
    setFlipping(true);
    const topTimer = window.setTimeout(() => {
      displayedRef.current = value;
      setDisplayed(value);
    }, 500);
    const finishTimer = window.setTimeout(() => setFlipping(false), 1000);

    return () => {
      window.clearTimeout(topTimer);
      window.clearTimeout(finishTimer);
    };
  }, [value]);

  return (
    <span className="relative inline-block h-[1.08em] w-[0.72em] overflow-hidden rounded-[0.12em] bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)] [perspective:12em] after:absolute after:inset-x-0 after:top-1/2 after:z-[5] after:h-px after:bg-[rgb(255_255_255_/_15%)] after:shadow-[0_1px_0_color-mix(in_srgb,var(--foreground)_12%,transparent)] after:content-['']">
      <span className="absolute inset-x-0 top-0 box-border flex h-1/2 [align-items:flex-start] justify-center overflow-hidden bg-[color-mix(in_srgb,var(--foreground)_8%,var(--background))] [line-height:1.08] [backface-visibility:hidden]">
        {displayed}
      </span>
      {flipping && (
        <span className="motion-safe:animate-flip-top-fall absolute inset-x-0 top-0 z-[5] box-border flex h-1/2 [transform-origin:50%_100%] [align-items:flex-start] justify-center overflow-hidden bg-[color-mix(in_srgb,var(--foreground)_14%,var(--background))] [line-height:1.08] [backface-visibility:hidden] motion-reduce:hidden">
          {previous}
        </span>
      )}
      <span
        className={cn(
          'absolute inset-x-0 bottom-0 box-border flex h-1/2 items-end justify-center overflow-hidden bg-[color-mix(in_srgb,var(--foreground)_8%,var(--background))] [line-height:1.08] [backface-visibility:hidden]',
          flipping &&
            'motion-safe:animate-flip-fold z-[3] [transform-origin:50%_0] motion-reduce:animate-none'
        )}>
        {flipping ? previous : displayed}
      </span>
      {flipping && (
        <span
          className="motion-safe:animate-flip-unfold absolute inset-x-0 bottom-0 z-[4] box-border flex h-1/2 [transform-origin:50%_0] [transform:rotateX(-90deg)] items-end justify-center overflow-hidden bg-[color-mix(in_srgb,var(--foreground)_14%,var(--background))] [line-height:1.08] [backface-visibility:hidden] motion-reduce:animate-none"
          style={{ animationDelay: '500ms' }}>
          {value}
        </span>
      )}
    </span>
  );
};

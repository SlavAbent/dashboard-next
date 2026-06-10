import React from 'react';
import cn from 'clsx';

type SkeletonType = 'pulse' | 'shimmer';

export const Skeleton = ({
  mode = 'pulse',
  className,
}: {
  mode?: SkeletonType;
  className?: string;
}) => {
  const base = 'bg-muted/60 w-full rounded-md';

  return mode === 'pulse' ? (
    <div className={cn(base, 'animate-pulse', className)} />
  ) : (
    <div
      className={cn(
        base,
        'before:animate-shimmer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:skew-x-12 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
        className
      )}
    />
  );
};

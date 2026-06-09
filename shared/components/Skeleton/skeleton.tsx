import React from 'react';

type SkeletonType = 'pulse' | 'shimmer';

export const Skeleton = ({ mode = 'pulse' }: { mode: SkeletonType }) => {
  return (
    <>
      {mode === 'pulse' && (
        <div className="bg-muted/60 h-full min-h-[320px] w-full animate-pulse rounded-xl" />
      )}
      {mode === 'shimmer' && (
        <div className="bg-muted/60 before:animate-shimmer relative h-full min-h-[320px] w-full overflow-hidden rounded-xl before:absolute before:inset-0 before:-translate-x-full before:skew-x-12 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:blur-md" />
      )}
    </>
  );
};

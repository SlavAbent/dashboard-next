'use client';

import { useRouter } from 'next/navigation';

import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { ArrowIcon } from '@/shared/icons/ui/ArrowIcon';
import { NotFoundIcon } from '@/shared/icons/ui/NotFoundIcon';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex h-dvh items-center justify-center">
      <div
        className="absolute top-14 left-14 flex cursor-pointer items-center gap-3"
        onClick={() => router.back()}>
        <ArrowIcon className="h-6 w-6 rotate-90" />
        <TypographySmall text="Backward" />
      </div>
      <NotFoundIcon
        size={{
          width: 500,
          height: 400,
        }}
      />
    </div>
  );
}

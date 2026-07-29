import React, { Suspense } from 'react';

import { AsideHeader } from '@/entities/aside/ui/asideHeader';
import { Skeleton } from '@/shared/components/skeleton/skeleton';
import { AsideFolders } from '@/widgets/aside/ui/asideFolders';
import { AsideFooter } from '@/widgets/aside/ui/asideFooter';

export const AppAside = () => {
  return (
    <div className="border-right bg-sidebar flex max-h-screen flex-col">
      <AsideHeader />
      <Suspense fallback={<Skeleton />}>
        <AsideFolders />
      </Suspense>
      <AsideFooter />
    </div>
  );
};

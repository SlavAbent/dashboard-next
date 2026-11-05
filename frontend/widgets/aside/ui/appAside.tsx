import { Skeleton } from '@dashboard/ui';
import React, { Suspense } from 'react';

import { AsideHeader } from '@/entities/aside/ui/asideHeader';
import { AsideFolders } from '@/widgets/aside/ui/asideFolders';
import { AsideFooter } from '@/widgets/aside/ui/asideFooter';
import { AsideShell } from '@/widgets/aside/ui/asideShell';

export const AppAside = () => {
  return (
    <AsideShell>
      <AsideHeader />
      <Suspense fallback={<Skeleton />}>
        <AsideFolders />
      </Suspense>
      <AsideFooter />
    </AsideShell>
  );
};

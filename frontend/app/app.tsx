import { Skeleton } from '@dashboard/ui';
import React, { ReactNode, Suspense } from 'react';

import { AppAside } from '@/widgets/aside/ui/appAside';
import Header from '@/widgets/header/ui/header';
import SubHeader from '@/widgets/subHeader/ui/subHeader';

export const App = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-background flex h-dvh min-h-0 min-w-0 overflow-hidden">
      <AppAside />
      <div className="bg-background flex min-w-0 flex-1 flex-col">
        <Header />
        <Suspense fallback={<Skeleton mode="shimmer" />}>
          <SubHeader />
        </Suspense>
        <main className="bg-background min-h-0 min-w-0 flex-1 overflow-auto overscroll-contain">
          {children}
        </main>
      </div>
    </div>
  );
};

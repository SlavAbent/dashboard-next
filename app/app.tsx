import React, { ReactNode, Suspense } from 'react';

import { Skeleton } from '@/shared/components/skeleton/skeleton';
import { AppAside } from '@/widgets/aside/ui/appAside';
import Header from '@/widgets/header/ui/header';
import SubHeader from '@/widgets/subHeader/ui/subHeader';

export const App = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-background flex h-screen md:min-h-dvh">
      <AppAside />
      <div className="bg-background flex w-full flex-col">
        <Header />
        <Suspense fallback={<Skeleton mode="shimmer" />}>
          <SubHeader />
        </Suspense>
        <main className="bg-background flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

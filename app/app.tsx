import React, { ReactNode, Suspense } from 'react';
import { AppAside } from '@/widgets/Aside/ui/app-aside';
import Header from '@/widgets/Header/Header';
import SubHeader from '@/widgets/SubHeader/SubHeader';
import { SubHeaderFallback } from '@/widgets/SubHeader/sub-header-fallback';

export const App = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-background flex h-screen md:min-h-dvh">
      <AppAside />
      <div className="bg-background flex w-full flex-col">
        <Header />
        <Suspense fallback={<SubHeaderFallback />}>
          <SubHeader />
        </Suspense>
        <main className="bg-background flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

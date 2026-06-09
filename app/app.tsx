import React, { ReactNode } from 'react';
import { AppAside } from '@/widgets/Aside/ui/app-aside';
import Header from '@/widgets/Header/Header';
import SubHeader from '@/widgets/SubHeader/SubHeader';

export const App = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-background flex h-screen md:min-h-dvh">
      <AppAside />
      <div className="bg-background flex w-full flex-col">
        <Header />
        <SubHeader />
        <main className="bg-background flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

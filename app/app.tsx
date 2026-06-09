import React, { ReactNode } from 'react';
import { AppAside } from '@/widgets/Aside/ui/app-aside';
import Header from '@/widgets/Header/Header';
import SubHeader from '@/widgets/SubHeader/SubHeader';

export const App = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen md:min-h-dvh">
      <AppAside />
      <div className="flex w-full flex-col">
        <Header />
        <SubHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

import React from 'react';
import AsideFooter from '@/widgets/Aside/ui/aside-footer';
import { AsideHeader } from '@/entities/aside/ui/aside-header';
import { AsideFolders } from '@/widgets/Aside/ui/aside-folders';

export const AppAside = () => {
  return (
    <div className="border-right bg-sidebar flex max-h-screen flex-col">
      <AsideHeader />
      <AsideFolders />
      <AsideFooter />
    </div>
  );
};

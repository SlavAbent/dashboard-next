import React from 'react';
import AsideFolders from '@/widgets/Aside/ui/AsideFolders';
import AsideHeader from '@/entities/aside/ui/AsideHeader';

const AppAside = () => {
  return (
    <div className={`border-right bg-neutral-20 flex max-h-screen flex-col`}>
      <AsideHeader />
      <AsideFolders />
    </div>
  );
};

export default AppAside;

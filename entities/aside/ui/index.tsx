import React from 'react';
import AsideFolders from '@/widgets/aside/ui';
import AsideHeader from '@/entities/aside/ui/header';

const Aside = () => {
  return (
    <div className={`border-right bg-neutral-20 flex max-h-screen flex-col`}>
      <AsideHeader />
      <AsideFolders />
    </div>
  );
};

export default Aside;

import React from 'react';
import { Logo } from '@/app/shared/ui/icons/Logo';
import Link from 'next/link';

const AsideHeader = () => {
  return (
    <div className="border-bottom min-w-[250px] px-7 py-[22px]">
      <Link href="/" className="flex items-center">
        <Logo className="h-[24px] w-[28px]" />
        <p className="ml-3 text-xl">Venture</p>
      </Link>
    </div>
  );
};

export default AsideHeader;

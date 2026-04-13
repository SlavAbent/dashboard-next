'use client';

import { useAsideStore } from '@/app/shared/store/aside.store';
import Link from 'next/link';
import { Toggle } from '@/app/shared/icons/ui/Toggle';
import { Logo } from '@/app/shared/icons/ui/Logo';

const AsideHeader = () => {
  const collapsed = useAsideStore((state) => state.collapsed);
  const toggle = useAsideStore((state) => state.toggle);

  const animationClass = 'transition-all duration-300 ease-in-out';

  return (
    <div
      className={`border-bottom relative flex flex-col ${animationClass} ${
        collapsed
          ? 'w-[64px] justify-center px-0 py-[22px]'
          : 'w-[250px] justify-start px-7 py-[22px]'
      }`}>
      <Link
        href="/"
        className={`flex items-center ${animationClass} ${
          collapsed ? 'justify-center' : 'justify-start'
        }`}>
        <Logo className="h-[24px] w-[28px] shrink-0" />

        <span
          className={`overflow-hidden whitespace-nowrap ${animationClass} ${
            collapsed
              ? 'ml-0 max-w-0 opacity-0'
              : 'ml-3 max-w-[140px] opacity-100'
          }`}>
          Venture
        </span>
      </Link>

      <div
        onClick={toggle}
        className="absolute top-1/2 -right-[14px] z-10 -translate-y-1/2 cursor-pointer">
        <Toggle
          size={{
            width: 28,
            height: 28,
          }}
        />
      </div>
    </div>
  );
};

export default AsideHeader;

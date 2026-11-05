'use client';

import type { ReactNode } from 'react';

import { useAsideStore } from '@/entities/aside/model/aside.store';

type AsideShellProps = {
  children: ReactNode;
};

export const AsideShell = ({ children }: AsideShellProps) => {
  const collapsed = useAsideStore((state) => state.collapsed);
  const close = useAsideStore((state) => state.close);

  return (
    <>
      {!collapsed && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={close}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}
      <aside
        aria-label="Main navigation"
        className={`border-right bg-sidebar fixed inset-y-0 left-0 z-50 flex max-h-dvh flex-col transition-transform duration-300 md:static md:z-auto md:translate-x-0 ${
          collapsed ? '-translate-x-full' : 'translate-x-0'
        }`}>
        {children}
      </aside>
    </>
  );
};

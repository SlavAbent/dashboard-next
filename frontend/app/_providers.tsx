'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

import { NotificationHost } from '@/app/notificationHost';
import { ThemeProvider } from '@/app/ThemeProvider';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <NotificationHost />
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;

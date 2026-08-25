import '../shared/styles/global.css';

import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ReactNode } from 'react';

import Providers from '@/app/_providers';
import { cn } from '@/shared/lib/cn';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dashboard-next',
  description: 'Dashboard-next pet',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="device"
      className={cn(geistSans.variable)}
      suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=JSON.parse(localStorage.getItem('theme-storage')||'{}');var theme=(t.state&&t.state.theme)||'device';if(theme!=='light'&&theme!=='dark'&&theme!=='device'){theme='device'}document.documentElement.dataset.theme=theme;document.documentElement.classList.remove('dark')}catch(e){document.documentElement.dataset.theme='device'}})();`,
          }}
        />
        <title>Dashboard - next</title>
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

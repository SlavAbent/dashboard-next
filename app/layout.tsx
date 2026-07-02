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
    <html lang="en" className={cn(geistSans.variable)} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=JSON.parse(localStorage.getItem('theme-storage')||'{}');if(t.state&&t.state.theme==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

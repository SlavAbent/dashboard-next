import { ReactNode } from 'react';

import { App } from '../app';

export default function AppLayout({ children }: { children: ReactNode }) {
  return <App>{children}</App>;
}

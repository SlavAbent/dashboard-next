'use client';

import { useEffect } from 'react';

export const PwaRegistration = () => {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== 'production' ||
      !('serviceWorker' in navigator)
    ) {
      return;
    }

    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch((error: unknown) => {
        window.dispatchEvent(
          new CustomEvent('pwa:registration-error', { detail: error })
        );
      });
    };

    if (document.readyState === 'complete') {
      register();
      return;
    }

    window.addEventListener('load', register, { once: true });
    return () => window.removeEventListener('load', register);
  }, []);

  return null;
};

'use client';

import { useEffect } from 'react';

import { highLightElement } from '@/shared/lib/highlightElement';

const MAX_ATTEMPTS = 30;
const RETRY_DELAY_MS = 150;

export const useScrollHighlight = (
  targetId: string | null | undefined,
  attribute: string
) => {
  useEffect(() => {
    if (!targetId) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    let attempts = 0;

    const selector = `[${attribute}="${CSS.escape(targetId)}"]`;

    const tryHighlight = () => {
      if (cancelled) return;

      if (document.querySelector(selector)) {
        highLightElement(selector);
        return;
      }

      if (attempts++ < MAX_ATTEMPTS) {
        timeoutId = setTimeout(tryHighlight, RETRY_DELAY_MS);
      }
    };

    tryHighlight();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [targetId, attribute]);
};

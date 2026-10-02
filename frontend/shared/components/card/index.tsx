import React from 'react';

import { CardType } from '@/shared/components/card/card.types';

export const Card = ({ children, className }: CardType) => {
  return (
    <aside className={`border-bottom px-3 py-5 ${className ?? ''}`}>
      {children}
    </aside>
  );
};

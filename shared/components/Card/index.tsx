import React from 'react';
import { CardType } from '@/shared/components/Card/card.types';

export const Card = ({ children, className }: CardType) => {
  return (
    <div className={`border-bottom px-3 py-5 ${className ?? ''}`}>
      {children}
    </div>
  );
};

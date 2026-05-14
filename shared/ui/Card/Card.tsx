import React from 'react';
import { CardType } from '@/shared/ui/Card/card.types';

const Card = ({ children, className }: CardType) => {
  return (
    <div className={`border-bottom px-3 py-5 ${className ?? ''}`}>
      {children}
    </div>
  );
};

export default Card;

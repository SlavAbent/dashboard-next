import React from 'react';
import { CardType } from '@/app/shared/components/Card/types';

const Card = ({ children }: CardType) => {
  return <div className="border-bottom px-4 py-5">{children}</div>;
};

export default Card;

import { ReactNode } from 'react';

export type CardItemType = {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
};

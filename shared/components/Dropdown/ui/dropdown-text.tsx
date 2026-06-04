import React from 'react';
import cn from 'clsx';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { DropdownTextProps } from '@/shared/components/Dropdown/types/dropdown.types';

const DropdownText = ({ classNameText, text = 'User' }: DropdownTextProps) => {
  return (
    <TypographySmall
      text={text}
      className={cn('text-sm font-medium', classNameText)}
    />
  );
};

export default DropdownText;

import cn from 'clsx';
import React from 'react';

import { DropdownTextProps } from '@/shared/components/Dropdown/types/dropdown.types';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';

const DropdownText = ({ classNameText, text = 'User' }: DropdownTextProps) => {
  return (
    <TypographySmall
      text={text}
      className={cn('text-sm font-medium', classNameText)}
    />
  );
};

export default DropdownText;

import { Command } from 'lucide-react';
import React from 'react';

import IconWrapper from '@/shared/icons/iconWrapper';

export const SearchShortcut = () => {
  return (
    <div className="flex items-center gap-2">
      <IconWrapper className="bg-secondary">
        <Command className="h-4 w-4" />
      </IconWrapper>
      <IconWrapper className="bg-secondary">F</IconWrapper>
    </div>
  );
};

import { IconWrapper } from '@dashboard/ui';
import { X } from 'lucide-react';
import React from 'react';

import { SearchShortcut } from '@/features/search/ui/searchShortcut';

type SearchRightIconProps = {
  value: string;
  onClear: () => void;
};

export const SearchRightIcon = ({ value, onClear }: SearchRightIconProps) => {
  if (value) {
    return (
      <IconWrapper className="bg-secondary">
        <X className="h-4 w-4" onClick={onClear} />
      </IconWrapper>
    );
  }

  return (
    <span className="hidden lg:block">
      <SearchShortcut />
    </span>
  );
};

import React from 'react';
import IconWrapper from '@/shared/icons/iconWrapper';
import { X } from 'lucide-react';
import { SearchShortcut } from '@/features/Search/ui/SearchChortcut';

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

  return <SearchShortcut />;
};

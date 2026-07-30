import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import { SearchDropdown } from '@/features/search/ui/searchDropdown';
import { SearchRightIcon } from '@/features/search/ui/searchRightIcon';
import { Input } from '@/shared/components/input/input';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { iconSize } from '@/shared/icons/iconSize';
import { SearchIcon } from '@/shared/icons/ui/searchIcon';

export const Search = () => {
  const wrapperRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchInput, setSearchInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(wrapperRef, () => setIsOpen(false));
  const debouncedSearch = useDebounce(searchInput, 200);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes('mac');
      const isSearchShortCut =
        (isMac && e.metaKey && e.key.toLowerCase() === 'f') ||
        (!isMac && e.ctrlKey && e.key.toLowerCase() === 'f');

      if (isSearchShortCut) {
        e.preventDefault();

        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClear = () => {
    setSearchInput('');
    inputRef.current?.focus();
    setIsOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setIsOpen(true);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const showDropdown = Boolean(searchInput && isOpen);

  return (
    <div ref={wrapperRef} className="w-fit">
      <Input
        ref={inputRef}
        value={searchInput}
        onFocus={handleFocus}
        onChange={(e) => handleChange(e)}
        placeholder="Search"
        className="min-w-[360px]"
        leftIcon={<SearchIcon size={iconSize(20)} />}
        rightIcon={
          <SearchRightIcon value={searchInput} onClear={handleClear} />
        }
      />

      {showDropdown ? <SearchDropdown search={debouncedSearch} /> : null}
    </div>
  );
};

import { iconSize, Input, SearchIcon } from '@dashboard/ui';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { SearchDropdown } from '@/features/search/ui/searchDropdown';
import { SearchRightIcon } from '@/features/search/ui/searchRightIcon';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { useDebounce } from '@/shared/hooks/useDebounce';

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
    <div ref={wrapperRef} className="w-44 md:w-fit lg:w-fit">
      <Input
        ref={inputRef}
        value={searchInput}
        onFocus={handleFocus}
        onChange={(e) => handleChange(e)}
        placeholder="Search"
        className="min-w-0 max-lg:h-9 max-lg:pr-3 max-lg:placeholder:text-transparent"
        leftIcon={<SearchIcon size={iconSize(20)} />}
        rightIcon={
          <SearchRightIcon value={searchInput} onClear={handleClear} />
        }
      />

      {showDropdown ? <SearchDropdown search={debouncedSearch} /> : null}
    </div>
  );
};

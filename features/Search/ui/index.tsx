import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Input } from '@/shared/components/Input/input';
import { SearchIcon } from '@/shared/icons/ui/SearchIcon';
import { iconSize } from '@/shared/icons/iconSize';
import IconWrapper from '@/shared/icons/iconWrapper';
import { useBoardStore } from '@/entities/board';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { ResultContainer } from '@/features/Search/ui/ResultContainer';
import { Command, X } from 'lucide-react';
import cn from 'clsx';

export const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const tasks = useBoardStore((state) => state.tasks);
  const folders = useBoardStore((state) => state.taskFolders);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 200);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const resultDataSearch = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    if (!query) {
      return {
        tasks: [],
        folders: [],
      };
    }

    return {
      folders: folders.filter((folder) =>
        folder.title.toLowerCase().includes(query)
      ),
      tasks: tasks.filter((task) => task.text.toLowerCase().includes(query)),
    };
  }, [searchInput, tasks, folders]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    };
  }, []);

  return (
    <>
      <Input
        ref={inputRef}
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setIsOpen(true);
        }}
        placeholder="SearchIcon"
        className="min-w-[360px]"
        leftIcon={<SearchIcon size={iconSize(20)} />}
        rightIcon={
          searchInput ? (
            <IconWrapper className="bg-secondary">
              <X
                className="h-4 w-4"
                onClick={() => {
                  setSearchInput('');
                  inputRef.current?.focus();
                }}
              />
            </IconWrapper>
          ) : (
            <div className="flex items-center gap-2">
              <IconWrapper className="bg-secondary">
                <Command className="h-4 w-4" />
              </IconWrapper>
              <IconWrapper className="bg-secondary">F</IconWrapper>
            </div>
          )
        }
      />

      {!!searchInput && (
        <div
          className={cn(
            'bg-background absolute top-full z-50 mt-2 flex w-full max-w-[420px] flex-col gap-4 rounded-md border p-4 shadow-lg transition-all duration-200',
            isOpen && searchInput
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0'
          )}>
          <ResultContainer
            title="Folders"
            highlight="folder"
            resultData={resultDataSearch.folders}
            getId={(folder) => folder.id}
            getLabel={(folder) => folder.title}
          />
          <ResultContainer
            title="Tasks"
            highlight="task"
            resultData={resultDataSearch.tasks}
            getId={(task) => task.id}
            getLabel={(task) => task.text}
          />

          {resultDataSearch.folders.length === 0 &&
            resultDataSearch.tasks.length === 0 && (
              <TypographySmall text="Nothing found" />
            )}
        </div>
      )}
    </>
  );
};

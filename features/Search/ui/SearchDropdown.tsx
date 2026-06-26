import React, { useMemo } from 'react';
import cn from 'clsx';
import { SearchFolder } from '@/features/Search/ui/SearchFolder';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { useBoardStore } from '@/entities/board';

type SearchDropdownProps = {
  search: string;
};

export const SearchDropdown = ({ search }: SearchDropdownProps) => {
  const tasks = useBoardStore((state) => state.tasks);
  const folders = useBoardStore((state) => state.taskFolders);

  const resultDataSearch = useMemo(() => {
    const query = search.trim().toLowerCase();

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
  }, [search, tasks, folders]);

  return (
    <div
      className={cn(
        'bg-background absolute top-full z-50 mt-2 flex w-full max-w-[420px] flex-col gap-4 rounded-md border p-4 shadow-lg transition-all duration-200'
      )}>
      <SearchFolder
        title="Folders"
        highlight="folder"
        resultData={resultDataSearch.folders}
        getId={(folder) => folder.id}
        getLabel={(folder) => folder.title}
      />
      <SearchFolder
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
  );
};

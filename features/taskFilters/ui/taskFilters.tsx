'use client';

import React from 'react';

import { useFiltersStore } from '@/entities/board/model/filters.store';
import { useBoardStore } from '@/entities/board/model/useData.store';
import { useBoardModalStore } from '@/features/boardModal';
import {
  filterLabels,
  filterOptions,
  sortLabels,
  sortOptions,
} from '@/features/taskFilters/config/filterOptions';
import { MenuDropdown } from '@/shared/components/menuDropdown';
import { Index } from '@/shared/components/separator';
import { TypographySmall } from '@/shared/components/typography/typographySmall';
import { iconSize } from '@/shared/icons/iconSize';
import { FiltersIcon } from '@/shared/icons/ui/filtersIcon';
import { PlusIcon } from '@/shared/icons/ui/plusIcon';
import { SortByIcon } from '@/shared/icons/ui/sortByIcon';

const TaskFilters = () => {
  const {
    activeMenu,
    openMenu,
    closeAll,
    sortBy,
    filterBy,
    setSortBy,
    setFilterBy,
  } = useFiltersStore();

  const taskFolders = useBoardStore((state) => state.taskFolders);
  const openCreateTask = useBoardModalStore((state) => state.openCreateTask);

  const handleAddTask = () => {
    const firstFolder = taskFolders[0];

    if (firstFolder) {
      openCreateTask(firstFolder.id);
    }
  };

  const handleSelect = <T extends string>(
    id: number,
    options: { id: number; value: T }[],
    setter: (value: T) => void
  ) => {
    const selected = options.find((item) => item.id === id);

    if (selected) setter(selected.value);
  };

  const handleOpenChange = (menu: 'sort' | 'filter') => (open: boolean) => {
    if (open) {
      openMenu(menu);
    } else {
      closeAll();
    }
  };

  return (
    <div className="flex items-center gap-4">
      <MenuDropdown
        label={sortLabels[sortBy]}
        icon={<SortByIcon size={iconSize(16)} />}
        open={activeMenu === 'sort'}
        onOpenChange={handleOpenChange('sort')}
        options={sortOptions}
        onSelect={(option) => handleSelect(option.id, sortOptions, setSortBy)}
      />

      <MenuDropdown
        label={filterLabels[filterBy]}
        icon={<FiltersIcon size={iconSize(16)} />}
        open={activeMenu === 'filter'}
        onOpenChange={handleOpenChange('filter')}
        options={filterOptions}
        onSelect={(option) =>
          handleSelect(option.id, filterOptions, setFilterBy)
        }
      />

      <Index
        orientation="vertical"
        className="bg-border h-[50px] w-[1px] gap-4"
      />

      <button
        type="button"
        onClick={handleAddTask}
        disabled={taskFolders.length === 0}
        className="button border-border flex h-10 cursor-pointer items-center gap-2 rounded-sm border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50">
        <PlusIcon size={iconSize(16)} />
        <TypographySmall text="Add task" className="!leading-[150%]" />
      </button>
    </div>
  );
};

export default TaskFilters;

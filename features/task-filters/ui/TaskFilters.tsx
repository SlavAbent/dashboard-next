'use client';

import React from 'react';
import { MenuDropdown } from '@/shared/components/MenuDropdown';
import { SortByIcon } from '@/shared/icons/ui/SortByIcon';
import { FiltersIcon } from '@/shared/icons/ui/FiltersIcon';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { useFiltersStore } from '@/entities/board/model/filters.store';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import { useBoardModalStore } from '@/features/board-modal';
import { iconSize } from '@/shared/icons/iconSize';
import {
  filterOptions,
  filterLabels,
  sortOptions,
  sortLabels,
} from '@/features/task-filters/config/filter-options';
import { Separator } from '@/shared/components/separator';

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

  const tasksFolders = useBoardStore((state) => state.tasksFolder);
  const openCreateTask = useBoardModalStore((state) => state.openCreateTask);

  const handleAddTask = () => {
    const firstFolder = tasksFolders[0];

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

      <Separator
        orientation="vertical"
        className="h-[50px] w-[1px] gap-4 bg-[#E4E4E4]"
      />

      <button
        type="button"
        onClick={handleAddTask}
        disabled={tasksFolders.length === 0}
        className="button flex h-10 cursor-pointer items-center gap-2 rounded-sm border border-black px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50">
        <PlusIcon size={iconSize(16)} />
        <TypographySmall text="Add task" className="!leading-[150%]" />
      </button>
    </div>
  );
};

export default TaskFilters;

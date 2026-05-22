'use client';

import React from 'react';
import { Menu } from '@/shared/ui/Menu/Menu';
import { SortByIcon } from '@/shared/icons/ui/SortByIcon';
import { FiltersIcon } from '@/shared/icons/ui/FiltersIcon';
import { Separator } from '@base-ui/react';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { TypographySmall } from '@/shared/ui/Typography/TypographySmall';
import { useFiltersStore } from '@/entities/board/model/filters.store';
import { useBoardStore } from '@/entities/board/model/useDataStore';
import { useBoardModalStore } from '@/features/board-modal';
import { iconSize } from '@/shared/icons/iconSize';
import {
  filterOptions,
  filterLabels,
  sortOptions,
  sortLabels,
} from '@/features/task-filters/config/filter-options';

const TaskFilters = () => {
  const {
    isOpenSort,
    isOpenFilter,
    sortBy,
    filterBy,
    setOpenSort,
    setOpenFilter,
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

  return (
    <div className="flex items-center gap-4">
      <Menu
        label={sortLabels[sortBy]}
        icon={<SortByIcon size={iconSize(16)} />}
        open={isOpenSort}
        onOpenChange={setOpenSort}
        options={sortOptions}
        onSelect={(option) => {
          const selected = sortOptions.find((item) => item.id === option.id);

          if (selected) setSortBy(selected.value);
        }}
      />

      <Menu
        label={filterLabels[filterBy]}
        icon={<FiltersIcon size={iconSize(16)} />}
        open={isOpenFilter}
        onOpenChange={setOpenFilter}
        options={filterOptions}
        onSelect={(option) => {
          const selected = filterOptions.find((item) => item.id === option.id);

          if (selected) setFilterBy(selected.value);
        }}
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

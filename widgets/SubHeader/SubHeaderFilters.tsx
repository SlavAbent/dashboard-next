import React from 'react';
import { Menu } from '@/shared/ui/Menu';
import { SortByIcon } from '@/shared/icons/ui/SortByIcon';
import { filterOptions, sortOptions } from '@/widgets/SubHeader/constants';
import { FiltersIcon } from '@/shared/icons/ui/FiltersIcon';
import { Separator } from '@base-ui/react';
import { Button } from '@/shared/ui/button';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { TypographySmall } from '@/shared/ui/Typography/TypographySmall';
import { useFiltersStore } from '@/widgets/SubHeader/model/filters.store';
import { iconSize } from '@/shared/icons/iconSize';

const SubHeaderFilters = () => {
  const { isOpenSort, isOpenFilter, setOpenSort, setOpenFilter } =
    useFiltersStore();

  const handleAddTask = () => {
    console.log('Adding board');
  };

  const handleSortSelect = () => {
    setOpenSort(false);
  };

  const handleFilterSelect = () => {
    setOpenFilter(false);
  };
  return (
    <div className="flex items-center gap-4">
      <Menu
        label="Sort by"
        icon={<SortByIcon size={iconSize(16)} />}
        open={isOpenSort}
        onOpenChange={setOpenSort}
        options={sortOptions}
        onSelect={handleSortSelect}
      />

      <Menu
        label="Filters"
        icon={<FiltersIcon size={iconSize(16)} />}
        open={isOpenFilter}
        onOpenChange={setOpenFilter}
        options={filterOptions}
        onSelect={handleFilterSelect}
      />
      <Separator
        orientation="vertical"
        className="h-[50px] w-[1px] gap-4 bg-[#E4E4E4]"
      />
      <Button onClick={handleAddTask} size="lg" className="button rounded-sm">
        <PlusIcon size={iconSize(16)} />
        <TypographySmall text="Add task" className="!leading-[150%]" />
      </Button>
    </div>
  );
};

export default SubHeaderFilters;

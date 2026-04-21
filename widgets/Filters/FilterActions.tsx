import React from 'react';
import { Menu } from '@/shared/ui/Menu';
import { SortByIcon } from '@/shared/icons/ui/SortByIcon';
import { filterOptions, sortOptions } from '@/widgets/Filters/constants';
import { FiltersIcon } from '@/shared/icons/ui/FiltersIcon';
import { Separator } from '@base-ui/react';
import { Button } from '@/shared/ui/button';
import { Plus } from '@/shared/icons/ui/Plus';
import { TypographySmall } from '@/shared/ui/Typography/TypographySmall';
import { useFiltersStore } from '@/widgets/Filters/model/filters.store';

const iconSize = { width: 16, height: 16 };

const FilterActions = () => {
  const { isOpenSort, isOpenFilter, setOpenSort, setOpenFilter } =
    useFiltersStore();

  const handleAddTask = () => {
    console.log('Adding task');
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
        icon={<SortByIcon size={iconSize} />}
        open={isOpenSort}
        onOpenChange={setOpenSort}
        options={sortOptions}
        onSelect={handleSortSelect}
      />

      <Menu
        label="Filters"
        icon={<FiltersIcon size={iconSize} />}
        open={isOpenFilter}
        onOpenChange={setOpenFilter}
        options={filterOptions}
        onSelect={handleFilterSelect}
      />
      <Separator
        orientation="vertical"
        className="h-[50px] w-[1px] gap-4 bg-[#E4E4E4]"
      />
      <Button
        onClick={handleAddTask}
        size="lg"
        className="flex h-[38px] cursor-pointer items-center gap-2 rounded-sm px-3 py-2">
        <Plus size={iconSize} />
        <TypographySmall text="Add task" className="!leading-[150%]" />
      </Button>
    </div>
  );
};

export default FilterActions;

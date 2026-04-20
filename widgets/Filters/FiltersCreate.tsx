'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { TypographyH3 } from '@/shared/ui/Typography/TypographyH3';
import { FiltersCreateType, FilterType } from '@/widgets/Filters/types';
import Filter from '@/widgets/Filters/Filter';
import { Button } from '@/shared/ui/button';
import { Plus } from '@/shared/icons/ui/Plus';
import { TypographySmall } from '@/shared/ui/Typography/TypographySmall';
import { DropdownOption } from '@/shared/ui/Menu/types';
import { Separator } from '@base-ui/react';
import { Menu } from '@/shared/ui/Menu';
import { SortBy } from '@/shared/icons/ui/SortBy';
import { FiltersIcon } from '@/shared/icons/ui/FiltersIcon';

const sortOptions: DropdownOption[] = [
  {
    id: 1,
    title: 'asc',
  },
  {
    id: 2,
    title: 'desc',
  },
];

const filterOptions: DropdownOption[] = [
  {
    id: 1,
    title: 'test',
  },
  {
    id: 2,
    title: 'test',
  },
];

const Filters = ({ data }: FiltersCreateType) => {
  const pathname = usePathname();
  const [isActiveFilter, setActiveFilter] = useState<number | null>(2);
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const formatTitle = (pathname: string): string => {
    const segment = pathname.split('/').filter(Boolean)[0];

    if (!segment) return '/';

    return `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`;
  };

  const title = useMemo(() => formatTitle(pathname), [pathname]);

  const handleFilterClick = useCallback((id: number) => {
    setActiveFilter(id);
  }, []);

  const handleAddTask = () => {
    console.log('Adding task');
  };

  const handleSortSelect = (option: DropdownOption) => {
    console.log('Sort:', option);
    setIsOpenSort(false);
  };

  const handleFilterSelect = (option: DropdownOption) => {
    console.log('Filter:', option);
    setIsOpenFilter(false);
  };

  return (
    <div className="border-bottom flex items-center px-8">
      <div className="flex grow items-center">
        <TypographyH3 text={title} className="mr-9" />

        <div className="flex items-center gap-5">
          {data.tasks.map((filter: FilterType) => {
            return (
              <Filter
                key={filter.id}
                filter={filter}
                isActive={isActiveFilter === filter.id}
                handleFilterClick={handleFilterClick}
              />
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Menu
          label="Sort by"
          icon={
            <SortBy
              size={{
                width: 16,
                height: 16,
              }}
            />
          }
          open={isOpenSort}
          onOpenChange={setIsOpenSort}
          options={sortOptions}
          onSelect={handleSortSelect}
        />

        <Menu
          label="Filters"
          icon={
            <FiltersIcon
              size={{
                width: 16,
                height: 16,
              }}
            />
          }
          open={isOpenFilter}
          onOpenChange={setIsOpenFilter}
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
          className="flex h-[38px] items-center gap-2 rounded-sm px-3 py-2">
          <Plus
            size={{
              width: 16,
              height: 16,
            }}
          />
          <TypographySmall text="Add task" className="!leading-[150%]" />
        </Button>
      </div>
    </div>
  );
};

export default Filters;

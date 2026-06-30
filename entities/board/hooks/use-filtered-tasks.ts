'use client';

import { useMemo } from 'react';

import { applyTaskFiltersAndSort } from '@/entities/board/lib/filter-sort-tasks';
import { useFiltersStore } from '@/entities/board/model/filters.store';
import { useBoardStore } from '@/entities/board/model/use-data.store';

export function useFilteredTasks() {
  const tasks = useBoardStore((state) => state.tasks);
  const sortBy = useFiltersStore((state) => state.sortBy);
  const filterBy = useFiltersStore((state) => state.filterBy);

  return useMemo(
    () => applyTaskFiltersAndSort(tasks, filterBy, sortBy),
    [tasks, filterBy, sortBy]
  );
}

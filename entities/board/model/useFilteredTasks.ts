'use client';

import { useMemo } from 'react';

import { useFiltersStore } from '@/entities/board/model/filters.store';
import { useBoardStore } from '@/entities/board/model/useData.store';
import { applyTaskFiltersAndSort } from '@/entities/task';

export function useFilteredTasks() {
  const tasks = useBoardStore((state) => state.tasks);
  const sortBy = useFiltersStore((state) => state.sortBy);
  const filterBy = useFiltersStore((state) => state.filterBy);

  return useMemo(
    () => applyTaskFiltersAndSort(tasks, filterBy, sortBy),
    [tasks, filterBy, sortBy]
  );
}

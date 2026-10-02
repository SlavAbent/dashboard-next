import type {
  TaskFilterOption,
  TaskSortOption,
} from '@/entities/board/model/filters.types';

export type TaskFilterMenuOption = {
  id: number;
  title: string;
  value: TaskFilterOption;
};

export type TaskSortMenuOption = {
  id: number;
  title: string;
  value: TaskSortOption;
};

export const sortOptions: TaskSortMenuOption[] = [
  { id: 0, title: 'default', value: 'default' },
  { id: 1, title: 'asc', value: 'asc' },
  { id: 2, title: 'desc', value: 'desc' },
];

export const filterOptions: TaskFilterMenuOption[] = [
  { id: 1, title: 'All', value: 'all' },
  { id: 2, title: 'Open', value: 'open' },
  { id: 3, title: 'Completed', value: 'completed' },
];

export const sortLabels: Record<TaskSortOption, string> = {
  default: 'Sort',
  asc: 'Asc',
  desc: 'Desc',
};

export const filterLabels: Record<TaskFilterOption, string> = {
  all: 'Filters',
  open: 'Open',
  completed: 'Completed',
};

'use client';

import { addDays, addMonths, addWeeks, startOfMonth } from 'date-fns';
import { create } from 'zustand';

import type { Priority } from '@/shared/model/schedule';

export type CalendarItemType = 'folders' | 'tasks';
export type CalendarViewMode = 'month' | 'week' | 'day';
export type CalendarPriorityFilter = Priority | 'all';

export type CalendarFilters = {
  priority: CalendarPriorityFilter;
  folderId: string;
  columnId: string;
  hideCompleted: boolean;
};

const defaultFilters: CalendarFilters = {
  priority: 'all',
  folderId: 'all',
  columnId: 'all',
  hideCompleted: false,
};

type CalendarStore = {
  currentMonth: Date;
  viewMode: CalendarViewMode;
  defaultVisibleItems: CalendarItemType;
  visibleItemsByDate: Record<string, CalendarItemType>;
  expandedDates: Record<string, boolean>;
  filters: CalendarFilters;
  showCurrentMonth: () => void;
  showPreviousMonth: () => void;
  showNextMonth: () => void;
  showItemsForDate: (date: string, items: CalendarItemType) => void;
  showItemsForAllDates: (items: CalendarItemType) => void;
  setViewMode: (viewMode: CalendarViewMode) => void;
  toggleDateExpanded: (date: string) => void;
  setFilters: (filters: Partial<CalendarFilters>) => void;
  resetFilters: () => void;
};

const moveCurrentPeriod = (
  date: Date,
  viewMode: CalendarViewMode,
  direction: -1 | 1
) => {
  if (viewMode === 'day') return addDays(date, direction);
  if (viewMode === 'week') return addWeeks(date, direction);
  return addMonths(date, direction);
};

export const useCalendarStore = create<CalendarStore>((set) => ({
  currentMonth: startOfMonth(new Date()),
  viewMode: 'month',
  defaultVisibleItems: 'tasks',
  visibleItemsByDate: {},
  expandedDates: {},
  filters: defaultFilters,
  showCurrentMonth: () => set({ currentMonth: new Date() }),
  showPreviousMonth: () =>
    set((state) => ({
      currentMonth: moveCurrentPeriod(state.currentMonth, state.viewMode, -1),
    })),
  showNextMonth: () =>
    set((state) => ({
      currentMonth: moveCurrentPeriod(state.currentMonth, state.viewMode, 1),
    })),
  showItemsForDate: (date, items) =>
    set((state) => ({
      visibleItemsByDate: {
        ...state.visibleItemsByDate,
        [date]: items,
      },
    })),
  showItemsForAllDates: (items) =>
    set({ defaultVisibleItems: items, visibleItemsByDate: {} }),
  setViewMode: (viewMode) => set({ viewMode }),
  toggleDateExpanded: (date) =>
    set((state) => ({
      expandedDates: {
        ...state.expandedDates,
        [date]: !state.expandedDates[date],
      },
    })),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: defaultFilters }),
}));

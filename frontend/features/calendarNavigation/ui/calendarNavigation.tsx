'use client';

import { Button, NativeSelect } from '@dashboard/ui';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { format } from 'date-fns';

import { useCalendarStore } from '@/entities/calendar';

export const CalendarNavigation = () => {
  const currentMonth = useCalendarStore((state) => state.currentMonth);
  const viewMode = useCalendarStore((state) => state.viewMode);
  const setViewMode = useCalendarStore((state) => state.setViewMode);
  const showCurrentMonth = useCalendarStore((state) => state.showCurrentMonth);
  const showPreviousMonth = useCalendarStore(
    (state) => state.showPreviousMonth
  );
  const showNextMonth = useCalendarStore((state) => state.showNextMonth);

  return (
    <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-2 sm:flex-nowrap sm:gap-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold capitalize md:text-base">
          {viewMode === 'day'
            ? format(currentMonth, 'EEEE, d MMMM yyyy')
            : viewMode === 'week'
              ? `Week of ${format(currentMonth, 'd MMMM yyyy')}`
              : format(currentMonth, 'MMMM yyyy')}
        </p>
        <p className="text-muted-foreground hidden truncate text-xs lg:block">
          Select a day to schedule a task
        </p>
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-2">
        <NativeSelect
          aria-label="Calendar view"
          value={viewMode}
          onChange={(event) =>
            setViewMode(event.target.value as typeof viewMode)
          }
          className="border-input bg-background h-9 rounded-sm border py-0 pr-8 pl-3 text-xs">
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </NativeSelect>
        <Button type="button" variant="outline" onClick={showCurrentMonth}>
          Today
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Previous period"
          onClick={showPreviousMonth}>
          <CaretLeftIcon />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Next period"
          onClick={showNextMonth}>
          <CaretRightIcon />
        </Button>
      </div>
    </div>
  );
};

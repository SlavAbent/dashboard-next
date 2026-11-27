'use client';

import {
  Button,
  Calendar,
  CalendarIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@dashboard/ui';
import { ErrorField } from '@dashboard/ui/forms';
import { parseISO } from 'date-fns';
import { useCallback } from 'react';
import type { DateRange } from 'react-day-picker';
import { useFormContext, useWatch } from 'react-hook-form';

import { useDragDateRange } from '@/features/boardModal/model/useDragDateRange';
import {
  DragRangeContext,
  DragRangeDayButton,
} from '@/features/boardModal/ui/dragRangeDayButton';
import {
  formatScheduleDate,
  formatScheduleRange,
  toDateOnly,
} from '@/shared/model/schedule';

type ScheduleFormValues = {
  startDate: string | null;
  endDate: string | null;
};

export const DateRangeField = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ScheduleFormValues>();
  const [startDate, endDate] = useWatch({
    control,
    name: ['startDate', 'endDate'],
  });

  const selected: DateRange | undefined = startDate
    ? {
        from: parseISO(startDate),
        to: endDate ? parseISO(endDate) : undefined,
      }
    : undefined;

  const label = startDate
    ? endDate
      ? formatScheduleRange(startDate, endDate)
      : formatScheduleDate(startDate)
    : 'Select due date';

  const handleSelect = useCallback(
    (range: DateRange | undefined) => {
      setValue('startDate', range?.from ? toDateOnly(range.from) : null, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue('endDate', range?.to ? toDateOnly(range.to) : null, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const dragRange = useDragDateRange(handleSelect);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Due date</label>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="outline"
                className="bg-background h-9 min-w-0 flex-1 justify-start rounded-sm font-normal"
              />
            }>
            <CalendarIcon className="size-4" />
            <span className="truncate">{label}</span>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-auto p-0">
            <DragRangeContext.Provider value={dragRange}>
              <Calendar
                mode="range"
                defaultMonth={selected?.from}
                selected={selected}
                onSelect={handleSelect}
                numberOfMonths={1}
                components={{ DayButton: DragRangeDayButton }}
              />
            </DragRangeContext.Provider>
          </PopoverContent>
        </Popover>
        {startDate && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleSelect(undefined)}>
            Clear
          </Button>
        )}
      </div>
      <ErrorField error={errors.startDate} />
      <ErrorField error={errors.endDate} />
    </div>
  );
};

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
import { format, parseISO } from 'date-fns';
import {
  createContext,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import {
  type DateRange,
  DayButton,
  type DayButtonProps,
} from 'react-day-picker';
import { useFormContext, useWatch } from 'react-hook-form';

type ScheduleFormValues = {
  startDate: string | null;
  endDate: string | null;
};

const toDateOnly = (date: Date) => format(date, 'yyyy-MM-dd');

type DragRangeContextValue = {
  start: (date: Date) => void;
  extend: (date: Date, event: ReactPointerEvent) => void;
  finish: () => void;
  shouldIgnoreClick: () => boolean;
};

const DragRangeContext = createContext<DragRangeContextValue | null>(null);

const DragRangeDayButton = ({
  day,
  onPointerDown,
  onPointerEnter,
  onPointerUp,
  onClick,
  ...props
}: DayButtonProps) => {
  const dragRange = useContext(DragRangeContext);

  return (
    <DayButton
      {...props}
      day={day}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (event.button === 0) dragRange?.start(day.date);
      }}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        dragRange?.extend(day.date, event);
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        dragRange?.finish();
      }}
      onClick={(event) => {
        if (dragRange?.shouldIgnoreClick()) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        onClick?.(event);
      }}
    />
  );
};

export const DateRangeField = () => {
  const dragStartRef = useRef<Date | null>(null);
  const didDragRef = useRef(false);
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
      ? `${format(parseISO(startDate), 'dd.MM.yyyy')} — ${format(parseISO(endDate), 'dd.MM.yyyy')}`
      : format(parseISO(startDate), 'dd.MM.yyyy')
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

  const dragRange = useMemo<DragRangeContextValue>(
    () => ({
      start: (date) => {
        dragStartRef.current = date;
        didDragRef.current = false;
      },
      extend: (date, event) => {
        const start = dragStartRef.current;
        if (
          !start ||
          (event.buttons & 1) !== 1 ||
          start.getTime() === date.getTime()
        ) {
          return;
        }

        didDragRef.current = true;
        handleSelect(
          start < date ? { from: start, to: date } : { from: date, to: start }
        );
      },
      finish: () => {
        dragStartRef.current = null;
      },
      shouldIgnoreClick: () => {
        const shouldIgnore = didDragRef.current;
        didDragRef.current = false;
        return shouldIgnore;
      },
    }),
    [handleSelect]
  );

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

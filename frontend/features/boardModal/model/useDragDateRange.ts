import { type PointerEvent as ReactPointerEvent, useMemo, useRef } from 'react';
import type { DateRange } from 'react-day-picker';

export type DragRangeContextValue = {
  start: (date: Date) => void;
  extend: (date: Date, event: ReactPointerEvent) => void;
  finish: () => void;
  shouldIgnoreClick: () => boolean;
};

export const useDragDateRange = (
  onSelect: (range: DateRange | undefined) => void
) => {
  const dragStartRef = useRef<Date | null>(null);
  const didDragRef = useRef(false);

  return useMemo<DragRangeContextValue>(
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
        onSelect(
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
    [onSelect]
  );
};

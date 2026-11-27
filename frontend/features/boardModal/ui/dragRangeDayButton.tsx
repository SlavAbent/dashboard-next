import { createContext, useContext } from 'react';
import { DayButton, type DayButtonProps } from 'react-day-picker';

import type { DragRangeContextValue } from '@/features/boardModal/model/useDragDateRange';

export const DragRangeContext = createContext<DragRangeContextValue | null>(
  null
);

export const DragRangeDayButton = ({
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

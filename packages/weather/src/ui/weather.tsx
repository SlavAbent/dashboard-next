'use client';

import { Popover } from '@base-ui/react/popover';
import { useState } from 'react';

import type { WeatherType } from '../types';
import { WeatherContent } from './weatherContent';
import { WeatherTrigger } from './weatherTrigger';

export const Weather = ({
  className,
  open: controlledOpen,
  onOpenChange,
}: WeatherType) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;

  const setOpen = (nextOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <div className={`relative flex items-center gap-2 ${className ?? ''}`}>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          aria-label="Weather forecast"
          className="cursor-pointer border-0 bg-transparent p-0">
          <WeatherTrigger />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner align="end" sideOffset={4} className="z-50">
            <Popover.Popup
              aria-label="Weather forecast"
              className="bg-popover text-popover-foreground flex w-[min(calc(100vw-1.5rem),25rem)] flex-col gap-2.5 rounded-sm border p-3 text-xs shadow-md sm:p-4">
              <WeatherContent />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

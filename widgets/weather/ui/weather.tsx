'use client';

import React, { useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/popover/popover';
import { cn } from '@/shared/lib/cn';
import { WeatherType } from '@/widgets/weather/types/weather.types';
import { WeatherContent } from '@/widgets/weather/ui/weatherContent';
import { WeatherSearch } from '@/widgets/weather/ui/weatherSearch';

export const Weather = ({ className }: WeatherType) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Popover open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
        <PopoverTrigger>
          <WeatherSearch />
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="border-border w-100 rounded-sm border p-4">
          <WeatherContent />
        </PopoverContent>
      </Popover>
    </div>
  );
};

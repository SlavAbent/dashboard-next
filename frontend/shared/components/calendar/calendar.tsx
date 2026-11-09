'use client';

import { cn } from '@lib/cn';
import * as React from 'react';
import { DayPicker, type DayPickerProps } from 'react-day-picker';

export const Calendar = ({ className, ...props }: DayPickerProps) => (
  <DayPicker
    className={cn('dashboard-calendar p-3 text-xs', className)}
    showOutsideDays
    {...props}
  />
);

import { Personal } from '@/shared/icons/ui/Personal';
import { Notes } from '@/shared/icons/ui/Notes';
import { FC } from 'react';
import { Calendar } from '@/shared/icons/ui/Calendar';
import { Tasks } from '@/shared/icons/ui/Tasks';
import { Dashboard } from '@/shared/icons/ui/Dashboard';
import { IconType } from '@/shared/icons/types';

export const iconMapper: Record<string, FC<IconType>> = {
  dashboard: Dashboard,
  notes: Notes,
  tasks: Tasks,
  calendar: Calendar,
  personal: Personal,
};

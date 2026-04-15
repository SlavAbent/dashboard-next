import { Personal } from '@/app/shared/icons/ui/Personal';
import { Notes } from '@/app/shared/icons/ui/Notes';
import { FC } from 'react';
import { Calendar } from '@/app/shared/icons/ui/Calendar';
import { Tasks } from '@/app/shared/icons/ui/Tasks';
import { Dashboard } from '@/app/shared/icons/ui/Dashboard';

export const iconMapper: Record<string, FC<any>> = {
  dashboard: Dashboard,
  notes: Notes,
  tasks: Tasks,
  calendar: Calendar,
  personal: Personal,
};

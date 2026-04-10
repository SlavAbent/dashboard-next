import { Personal } from '@/app/shared/ui/icons/Personal';
import { Notes } from '@/app/shared/ui/icons/Notes';
import { FC } from 'react';
import { Calendar } from '@/app/shared/ui/icons/Calendar';
import { Tasks } from '@/app/shared/ui/icons/Tasks';
import { Dashboard } from '@/app/shared/ui/icons/Dashboard';

export const iconMapper: Record<string, FC<any>> = {
  dashboard: Dashboard,
  notes: Notes,
  tasks: Tasks,
  calendar: Calendar,
  personal: Personal,
};

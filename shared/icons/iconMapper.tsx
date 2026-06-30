import { FC } from 'react';

import { IconType } from '@/shared/icons/types/icon.types';
import { CalendarIcon } from '@/shared/icons/ui/CalendarIcon';
import { DashboardIcon } from '@/shared/icons/ui/DashboardIcon';
import { KanbanIcon } from '@/shared/icons/ui/KanbanIcon';
import { ListIcon } from '@/shared/icons/ui/ListIcon';
import { NotesIcon } from '@/shared/icons/ui/NotesIcon';
import { PersonalIcon } from '@/shared/icons/ui/PersonalIcon';
import { TasksIcon } from '@/shared/icons/ui/TasksIcon';

export const iconMapper: Record<string, FC<IconType>> = {
  dashboard: DashboardIcon,
  chat: NotesIcon,
  tasks: TasksIcon,
  calendar: CalendarIcon,
  personal: PersonalIcon,
  list: ListIcon,
  kanban: KanbanIcon,
};

import { FC } from 'react';

import { IconType } from '@/shared/icons/types/icon.types';
import { CalendarIcon } from '@/shared/icons/ui/calendarIcon';
import { DashboardIcon } from '@/shared/icons/ui/dashboardIcon';
import { KanbanIcon } from '@/shared/icons/ui/kanbanIcon';
import { ListIcon } from '@/shared/icons/ui/listIcon';
import { NotesIcon } from '@/shared/icons/ui/notesIcon';
import { PersonalIcon } from '@/shared/icons/ui/personalIcon';
import { TasksIcon } from '@/shared/icons/ui/tasksIcon';

export const iconMapper: Record<string, FC<IconType>> = {
  dashboard: DashboardIcon,
  chat: NotesIcon,
  tasks: TasksIcon,
  calendar: CalendarIcon,
  personal: PersonalIcon,
  list: ListIcon,
  kanban: KanbanIcon,
};

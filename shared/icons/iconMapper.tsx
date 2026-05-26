import { PersonalIcon } from '@/shared/icons/ui/PersonalIcon';
import { NotesIcon } from '@/shared/icons/ui/NotesIcon';
import { FC } from 'react';
import { CalendarIcon } from '@/shared/icons/ui/CalendarIcon';
import { TasksIcon } from '@/shared/icons/ui/TasksIcon';
import { DashboardIcon } from '@/shared/icons/ui/DashboardIcon';
import { IconType } from '@/shared/icons/types/icon.types';
import { ListIcon } from '@/shared/icons/ui/ListIcon';
import { KanbanIcon } from '@/shared/icons/ui/KanbanIcon';
import { PomodoroIcon } from '@/shared/icons/ui/Pomodoro';

export const iconMapper: Record<string, FC<IconType>> = {
  dashboard: DashboardIcon,
  chat: NotesIcon,
  tasks: TasksIcon,
  calendar: CalendarIcon,
  personal: PersonalIcon,
  list: ListIcon,
  kanban: KanbanIcon,
};

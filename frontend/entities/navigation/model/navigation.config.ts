import type { NavigationMenu } from './types';

export const navigationMenu: NavigationMenu = {
  menu: [
    item('nav-dashboard', 'Dashboard', 'dashboard', 'dashboard', 'grey'),
    item('nav-chat', 'Chat', 'chat', 'chat', 'green', true),
    item('nav-tasks', 'Tasks', 'tasks', 'tasks', 'blue', true, true),
    item('nav-calendar', 'Calendar', 'calendar', 'calendar', 'pink'),
    item(
      'nav-personal',
      'Personal',
      'personal',
      'personal',
      'lime',
      true,
      true
    ),
  ],
};

function item(
  id: string,
  name: string,
  slug: string,
  icon: string,
  colorId: string,
  filters = false,
  grid = false
) {
  return {
    id,
    name,
    slug,
    icon,
    colorId,
    href: '',
    isActive: false,
    subheader: {
      filters,
      grid,
      ...(grid
        ? {
            view: [
              { id: 'list', name: 'List', icon: 'List' },
              { id: 'kanban', name: 'Kanban', icon: 'Kanban' },
            ],
          }
        : {}),
    },
  };
}

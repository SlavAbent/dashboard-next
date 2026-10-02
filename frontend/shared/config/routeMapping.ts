export const RouteKey = {
  HOME: 'home',
  DASHBOARD: 'dashboard',
  CHAT: 'chat',
  TASKS: 'tasks',
  CALENDAR: 'calendar',
  PERSONAL: 'personal',
} as const;

type RouteKey = (typeof RouteKey)[keyof typeof RouteKey];

export const routeToKeyMap: Record<string, RouteKey | undefined> = {
  '/dashboard': 'dashboard',
  '/chat': 'chat',
  '/tasks': 'tasks',
  '/calendar': 'calendar',
  '/personal': 'personal',
  '/': 'home',
} as const;

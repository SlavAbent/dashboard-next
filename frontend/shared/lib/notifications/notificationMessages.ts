import type {
  FolderNotificationAction,
  TaskNotificationAction,
} from './notification.types';

export const notificationMessages = {
  task: {
    success: {
      create: 'Task added',
      update: 'Task updated',
      delete: 'Task deleted',
      move: 'Task moved',
      complete: 'Task completed',
      reopen: 'Task reopened',
    } satisfies Record<TaskNotificationAction, string>,
    error: {
      create: 'Failed to add task',
      update: 'Failed to update task',
      delete: 'Failed to delete task',
      move: 'Failed to move task',
      complete: 'Failed to complete task',
      reopen: 'Failed to reopen task',
    } satisfies Record<TaskNotificationAction, string>,
  },
  folder: {
    success: {
      create: 'Folder added',
      update: 'Folder updated',
      delete: 'Folder deleted',
      move: 'Folder moved',
    } satisfies Record<FolderNotificationAction, string>,
    error: {
      create: 'Failed to add folder',
      update: 'Failed to update folder',
      delete: 'Failed to delete folder',
      move: 'Failed to move folder',
    } satisfies Record<FolderNotificationAction, string>,
  },
} as const;

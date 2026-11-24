export type NotificationEntity = 'task' | 'folder';

export type TaskNotificationAction =
  'create' | 'update' | 'delete' | 'move' | 'complete' | 'reopen';

export type FolderNotificationAction = 'create' | 'update' | 'delete' | 'move';

export type NotificationDriver = {
  success: (message: string) => string;
  error: (message: string) => string;
  dismiss: (id: string) => void;
};

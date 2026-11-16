import type {
  FolderNotificationAction,
  NotificationDriver,
  TaskNotificationAction,
} from './notification.types';
import { notificationMessages } from './notificationMessages';

export const createNotificationFactory = (driver: NotificationDriver) => ({
  task: {
    success: (action: TaskNotificationAction) =>
      driver.success(notificationMessages.task.success[action]),
    error: (action: TaskNotificationAction) =>
      driver.error(notificationMessages.task.error[action]),
    run: async <Result>(
      action: TaskNotificationAction,
      operation: () => Promise<Result>
    ) => {
      try {
        const result = await operation();
        driver.success(notificationMessages.task.success[action]);
        return result;
      } catch (error) {
        driver.error(notificationMessages.task.error[action]);
        throw error;
      }
    },
  },
  folder: {
    success: (action: FolderNotificationAction) =>
      driver.success(notificationMessages.folder.success[action]),
    error: (action: FolderNotificationAction) =>
      driver.error(notificationMessages.folder.error[action]),
    run: async <Result>(
      action: FolderNotificationAction,
      operation: () => Promise<Result>
    ) => {
      try {
        const result = await operation();
        driver.success(notificationMessages.folder.success[action]);
        return result;
      } catch (error) {
        driver.error(notificationMessages.folder.error[action]);
        throw error;
      }
    },
  },
  dismiss: driver.dismiss,
});

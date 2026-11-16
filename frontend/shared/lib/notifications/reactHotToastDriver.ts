'use client';

import { toast } from 'react-hot-toast';

import type { NotificationDriver } from './notification.types';

export const reactHotToastDriver: NotificationDriver = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  dismiss: (id) => toast.dismiss(id),
};

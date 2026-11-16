'use client';

import { Notification } from '@dashboard/ui';
import { resolveValue, Toaster } from 'react-hot-toast';

import { notifications } from '@/shared/lib/notifications';

export const NotificationHost = () => (
  <Toaster position="top-center" gutter={8} reverseOrder={false}>
    {(toastItem) => (
      <Notification
        variant={toastItem.type === 'error' ? 'error' : 'success'}
        message={resolveValue(toastItem.message, toastItem)}
        visible={toastItem.visible}
        onClose={() => notifications.dismiss(toastItem.id)}
      />
    )}
  </Toaster>
);

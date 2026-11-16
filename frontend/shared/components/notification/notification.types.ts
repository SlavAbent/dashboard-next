import type { ReactNode } from 'react';

export type NotificationVariant = 'success' | 'error';

export type NotificationProps = {
  variant: NotificationVariant;
  message: ReactNode;
  onClose: () => void;
  className?: string;
  visible?: boolean;
};
